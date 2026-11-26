"""Outage fetching & parsing utilities for Energa Awarie integration."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Any, List
from zoneinfo import ZoneInfo

import aiohttp
from bs4 import BeautifulSoup
import dateutil.parser
import logging

from .const import (
    CITY_COUNTY_IDS,
    COUNTY_OPTIONS,
    ENERGA_BASE_URL,
    ENERGA_CURRENT_URL,
    ENERGA_PLANNED_URL,
    ENERGA_TZ,
)

_LOGGER = logging.getLogger(__name__)


@dataclass(slots=True)
class OutageFilter:
    county_id: int
    area: str
    city: str
    street: str


class EnergaOutageFetcher:
    """Handles retrieval and parsing of Energa planned & current outages."""

    # Class-level caches shared across instances (per feed)
    _CACHE_PLANNED: dict[str, Any] | None = None
    _CACHE_PLANNED_EXPIRY: datetime | None = None
    _CACHE_CURRENT: dict[str, Any] | None = None
    _CACHE_CURRENT_EXPIRY: datetime | None = None
    _CACHE_TTL = timedelta(minutes=10)

    def __init__(self, session: aiohttp.ClientSession) -> None:
        self._session = session

    async def suggest_locations_for_county(self, county_id: int) -> dict[str, list[str]]:
        """Gminy i miejscowości z bieżących wyłączeń Energi (podpowiedzi w config flow)."""
        raw = await self._download_planned_outages_json()
        areas: set[str] = set()
        cities: set[str] = set()
        if not raw:
            return {"areas": [], "cities": []}

        for shutdown in raw.get("document", {}).get("payload", {}).get("shutdowns", []):
            if county_id not in (shutdown.get("counties") or []):
                continue
            for area in shutdown.get("areas") or []:
                if area.strip():
                    areas.add(area.strip())
            msg = (shutdown.get("message") or "").strip()
            if not msg:
                continue
            tokens = msg.replace(",", " ").split()
            if len(tokens) >= 2 and tokens[1].lower().startswith(("ulica", "ul.", "ul")):
                cities.add(tokens[0])

        county_name = COUNTY_OPTIONS.get(county_id, "")
        if county_id in CITY_COUNTY_IDS and county_name:
            areas.add(f"{county_name} gmina miejska")
            cities.add(county_name)

        return {
            "areas": sorted(areas, key=str.casefold),
            "cities": sorted(cities, key=str.casefold),
        }

    async def fetch_planned_outages(self, flt: OutageFilter) -> list[dict[str, Any]]:
        """Planned shutdowns from the planowane feed."""
        try:
            raw_json = await self._download_planned_outages_json()
            if not raw_json:
                return []
            return self._parse_json_outages(
                raw_json, flt, shutdown_types={"2", 2}
            )
        except Exception as err:  # pylint: disable=broad-except
            _LOGGER.error("Failed fetching planned outages: %s", err)
            return []

    async def fetch_current_outages(self, flt: OutageFilter) -> list[dict[str, Any]]:
        """Current map feed (awaryjne + trwające)."""
        try:
            raw_json = await self._download_current_outages_json()
            if not raw_json:
                return []
            return self._parse_json_outages(
                raw_json, flt, shutdown_types={"1", 1}
            )
        except Exception as err:  # pylint: disable=broad-except
            _LOGGER.error("Failed fetching current outages: %s", err)
            return []

    async def _download_planned_outages_json(self) -> dict[str, Any] | None:
        """JSON z listy planowanych wyłączeń."""
        return await self._download_shutdowns_json(
            page_url=ENERGA_PLANNED_URL,
            cache_json_attr="_CACHE_PLANNED",
            cache_expiry_attr="_CACHE_PLANNED_EXPIRY",
            html_pick=lambda soup: soup.find("div", class_="plannedShutdown-js"),
            label="planned",
        )

    async def _download_current_outages_json(self) -> dict[str, Any] | None:
        """JSON z mapy wyłączeń bieżących."""
        return await self._download_shutdowns_json(
            page_url=ENERGA_CURRENT_URL,
            cache_json_attr="_CACHE_CURRENT",
            cache_expiry_attr="_CACHE_CURRENT_EXPIRY",
            html_pick=lambda soup: soup.find(id="nPrMap2024"),
            label="current",
        )

    async def _download_shutdowns_json(
        self,
        page_url: str,
        cache_json_attr: str,
        cache_expiry_attr: str,
        html_pick,
        label: str,
    ) -> dict[str, Any] | None:
        """Download JSON via data-shutdowns on Energa HTML (10 min cache per feed)."""
        now = datetime.now(timezone.utc)
        cached = getattr(self.__class__, cache_json_attr)
        expiry = getattr(self.__class__, cache_expiry_attr)
        if cached is not None and expiry and now < expiry:
            remaining = int((expiry - now).total_seconds())
            _LOGGER.debug(
                "Energa %s outages cache hit (remaining %s s)", label, remaining
            )
            return cached

        _LOGGER.debug("Energa %s outages cache miss - fetching", label)
        headers = {
            "User-Agent": (
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
            ),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "pl,en;q=0.9",
        }
        try:
            async with self._session.get(
                page_url,
                headers=headers,
                timeout=aiohttp.ClientTimeout(total=30),
            ) as response:
                if response.status != 200:
                    _LOGGER.error(
                        "Error fetching Energa %s HTML: HTTP %s", label, response.status
                    )
                    return None

                html = await response.text()
                soup = BeautifulSoup(html, "html.parser")
                wrapper = html_pick(soup)
                if not wrapper:
                    _LOGGER.error("Energa %s: shutdown container not found", label)
                    return None
                data_shutdowns = wrapper.get("data-shutdowns")
                if not data_shutdowns:
                    _LOGGER.error("Energa %s: data-shutdowns missing", label)
                    return None

                json_url = f"{ENERGA_BASE_URL}{data_shutdowns}"
                _LOGGER.debug("Fetching Energa %s JSON: %s", label, json_url)
                async with self._session.get(
                    json_url,
                    headers={**headers, "Accept": "application/json"},
                    timeout=aiohttp.ClientTimeout(total=30),
                ) as jres:
                    if jres.status != 200:
                        _LOGGER.error(
                            "Error fetching Energa %s JSON: HTTP %s", label, jres.status
                        )
                        return None
                    data = await jres.json()
                    setattr(self.__class__, cache_json_attr, data)
                    setattr(
                        self.__class__,
                        cache_expiry_attr,
                        datetime.now(timezone.utc) + self._CACHE_TTL,
                    )
                    return data
        except aiohttp.ClientError as err:
            _LOGGER.error("Network error fetching Energa %s data: %s", label, err)
        except Exception as err:  # pylint: disable=broad-except
            _LOGGER.error("Unexpected error fetching Energa %s data: %s", label, err)
        return None

    def _parse_json_outages(
        self,
        json_data: dict[str, Any],
        flt: OutageFilter,
        shutdown_types: set[str | int] | None = None,
    ) -> list[dict[str, Any]]:
        outages: list[dict[str, Any]] = []
        try:
            shutdowns = json_data.get("document", {}).get("payload", {}).get("shutdowns", [])
            for shutdown in shutdowns:
                if shutdown_types is not None:
                    st = shutdown.get("shutdownType", "2")
                    if st not in shutdown_types and str(st) not in {
                        str(x) for x in shutdown_types
                    }:
                        continue
                if self._matches(shutdown, flt):
                    parsed = self._extract(shutdown)
                    if parsed:
                        outages.append(parsed)
        except Exception as err:  # pylint: disable=broad-except
            _LOGGER.error("Error parsing outages JSON: %s", err)
        _LOGGER.debug("Found %s matching outages", len(outages))
        return outages

    def _matches(self, shutdown: dict[str, Any], flt: OutageFilter) -> bool:
        """Match outage against configured filter."""
        try:
            if flt.county_id not in (shutdown.get("counties") or []):
                return False

            areas_list = shutdown.get("areas") or []
            county_name = (COUNTY_OPTIONS.get(flt.county_id) or "").lower()
            area_lower = flt.area.lower().strip()

            if flt.area:
                area_ok = any(area_lower in a.lower() for a in areas_list)
                if (
                    not area_ok
                    and flt.county_id in CITY_COUNTY_IDS
                    and county_name
                ):
                    # np. powiat Gdynia → areas: "Gdynia gmina miejska"
                    area_ok = any(county_name in a.lower() for a in areas_list) and (
                        area_lower == county_name
                        or area_lower in county_name
                        or county_name in area_lower
                        or "gmina" in area_lower
                    )
                if not area_ok:
                    return False
            elif flt.county_id in CITY_COUNTY_IDS and county_name:
                if not any(county_name in a.lower() for a in areas_list):
                    return False

            msg = shutdown.get("message", "").lower()
            areas_joined = " ".join(shutdown.get("areas", [])).lower()
            combined = f"{msg} {areas_joined}"

            city_filter = flt.city.lower().strip() if flt.city else ""
            if not city_filter and flt.county_id in CITY_COUNTY_IDS and county_name:
                city_filter = county_name

            if city_filter and city_filter not in combined:
                return False
            if flt.street and flt.street.lower() not in combined:
                return False

            return True
        except Exception as err:  # pylint: disable=broad-except
            _LOGGER.debug("Error matching outage: %s", err)
            return False

    def _extract(self, shutdown: dict[str, Any]) -> dict[str, Any] | None:
        """Extract normalized outage entry."""
        try:
            start_date_str = shutdown.get("startDate")
            end_date_str = shutdown.get("endDate")
            if not start_date_str:
                return None

            local_tz = ZoneInfo(ENERGA_TZ)
            start_dt = dateutil.parser.isoparse(start_date_str)
            end_dt = (
                dateutil.parser.isoparse(end_date_str)
                if end_date_str
                else start_dt + timedelta(hours=4)
            )

            if start_dt.tzinfo is None:
                start_dt = start_dt.replace(tzinfo=local_tz)
            if end_dt.tzinfo is None:
                end_dt = end_dt.replace(tzinfo=local_tz)

            start_dt = start_dt.astimezone(timezone.utc)
            end_dt = end_dt.astimezone(timezone.utc)

            message = shutdown.get("message", "")
            areas = shutdown.get("areas", [])
            dept_name = shutdown.get("deptName", "")
            region_name = shutdown.get("regionName", "")
            location = f"{dept_name}, {region_name}"
            if areas:
                location = f"{location}, {', '.join(areas)}"

            description = f"{message} ({location})"

            return {
                "guid": shutdown.get("guid"),
                "start_date": start_dt,
                "end_date": end_dt,
                "description": description,
                "location": location,
                "shutdownType": shutdown.get("shutdownType", "2"),
            }
        except Exception as err:  # pylint: disable=broad-except
            _LOGGER.debug("Error extracting outage: %s", err)
            return None
