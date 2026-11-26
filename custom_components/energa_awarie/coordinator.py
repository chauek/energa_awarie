"""Data coordinator for Energa outage feeds."""
from __future__ import annotations

import logging
from datetime import timedelta

from aiohttp import ClientSession
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .const import (
    CONF_AREA,
    CONF_CITY,
    CONF_COUNTY,
    CONF_STREET,
    UPDATE_INTERVAL_CURRENT,
)
from .outages import EnergaOutageFetcher, OutageFilter

_LOGGER = logging.getLogger(__name__)


class EnergaOutagesCoordinator(DataUpdateCoordinator[dict[str, list]]):
    """Fetch planned + current outage JSON (shared cache in fetcher)."""

    def __init__(
        self,
        hass: HomeAssistant,
        session: ClientSession,
        entry: ConfigEntry,
    ) -> None:
        self._fetcher = EnergaOutageFetcher(session)
        self._filter = OutageFilter(
            county_id=entry.data[CONF_COUNTY],
            area=entry.data.get(CONF_AREA, ""),
            city=entry.data.get(CONF_CITY, ""),
            street=entry.data.get(CONF_STREET, ""),
        )
        super().__init__(
            hass,
            _LOGGER,
            name=f"energa_awarie_{entry.entry_id}",
            update_interval=timedelta(seconds=UPDATE_INTERVAL_CURRENT),
        )

    async def _async_update_data(self) -> dict[str, list]:
        try:
            planned = await self._fetcher.fetch_planned_outages(self._filter)
            current = await self._fetcher.fetch_current_outages(self._filter)
            return {"planned": planned, "current": current}
        except Exception as err:  # pylint: disable=broad-except
            raise UpdateFailed(f"Energa outage update failed: {err}") from err