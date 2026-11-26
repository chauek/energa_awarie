"""Shared entity helpers for Energa Awarie."""
from __future__ import annotations

from typing import Any

from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import EnergaOutagesCoordinator


def display_location(area: str, city: str, street: str, county_name: str) -> str:
    """Human-readable location label."""
    parts = [p for p in [area, city, street] if p and p.strip()]
    return " ".join(parts) if parts else county_name


class EnergaAwarieEntity(CoordinatorEntity[EnergaOutagesCoordinator]):
    """Base entity grouped under one device per config entry."""

    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator: EnergaOutagesCoordinator,
        entry_id: str,
        county_id: int,
        county_name: str,
        area: str,
        city: str,
        street: str,
    ) -> None:
        super().__init__(coordinator)
        self._entry_id = entry_id
        self._county_id = county_id
        self._county_name = county_name
        self._area = area.strip()
        self._city = city.strip()
        self._street = street.strip()
        self._location_label = display_location(
            self._area, self._city, self._street, self._county_name
        )

    @property
    def device_info(self) -> DeviceInfo:
        """Jedno urządzenie na wpis integracji — stabilne przy rekonfiguracji (ulica/miasto)."""
        return DeviceInfo(
            identifiers={(DOMAIN, self._entry_id)},
            name=f"Energa — {self._location_label}",
            manufacturer="Energa-Operator",
            model="Awarie i wyłączenia",
        )

    @property
    def available(self) -> bool:
        """Available when coordinator last update succeeded."""
        return self.coordinator.last_update_success

    def _location_attributes(self) -> dict[str, Any]:
        return {
            "county": self._county_name,
            "area": self._area,
            "city": self._city,
            "street": self._street,
        }