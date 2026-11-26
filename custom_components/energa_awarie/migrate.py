"""Config entry migrations (stable device/entity ids in 1.2.0)."""
from __future__ import annotations

import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er

from .const import CONFIG_ENTRY_MINOR_VERSION, DOMAIN

_LOGGER = logging.getLogger(__name__)

ENTITY_UNIQUE_ID_SUFFIXES = (
    "_active_outage",
    "_planned_outage",
    "_planned_outage_soon",
)


def _target_unique_id(entry_id: str, suffix: str) -> str:
    return f"{entry_id}{suffix}"


def _migrate_entity_unique_ids(
    ent_reg: er.EntityRegistry, entry_id: str, entities: list[er.RegistryEntry]
) -> None:
    """Drop slug-based duplicates when entry_id-based entities already exist."""
    by_suffix: dict[str, list[er.RegistryEntry]] = {
        suffix: [] for suffix in ENTITY_UNIQUE_ID_SUFFIXES
    }
    for entity in entities:
        uid = entity.unique_id
        if not uid:
            continue
        for suffix in ENTITY_UNIQUE_ID_SUFFIXES:
            if uid == _target_unique_id(entry_id, suffix) or uid.endswith(suffix):
                by_suffix[suffix].append(entity)
                break

    for suffix, group in by_suffix.items():
        if not group:
            continue
        target_uid = _target_unique_id(entry_id, suffix)
        canonical = next((e for e in group if e.unique_id == target_uid), None)
        legacy = [e for e in group if e.unique_id != target_uid]

        if canonical:
            for entity in legacy:
                _LOGGER.info(
                    "Removing duplicate %s (unique_id %s), keeping %s",
                    entity.entity_id,
                    entity.unique_id,
                    canonical.entity_id,
                )
                ent_reg.async_remove(entity.entity_id)
            continue

        if not legacy:
            continue

        keep, *duplicates = legacy
        ent_reg.async_update_entity(keep.entity_id, new_unique_id=target_uid)
        _LOGGER.info(
            "Migrated %s unique_id %s -> %s",
            keep.entity_id,
            keep.unique_id,
            target_uid,
        )
        for entity in duplicates:
            _LOGGER.info(
                "Removing duplicate %s (unique_id %s)",
                entity.entity_id,
                entity.unique_id,
            )
            ent_reg.async_remove(entity.entity_id)


def _migrate_device_identifiers(dev_reg: dr.DeviceRegistry, entry_id: str) -> None:
    for device in dr.async_entries_for_config_entry(dev_reg, entry_id):
        if (DOMAIN, entry_id) in device.identifiers:
            continue
        dev_reg.async_update_device(
            device.id,
            new_identifiers={(DOMAIN, entry_id)},
        )
        _LOGGER.info("Migrated device %s to entry_id identifier", device.id)


async def async_migrate_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """One device per config entry; entity unique_ids keyed by entry_id."""
    if entry.minor_version >= CONFIG_ENTRY_MINOR_VERSION:
        return True

    entry_id = entry.entry_id
    ent_reg = er.async_get(hass)
    dev_reg = dr.async_get(hass)

    entities = er.async_entries_for_config_entry(ent_reg, entry_id)
    _migrate_entity_unique_ids(ent_reg, entry_id, entities)
    _migrate_device_identifiers(dev_reg, entry_id)

    hass.config_entries.async_update_entry(
        entry, minor_version=CONFIG_ENTRY_MINOR_VERSION
    )
    return True