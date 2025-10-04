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
from homeassistant.util import dt as dt_util
from homeassistant.components.calendar import DOMAIN as CALENDAR_DOMAIN

from .const import (
    ATTR_ATTRIBUTION,
    ATTR_CITY,
    ATTR_OUTAGES,
    ATTR_COUNTY,
    ATTR_STREET,
    ATTR_AREA,
    ATTRIBUTION,
    CONF_CITY,
    CONF_COUNTY,
    CONF_STREET,
    DOMAIN,
    COUNTY_OPTIONS,
    CONF_AREA, ATTR_DESCRIPTION, ATTR_START, ATTR_END,
    CONF_CALENDAR_ENTITY,
)
from .outages import EnergaOutageFetcher, OutageFilter

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
    calendar_entity = config_entry.data.get(CONF_CALENDAR_ENTITY)
    async_add_entities(
        [EnergaAwarieSensor(session, county_id, county_name, area, city, street, calendar_entity)],
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
        calendar_entity: str | None,
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
        self._fetcher = EnergaOutageFetcher(session)
        self._filter = OutageFilter(
            county_id=county_id,
            area=self._area,
            city=self._city,
            street=self._street,
        )
        self._calendar_entity = calendar_entity
        self._posted_event_ids: set[str] = set()

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
            _LOGGER.warning(
                "Energa: Fetching planned outages for county=%s area=%s city=%s street=%s",
                self._county_id,
                self._area,
                self._city,
                self._street,
            )
            outages = await self._fetcher.fetch_outages(self._filter)
            self._outages = outages
            if self._calendar_entity:
                await self._sync_calendar_events(outages)

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

    def _find_next_outage(
        self, outages: list[dict[str, Any]]
    ) -> dict[str, Any] | None:
        """Find the next upcoming outage."""
        now = datetime.now(timezone.utc)
        future_outages = [o for o in outages if o["start_date"] > now]

        if not future_outages:
            return None

        return min(future_outages, key=lambda x: x["start_date"])

    async def _get_calendar_events(self, start: datetime, end: datetime) -> list[dict[str, Any]]:
        """Fetch calendar events directly from the calendar entity (not HTTP)."""
        try:
            comp = self.hass.data.get(CALENDAR_DOMAIN)
            if not comp:
                return []
            entity = comp.get_entity(self._calendar_entity)
            if not entity:
                return []
            # Entity method returns list[CalendarEvent] or list[dict]; normalize to list[dict]
            events = await entity.async_get_events(self.hass, start, end)
            normalized: list[dict[str, Any]] = []
            for ev in events:
                if isinstance(ev, dict):
                    normalized.append(ev)
                else:
                    # CalendarEvent object
                    normalized.append(
                        {
                            "summary": getattr(ev, "summary", ""),
                            "description": getattr(ev, "description", ""),
                            "start": getattr(ev, "start", {}),
                            "end": getattr(ev, "end", {}),
                        }
                    )
            return normalized
        except Exception:  # pylint: disable=broad-except
            _LOGGER.debug("Energa: failed to get calendar events", exc_info=True)
            return []

    def _event_date(self, endpoint: dict[str, Any]) -> datetime | None:
        """Return datetime (local tz) from calendar event endpoint dict (start/end)."""
        if not isinstance(endpoint, dict):
            return None
        # All-day events -> 'date'; timed events -> 'dateTime'
        if "dateTime" in endpoint:
            try:
                dt = dateutil.parser.isoparse(endpoint["dateTime"])
                return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)
            except Exception:
                return None
        if "date" in endpoint:
            try:
                # Treat all‑day date as local midnight
                d = dateutil.parser.isoparse(endpoint["date"]).date()
                return dt_util.start_of_local_day(dt_util.now()).replace(
                    year=d.year, month=d.month, day=d.day
                )
            except Exception:
                return None
        return None

    async def _sync_calendar_events(self, outages: list[dict[str, Any]]) -> None:
        """Create all-day calendar events for outages (idempotent & duplicate aware)."""
        if not self.hass or not self._calendar_entity:
            return
        for outage in outages:
            guid = outage.get("guid") or f"{outage['start_date']}_{outage['end_date']}"
            start_dt = outage["start_date"]
            end_dt = outage["end_date"]

            local_start = dt_util.as_local(start_dt)
            local_end = dt_util.as_local(end_dt)
            description = (
                f"{outage.get('description','')}"
            )

            if guid in self._posted_event_ids:
                continue

            # Duplicate detection via direct entity call
            duplicate_found = False
            try:
                day_start = dt_util.start_of_local_day(local_start)
                day_end = day_start + timedelta(days=1)
                existing_events = await self._get_calendar_events(day_start, day_end)
                for ev in existing_events:
                    ev_summary = ev.get("summary", "") or ""
                    ev_description = ev.get("description", "") or ""
                    ev_start_raw = ev.get("start", {})
                    ev_end_raw = ev.get("end", {})
                    if (
                        ev_summary == self.name
                        and ev_description == description
                        and ev_start_raw == local_start
                        and ev_end_raw == local_end
                    ):
                        duplicate_found = True
                        _LOGGER.debug(
                            "Energa: Duplicate calendar event detected (%s)", guid
                        )
                        break
            except Exception:  # pylint: disable=broad-except
                _LOGGER.warning(
                    "Energa: calendar duplicate check failed, proceeding anyway",
                    exc_info=True,
                )

            if duplicate_found:
                self._posted_event_ids.add(guid)
                continue

            payload = {
                "entity_id": self._calendar_entity,
                "summary": self.name,
                "description": description,
                "start_date": local_start,
                "end_date": local_end,
            }
            try:
                await self.hass.services.async_call(
                    "calendar", "create_event", payload, blocking=False
                )
                self._posted_event_ids.add(guid)
                _LOGGER.debug("Energa: Created calendar event for outage %s", guid)
            except Exception:  # pylint: disable=broad-except
                _LOGGER.warning("Energa: Failed to create calendar event", exc_info=True)
        return
