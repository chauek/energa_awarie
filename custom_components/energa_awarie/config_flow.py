"""Config flow for Energa Awarie integration."""
from __future__ import annotations

import logging
from typing import Any
import unicodedata

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.data_entry_flow import FlowResult
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.selector import (
    SelectOptionDict,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
)

from .const import (
    CITY_COUNTY_IDS,
    CONF_AREA,
    CONF_CALENDAR_ENTITY,
    CONF_CITY,
    CONF_COUNTY,
    CONF_STREET,
    COUNTY_OPTIONS,
    CONFIG_ENTRY_MINOR_VERSION,
    DOMAIN,
)
from .outages import EnergaOutageFetcher

_LOGGER = logging.getLogger(__name__)


def _norm(text: str) -> str:
    return unicodedata.normalize("NFKD", text).casefold()


def _county_select_options() -> list[SelectOptionDict]:
    return [
        SelectOptionDict(value=str(cid), label=name)
        for cid, name in sorted(COUNTY_OPTIONS.items(), key=lambda i: _norm(i[1]))
    ]


def _fallback_location_hints(county_id: int) -> dict[str, list[str]]:
    """Gdy API Energi nie odpowie — choć minimalna podpowiedź (miasta na prawach powiatu)."""
    name = COUNTY_OPTIONS.get(county_id, "")
    areas: list[str] = []
    cities: list[str] = []
    if name and county_id in CITY_COUNTY_IDS:
        areas = [f"{name} gmina miejska", name]
        cities = [name]
    return {"areas": areas, "cities": cities}


def _select_field(values: list[str]) -> SelectSelector:
    """Lista wyboru z możliwością wpisania własnej wartości."""
    mode = (
        SelectSelectorMode.LIST
        if len(values) <= 12
        else SelectSelectorMode.DROPDOWN
    )
    return SelectSelector(
        SelectSelectorConfig(
            options=[SelectOptionDict(value=v, label=v) for v in values],
            mode=mode,
            sort=True,
            custom_value=True,
        )
    )


class ConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Energa Awarie."""

    VERSION = 1
    MINOR_VERSION = CONFIG_ENTRY_MINOR_VERSION

    def __init__(self) -> None:
        self._county_id: int | None = None

    def _reconfigure_entry(self) -> config_entries.ConfigEntry | None:
        """Aktywny wpis przy rekonfiguracji (nie polegaj na self._reconfigure_entry między krokami)."""
        if self.context.get("source") != config_entries.SOURCE_RECONFIGURE:
            return None
        return self._get_reconfigure_entry()

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        return await self.async_step_powiat(user_input)

    async def async_step_reconfigure(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Ponowna konfiguracja: najpierw powiat (można zmienić), potem gmina/adres."""
        return await self.async_step_powiat(user_input)

    async def async_step_powiat(
        self,
        user_input: dict[str, Any] | None = None,
        errors: dict[str, str] | None = None,
    ) -> FlowResult:
        if user_input is not None:
            try:
                self._county_id = int(user_input[CONF_COUNTY])
            except (TypeError, ValueError):
                return await self.async_step_powiat(errors={"base": "invalid_input"})
            if self._county_id not in COUNTY_OPTIONS:
                return await self.async_step_powiat(errors={"base": "invalid_location"})
            return await self.async_step_location()

        reconfigure = self._reconfigure_entry()
        default = (
            str(reconfigure.data[CONF_COUNTY])
            if reconfigure is not None
            else vol.UNDEFINED
        )

        return self.async_show_form(
            step_id="powiat",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_COUNTY, default=default): SelectSelector(
                        SelectSelectorConfig(
                            options=_county_select_options(),
                            mode=SelectSelectorMode.DROPDOWN,
                            sort=True,
                        )
                    ),
                }
            ),
            errors=errors or {},
        )

    async def async_step_location(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        if user_input is not None:
            return await self._async_finish_location(user_input)

        reconfigure = self._reconfigure_entry()
        if self._county_id is None and reconfigure is not None:
            self._county_id = reconfigure.data.get(CONF_COUNTY)

        defaults: dict[str, Any] = {}
        if reconfigure is not None:
            defaults = {
                CONF_AREA: reconfigure.data.get(CONF_AREA, ""),
                CONF_CITY: reconfigure.data.get(CONF_CITY, ""),
                CONF_STREET: reconfigure.data.get(CONF_STREET, ""),
            }
            if reconfigure.data.get(CONF_CALENDAR_ENTITY):
                defaults[CONF_CALENDAR_ENTITY] = reconfigure.data[CONF_CALENDAR_ENTITY]

        county_name = (
            COUNTY_OPTIONS.get(self._county_id, str(self._county_id))
            if self._county_id is not None
            else "?"
        )

        schema, hint_gminy, hint_miasta = await self._async_build_location_schema(
            defaults
        )

        return self.async_show_form(
            step_id="location",
            data_schema=schema,
            description_placeholders={
                "powiat": county_name,
                "gminy_count": str(len(hint_gminy)),
                "miasta_count": str(len(hint_miasta)),
            },
            errors={},
        )

    async def _async_finish_location(
        self, user_input: dict[str, Any]
    ) -> FlowResult:
        if self._county_id is None:
            return await self.async_step_powiat()

        try:
            data, title, unique_id, errors = self._data_from_input(
                user_input, self._county_id
            )
            if errors:
                county_name = COUNTY_OPTIONS.get(self._county_id, "")
                schema, _, _ = await self._async_build_location_schema(user_input)
                return self.async_show_form(
                    step_id="location",
                    data_schema=schema,
                    description_placeholders={"powiat": county_name, "gminy_count": "?", "miasta_count": "?"},
                    errors=errors,
                )

            assert data is not None and title is not None and unique_id is not None

            reconfigure = self._reconfigure_entry()
            if reconfigure is not None:
                reconfigure_id = reconfigure.entry_id
                for entry in self.hass.config_entries.async_entries(DOMAIN):
                    if (
                        entry.entry_id != reconfigure_id
                        and entry.unique_id == unique_id
                    ):
                        schema, _, _ = await self._async_build_location_schema(
                            user_input
                        )
                        return self.async_show_form(
                            step_id="location",
                            data_schema=schema,
                            description_placeholders={
                                "powiat": COUNTY_OPTIONS.get(self._county_id, ""),
                                "gminy_count": "?",
                                "miasta_count": "?",
                            },
                            errors={"base": "already_configured"},
                        )
                return self.async_update_reload_and_abort(
                    reconfigure,
                    title=title,
                    data=data,
                    unique_id=unique_id,
                )

            await self.async_set_unique_id(unique_id)
            self._abort_if_unique_id_configured()
            return self.async_create_entry(title=title, data=data)
        except Exception:  # pylint: disable=broad-except
            _LOGGER.exception("Unexpected exception during config flow")
            schema, _, _ = await self._async_build_location_schema(user_input)
            return self.async_show_form(
                step_id="location",
                data_schema=schema,
                description_placeholders={
                    "powiat": COUNTY_OPTIONS.get(self._county_id, ""),
                    "gminy_count": "?",
                    "miasta_count": "?",
                },
                errors={"base": "unknown"},
            )

    async def _async_build_location_schema(
        self,
        suggested: dict[str, Any] | None,
    ) -> tuple[vol.Schema, list[str], list[str]]:
        suggested = suggested or {}

        gminy: list[str] = []
        miasta: list[str] = []
        if self._county_id is not None:
            hints = _fallback_location_hints(self._county_id)
            gminy = list(hints["areas"])
            miasta = list(hints["cities"])
            try:
                session = async_get_clientsession(self.hass)
                fetched = await EnergaOutageFetcher(session).suggest_locations_for_county(
                    self._county_id
                )
                gminy = sorted(
                    set(gminy) | set(fetched.get("areas") or []),
                    key=str.casefold,
                )
                miasta = sorted(
                    set(miasta) | set(fetched.get("cities") or []),
                    key=str.casefold,
                )
            except Exception:  # pylint: disable=broad-except
                _LOGGER.warning("Energa: nie udało się pobrać podpowiedzi gmin", exc_info=True)

        if not gminy and self._county_id in COUNTY_OPTIONS:
            county_name = COUNTY_OPTIONS[self._county_id]
            gminy = [county_name]

        area_field: vol.Any = _select_field(gminy) if gminy else str
        city_field: vol.Any = _select_field(miasta) if miasta else str

        calendar_states = [
            (state.entity_id, state.name or state.entity_id)
            for state in self.hass.states.async_all()
            if state.entity_id.startswith("calendar.")
        ]
        calendar_states_sorted = sorted(
            calendar_states,
            key=lambda item: _norm(item[1]),
        )
        calendar_options = {eid: label for eid, label in calendar_states_sorted}

        schema_dict: dict[Any, Any] = {
            vol.Required(CONF_AREA): area_field,
            vol.Optional(CONF_CITY): city_field,
            vol.Optional(CONF_STREET): str,
        }
        if calendar_options:
            schema_dict[vol.Optional(CONF_CALENDAR_ENTITY)] = vol.In(calendar_options)
        else:
            schema_dict[vol.Optional(CONF_CALENDAR_ENTITY)] = str

        schema = vol.Schema(schema_dict)
        if suggested:
            schema = self.add_suggested_values_to_schema(schema, suggested)
        return schema, gminy, miasta

    def _data_from_input(
        self,
        user_input: dict[str, Any],
        county_id: int,
    ) -> tuple[dict[str, Any] | None, str | None, str | None, dict[str, str]]:
        errors: dict[str, str] = {}
        area = (user_input.get(CONF_AREA) or "").strip()
        city = (user_input.get(CONF_CITY) or "").strip()
        street = (user_input.get(CONF_STREET) or "").strip()
        calendar_entity = (user_input.get(CONF_CALENDAR_ENTITY) or "").strip() or None

        if not area:
            errors["base"] = "invalid_input"
            return None, None, None, errors

        if area.isdigit():
            errors["base"] = "gmina_invalid"
            return None, None, None, errors

        if county_id not in COUNTY_OPTIONS:
            errors["base"] = "invalid_location"
            return None, None, None, errors

        parts = [str(county_id), area]
        if city:
            parts.append(city)
        if street:
            parts.append(street)
        unique_id = "_".join(parts).lower().replace(" ", "_")

        county_name = COUNTY_OPTIONS[county_id]
        title_parts = [f"Powiat {county_name}", f"Gmina {area}"]
        if city and street:
            title_parts.append(f"{city}, {street}")
        elif city:
            title_parts.append(city)
        title = " - ".join(title_parts)

        data: dict[str, Any] = {
            CONF_COUNTY: county_id,
            CONF_AREA: area,
            CONF_CITY: city,
            CONF_STREET: street,
        }
        if calendar_entity:
            data[CONF_CALENDAR_ENTITY] = calendar_entity

        return data, title, unique_id, errors