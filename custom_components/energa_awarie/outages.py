"""Outage fetching & parsing utilities for Energa Awarie integration."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Any, List

import aiohttp
from bs4 import BeautifulSoup
import dateutil.parser
import logging

from .const import ENERGA_PLANNED_URL, ENERGA_BASE_URL

_LOGGER = logging.getLogger(__name__)


@dataclass(slots=True)
class OutageFilter:
    county_id: int
    area: str
    city: str
    street: str


class EnergaOutageFetcher:
    """Handles retrieval and parsing of Energa planned outages."""

    # Class-level (static) cache shared across instances
    _CACHE_JSON: dict[str, Any] | None = None
    _CACHE_EXPIRY: datetime | None = None
    _CACHE_TTL = timedelta(minutes=10)

    def __init__(self, session: aiohttp.ClientSession) -> None:
        self._session = session

    async def fetch_planned_outages(self, flt: OutageFilter) -> list[dict[str, Any]]:
        """Public method to fetch and filter outages."""
        try:
            raw_json = await self._download_planned_outages_json()
            if not raw_json:
                return []
            return self._parse_json_planned_outages(raw_json, flt)
        except Exception as err:  # pylint: disable=broad-except
            _LOGGER.error("Failed fetching outages: %s", err)
            return []

    async def _download_planned_outages_json(self) -> dict[str, Any] | None:
        """Download JSON payload by first scraping HTML for endpoint (10 min shared cache)."""
        now = datetime.now(timezone.utc)
        if (
            self.__class__._CACHE_JSON is not None
            and self.__class__._CACHE_EXPIRY
            and now < self.__class__._CACHE_EXPIRY
        ):
            remaining = int((self.__class__._CACHE_EXPIRY - now).total_seconds())
            _LOGGER.debug("Energa outages cache hit (remaining %s s)", remaining)
            return self.__class__._CACHE_JSON

        _LOGGER.debug("Energa outages cache miss - fetching fresh data")
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
                ENERGA_PLANNED_URL,
                headers=headers,
                timeout=aiohttp.ClientTimeout(total=30),
            ) as response:
                if response.status != 200:
                    _LOGGER.error("Error fetching Energa HTML: HTTP %s", response.status)
                    return None

                html = await response.text()
                soup = BeautifulSoup(html, "html.parser")
                wrapper = soup.find("div", class_="plannedShutdown-js")
                if not wrapper:
                    _LOGGER.error("plannedShutdown-js div not found")
                    return None
                data_shutdowns = wrapper.get("data-shutdowns")
                if not data_shutdowns:
                    _LOGGER.error("data-shutdowns attribute missing")
                    return None

                json_url = f"{ENERGA_BASE_URL}{data_shutdowns}"
                _LOGGER.debug("Fetching outages JSON: %s", json_url)
                async with self._session.get(
                    json_url,
                    headers={**headers, "Accept": "application/json"},
                    timeout=aiohttp.ClientTimeout(total=30),
                ) as jres:
                    if jres.status != 200:
                        _LOGGER.error("Error fetching Energa JSON: HTTP %s", jres.status)
                        return None
                    data = await jres.json()
                    # Store in shared cache
                    self.__class__._CACHE_JSON = data
                    self.__class__._CACHE_EXPIRY = datetime.now(timezone.utc) + self._CACHE_TTL
                    _LOGGER.debug("Energa outages JSON cached for %s minutes", int(self._CACHE_TTL.total_seconds()/60))
                    return data
        except aiohttp.ClientError as err:
            _LOGGER.error("Network error fetching Energa data: %s", err)
        except Exception as err:  # pylint: disable=broad-except
            _LOGGER.error("Unexpected error fetching Energa data: %s", err)
        return None

    def _parse_json_planned_outages(
        self, json_data: dict[str, Any], flt: OutageFilter
    ) -> list[dict[str, Any]]:
        outages: list[dict[str, Any]] = []
        try:
            shutdowns = json_data.get("document", {}).get("payload", {}).get("shutdowns", [])
            for shutdown in shutdowns:
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

            # Area (gmina) required
            if flt.area:
                areas_list = shutdown.get("areas") or []
                area_lower = flt.area.lower()
                if not any(area_lower in a.lower() for a in areas_list):
                    return False

            msg = shutdown.get("message", "").lower()
            areas_joined = " ".join(shutdown.get("areas", [])).lower()
            combined = f"{msg} {areas_joined}"

            if flt.city and flt.city.lower() not in combined:
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

            start_dt = dateutil.parser.isoparse(start_date_str)
            end_dt = dateutil.parser.isoparse(end_date_str) if end_date_str else start_dt + timedelta(hours=4)

            if start_dt.tzinfo is None:
                start_dt = start_dt.replace(tzinfo=timezone.utc)
            if end_dt.tzinfo is None:
                end_dt = end_dt.replace(tzinfo=timezone.utc)

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
