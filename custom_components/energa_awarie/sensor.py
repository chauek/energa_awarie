"""Sensor for next planned Energa shutdown."""
from __future__ import annotations

import logging
import math
from datetime import datetime, timedelta, timezone
from typing import Any

from homeassistant.components.calendar import DOMAIN as CALENDAR_DOMAIN
from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from .const import (
    ATTR_ATTRIBUTION,
    ATTR_DESCRIPTION,
    ATTR_END,
    ATTR_OUTAGES,
    ATTR_OUTAGES_COUNT,
    ATTR_START,
    ATTR_TYPE,
    ATTRIBUTION,
    CONF_AREA,
    CONF_CALENDAR_ENTITY,
    CONF_CITY,
    CONF_COUNTY,
    CONF_STREET,
    COUNTY_OPTIONS,
    DOMAIN,
    SHUTDOWN_TYPE,
    SHUTDOWN_TYPE_PLANNED,
)
from .coordinator import EnergaOutagesCoordinator
from .entity import EnergaAwarieEntity

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up planned-outage sensor."""
    coordinator: EnergaOutagesCoordinator = hass.data[DOMAIN][entry.entry_id][
        "coordinator"
    ]
    county_id = entry.data[CONF_COUNTY]
    county_name = COUNTY_OPTIONS.get(county_id, str(county_id))
    calendar_entity = entry.data.get(CONF_CALENDAR_ENTITY)
    async_add_entities(
        [
            EnergaPlannedOutageSensor(
                coordinator,
                entry.entry_id,
                county_id,
                county_name,
                entry.data.get(CONF_AREA, ""),
                entry.data.get(CONF_CITY, ""),
                entry.data.get(CONF_STREET, ""),
                calendar_entity,
            )
        ]
    )


class EnergaPlannedOutageSensor(EnergaAwarieEntity, SensorEntity):
    """Dni do najbliższego planowanego wyłączenia."""

    _attr_translation_key = "planned_outage"
    _attr_native_unit_of_measurement = "dni"
    _attr_icon = "mdi:calendar-clock"

    def __init__(
        self,
        coordinator: EnergaOutagesCoordinator,
        entry_id: str,
        county_id: int,
        county_name: str,
        area: str,
        city: str,
        street: str,
        calendar_entity: str | None,
    ) -> None:
        super().__init__(
            coordinator, entry_id, county_id, county_name, area, city, street
        )
        self._calendar_entity = calendar_entity
        self._posted_event_ids: set[str] = set()
        self._attr_unique_id = f"{entry_id}_planned_outage"

    def _planned_outages(self) -> list[dict[str, Any]]:
        if not self.coordinator.data:
            return []
        now = datetime.now(timezone.utc)
        planned = self.coordinator.data.get("planned", [])
        future = [o for o in planned if o["end_date"] > now]
        return sorted(future, key=lambda x: x["start_date"])

    @property
    def native_value(self) -> int | None:
        outages = self._planned_outages()
        if not outages:
            return None
        next_outage = outages[0]
        now = datetime.now(timezone.utc)
        delta_seconds = max((next_outage["start_date"] - now).total_seconds(), 0)
        return int(math.ceil(delta_seconds / 86400.0))

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        outages = self._planned_outages()
        attrs: dict[str, Any] = {
            **self._location_attributes(),
            ATTR_ATTRIBUTION: ATTRIBUTION,
            ATTR_START: None,
            ATTR_END: None,
            ATTR_DESCRIPTION: "",
            ATTR_TYPE: None,
        }
        outage_list = [
            {
                "start": o["start_date"].isoformat(),
                "end": o["end_date"].isoformat(),
                "description": o.get("description", ""),
                "message": o.get("description", "").split(" (", 1)[0],
            }
            for o in outages
        ]
        if outages:
            attrs[ATTR_OUTAGES] = outage_list
            attrs[ATTR_OUTAGES_COUNT] = len(outages)
            nxt = outages[0]
            attrs[ATTR_START] = nxt["start_date"].isoformat()
            attrs[ATTR_END] = nxt["end_date"].isoformat()
            attrs[ATTR_DESCRIPTION] = nxt.get("description", "")
            attrs[ATTR_TYPE] = SHUTDOWN_TYPE.get(
                str(nxt.get("shutdownType", SHUTDOWN_TYPE_PLANNED)), "Planned"
            )
        return attrs

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        if self._calendar_entity:
            self.async_on_remove(
                self.coordinator.async_add_listener(self._sync_calendar_if_needed)
            )

    @property
    def icon(self) -> str:
        if self.native_value is not None and self.native_value >= 0:
            return "mdi:power-plug-off"
        return "mdi:power-plug"

    def _sync_calendar_if_needed(self) -> None:
        if self._calendar_entity and self.coordinator.data:
            self.hass.async_create_task(
                self._sync_calendar_events(self._planned_outages())
            )

    async def _get_calendar_events(
        self, start: datetime, end: datetime
    ) -> list[dict[str, Any]]:
        try:
            comp = self.hass.data.get(CALENDAR_DOMAIN)
            if not comp:
                return []
            entity = comp.get_entity(self._calendar_entity)
            if not entity:
                return []
            events = await entity.async_get_events(self.hass, start, end)
            normalized: list[dict[str, Any]] = []
            for ev in events:
                if isinstance(ev, dict):
                    normalized.append(ev)
                else:
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

    async def _sync_calendar_events(self, outages: list[dict[str, Any]]) -> None:
        if not self.hass or not self._calendar_entity:
            return
        for outage in outages:
            guid = outage.get("guid") or f"{outage['start_date']}_{outage['end_date']}"
            if guid in self._posted_event_ids:
                continue
            start_dt = outage["start_date"]
            end_dt = outage["end_date"]
            summary = (
                f"Energa wyłączenie {self._area} {self._city} {self._street}".strip()
            )
            local_start = dt_util.as_local(start_dt)
            local_end = dt_util.as_local(end_dt)
            description = outage.get("description", "")

            duplicate_found = False
            try:
                day_start = dt_util.start_of_local_day(local_start)
                day_end = day_start + timedelta(days=1)
                existing_events = await self._get_calendar_events(day_start, day_end)
                for ev in existing_events:
                    if (
                        ev.get("summary", "") == summary
                        and ev.get("description", "") == description
                    ):
                        duplicate_found = True
                        break
            except Exception:  # pylint: disable=broad-except
                _LOGGER.warning(
                    "Energa: calendar duplicate check failed", exc_info=True
                )

            if duplicate_found:
                self._posted_event_ids.add(guid)
                continue

            payload = {
                "entity_id": self._calendar_entity,
                "summary": summary,
                "description": description,
                "start_date": local_start,
                "end_date": local_end,
            }
            try:
                await self.hass.services.async_call(
                    "calendar", "create_event", payload, blocking=False
                )
                self._posted_event_ids.add(guid)
            except Exception:  # pylint: disable=broad-except
                _LOGGER.warning("Energa: failed to create calendar event", exc_info=True)