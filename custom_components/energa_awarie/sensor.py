"""Sensor platform for Energa Awarie integration."""
from __future__ import annotations

import logging
import math
from datetime import datetime, timedelta, timezone
from typing import Any

import aiohttp
from bs4 import BeautifulSoup
import dateutil.parser

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import (
    ATTR_ATTRIBUTION,
    ATTR_CITY,
    ATTR_NEXT_OUTAGE,
    ATTR_OUTAGES,
    ATTR_COUNTY,
    ATTR_STREET,
    ATTR_AREA,
    ATTRIBUTION,
    CONF_CITY,
    CONF_COUNTY,
    CONF_STREET,
    DOMAIN,
    ENERGA_PLANNED_URL,
    COUNTY_OPTIONS,
    CONF_AREA, ATTR_DESCRIPTION, ATTR_START, ATTR_END,
)

_LOGGER = logging.getLogger(__name__)

# Polling interval for this platform
SCAN_INTERVAL = timedelta(hours=1)


async def async_setup_entry(
    hass: HomeAssistant,
    config_entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the Energa Awarie sensor."""
    county_id = config_entry.data[CONF_COUNTY]
    city = config_entry.data.get(CONF_CITY, "")
    street = config_entry.data.get(CONF_STREET, "")
    area = config_entry.data.get(CONF_AREA, "")
    session = async_get_clientsession(hass)
    county_name = COUNTY_OPTIONS.get(county_id, str(county_id))
    async_add_entities(
        [EnergaAwarieSensor(session, county_id, county_name, area, city, street)],
        True,
    )


class EnergaAwarieSensor(SensorEntity):
    """Representation of an Energa Awarie sensor."""

    _attr_native_unit_of_measurement = "days"

    def __init__(
        self,
        session: aiohttp.ClientSession,
        county_id: int,
        county_name: str,
        area: str,
        city: str,
        street: str,
    ) -> None:
        """Initialize the sensor."""
        self._session = session
        self._county_id = county_id
        self._county_name = county_name
        self._area = area.strip()
        self._city = city.strip()
        self._street = street.strip()
        base_name_parts = [p for p in [self._area, self._city, self._street] if p]
        base_name = " ".join(base_name_parts) if base_name_parts else self._county_name
        self._attr_name = f"Energa Awarie {base_name}"
        self._attr_unique_id = (
            f"energa_awarie_{self._county_id}_{self._area}_{self._city}_{self._street}"
            .lower()
            .replace(" ", "_")
        )
        self._attr_native_value: int | None = None
        self._attr_extra_state_attributes: dict[str, Any] = {}
        self._outages: list[dict[str, Any]] = []

    @property
    def icon(self) -> str:
        """Return the icon to use in the frontend."""
        if self._attr_native_value is not None and self._attr_native_value >= 0:
            return "mdi:power-plug-off"
        return "mdi:power-plug"

    @property
    def device_info(self) -> dict[str, Any]:
        """Return device info to group entity."""
        identifier = (
            f"{self._county_id}_{self._city}_{self._street}".lower().replace(" ", "_")
        )
        return {
            "identifiers": {(DOMAIN, identifier)},
            "name": f"Energa Awarie - {self._county_name}",
            "manufacturer": "Energa-Operator",
            "model": "Planned Awarie",
        }

    async def async_update(self) -> None:
        """Fetch new state data for the sensor."""
        try:
            _LOGGER.debug(
                "Fetching planned outages for county=%s city=%s street=%s",
                self._county_id,
                self._city,
                self._street,
            )

            outages = await self._fetch_planned_outages()
            self._outages = outages

            if outages:
                next_outage = self._find_next_outage(outages)

                if next_outage:
                    # Calculate days until outage using ceiling of remaining seconds/86400
                    now = datetime.now(timezone.utc)
                    delta_seconds = max(
                        (next_outage["start_date"] - now).total_seconds(), 0
                    )
                    days_until = int(math.ceil(delta_seconds / 86400.0))

                    self._attr_native_value = days_until
                    self._attr_extra_state_attributes = {
                        ATTR_START: next_outage["start_date"].isoformat(),
                        ATTR_END: next_outage["end_date"].isoformat(),
                        ATTR_DESCRIPTION: next_outage.get("description", ""),
                        ATTR_OUTAGES: len(outages),
                        ATTR_COUNTY: self._county_id,
                        ATTR_CITY: self._city,
                        ATTR_STREET: self._street,
                        ATTR_AREA: self._area,
                        ATTR_ATTRIBUTION: ATTRIBUTION,
                    }
                else:
                    self._attr_native_value = None
                    self._attr_extra_state_attributes = {
                        ATTR_START: None,
                        ATTR_END: None,
                        ATTR_DESCRIPTION: '',
                        ATTR_OUTAGES: 0,
                        ATTR_COUNTY: self._county_id,
                        ATTR_CITY: self._city,
                        ATTR_STREET: self._street,
                        ATTR_AREA: self._area,
                        ATTR_ATTRIBUTION: ATTRIBUTION,
                    }
            else:
                self._attr_native_value = None
                self._attr_extra_state_attributes = {
                    ATTR_START: None,
                    ATTR_END: None,
                    ATTR_DESCRIPTION: '',
                    ATTR_OUTAGES: 0,
                    ATTR_COUNTY: self._county_id,
                    ATTR_CITY: self._city,
                    ATTR_STREET: self._street,
                    ATTR_AREA: self._area,
                    ATTR_ATTRIBUTION: ATTRIBUTION,
                }

        except Exception as err:  # pylint: disable=broad-except
            _LOGGER.error("Error fetching planned outages: %s", err)
            self._attr_native_value = None

    async def _fetch_planned_outages(self) -> list[dict[str, Any]]:
        """Fetch planned outages from Energa website."""
        outages: list[dict[str, Any]] = []

        headers = {
            "User-Agent": (
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
            ),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "pl,en;q=0.9",
        }

        try:
            # First, fetch the HTML page to extract the JSON API endpoint
            async with self._session.get(
                ENERGA_PLANNED_URL,
                headers=headers,
                timeout=aiohttp.ClientTimeout(total=30),
            ) as response:
                if response.status != 200:
                    _LOGGER.error(
                        "Error fetching data from Energa: HTTP %s", response.status
                    )
                    return outages

                html = await response.text()
                soup = BeautifulSoup(html, "html.parser")

                # Find the div with class "plannedShutdown-js" and extract data-shutdowns attribute
                planned_shutdown_div = soup.find("div", class_="plannedShutdown-js")
                if not planned_shutdown_div:
                    _LOGGER.error("Could not find plannedShutdown-js div in HTML")
                    return outages

                data_shutdowns = planned_shutdown_div.get("data-shutdowns")
                if not data_shutdowns:
                    _LOGGER.error("Could not find data-shutdowns attribute")
                    return outages

                # Build the JSON API URL
                from .const import ENERGA_BASE_URL
                json_url = f"{ENERGA_BASE_URL}{data_shutdowns}"
                _LOGGER.debug("Fetching outages data from: %s", json_url)

                # Fetch the JSON data
                async with self._session.get(
                    json_url,
                    headers={**headers, "Accept": "application/json"},
                    timeout=aiohttp.ClientTimeout(total=30),
                ) as json_response:
                    if json_response.status != 200:
                        _LOGGER.error(
                            "Error fetching JSON data from Energa: HTTP %s", json_response.status
                        )
                        return outages

                    json_data = await json_response.json()
                    outages = self._parse_json_outages(json_data)

        except aiohttp.ClientError as err:
            _LOGGER.error("Error connecting to Energa website: %s", err)
        except Exception as err:  # pylint: disable=broad-except
            _LOGGER.error("Unexpected error parsing Energa data: %s", err)

        return outages

    def _parse_json_outages(self, json_data: dict[str, Any]) -> list[dict[str, Any]]:
        """Parse outages from JSON data."""
        outages: list[dict[str, Any]] = []

        try:
            # Extract shutdowns array from the JSON structure
            shutdowns = json_data.get("document", {}).get("payload", {}).get("shutdowns", [])

            for shutdown in shutdowns:
                # Check if this outage matches our configured location
                if self._matches_json_location(shutdown):
                    outage = self._extract_json_outage_data(shutdown)
                    if outage:
                        outages.append(outage)

        except Exception as err:  # pylint: disable=broad-except
            _LOGGER.error("Error parsing outages JSON: %s", err)

        _LOGGER.debug("Found %s matching outages", len(outages))
        return outages

    def _matches_json_location(self, shutdown: dict[str, Any]) -> bool:
        """Match outage by county id, gmina (area), and optional city/street."""
        try:
            counties_list = shutdown.get("counties") or []
            if self._county_id not in counties_list:
                return False

            # Area (gmina) must match (substring in any provided area string)
            if self._area:
                areas_list = shutdown.get("areas") or []
                area_lower = self._area.lower()
                if not any(area_lower in a.lower() for a in areas_list):
                    return False

            msg = shutdown.get("message", "").lower()
            areas_joined = " ".join(shutdown.get("areas", [])).lower()
            combined = f"{msg} {areas_joined}"

            if self._city and self._city.lower() not in combined:
                return False
            if self._street and self._street.lower() not in combined:
                return False
            return True
        except Exception as err:  # pylint: disable=broad-except
            _LOGGER.debug("Error matching outage: %s", err)
            return False

    def _extract_json_outage_data(self, shutdown: dict[str, Any]) -> dict[str, Any] | None:
        """Extract outage data from JSON shutdown object."""
        try:
            # Parse start and end dates from ISO format
            start_date_str = shutdown.get("startDate")
            end_date_str = shutdown.get("endDate")

            if not start_date_str:
                return None

            from datetime import datetime, timezone
            import dateutil.parser

            # Parse ISO datetime strings
            start_dt = dateutil.parser.isoparse(start_date_str)
            end_dt = None
            if end_date_str:
                end_dt = dateutil.parser.isoparse(end_date_str)
            else:
                # Default end time to start + 4 hours if not provided
                from datetime import timedelta
                end_dt = start_dt + timedelta(hours=4)

            # Ensure timezone-aware UTC for comparisons
            if start_dt.tzinfo is None:
                start_dt = start_dt.replace(tzinfo=timezone.utc)
            if end_dt.tzinfo is None:
                end_dt = end_dt.replace(tzinfo=timezone.utc)

            # Get description and location info
            message = shutdown.get("message", "")
            areas = shutdown.get("areas", [])
            dept_name = shutdown.get("deptName", "")
            region_name = shutdown.get("regionName", "")

            location = f"{dept_name}, {region_name}"
            if shutdown.get("areas"):
                location = f"{location}, {', '.join(shutdown.get('areas'))}"

            description = f"{message} ({location})"

            return {
                "start_date": start_dt,
                "end_date": end_dt,
                "description": description,
                "location": location,
            }

        except Exception as err:  # pylint: disable=broad-except
            _LOGGER.debug("Error extracting JSON outage data: %s", err)
            return None

    def _find_next_outage(
        self, outages: list[dict[str, Any]]
    ) -> dict[str, Any] | None:
        """Find the next upcoming outage."""
        now = datetime.now(timezone.utc)
        future_outages = [o for o in outages if o["start_date"] > now]

        if not future_outages:
            return None

        return min(future_outages, key=lambda x: x["start_date"])
