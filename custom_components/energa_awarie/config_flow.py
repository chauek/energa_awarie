"""Config flow for Energa Awarie integration."""
from __future__ import annotations

import logging
from typing import Any
import unicodedata

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.data_entry_flow import FlowResult

from .const import (
    CONF_CITY,
    CONF_COUNTY,
    CONF_STREET,
    DOMAIN,
    COUNTY_OPTIONS,
    CONF_AREA,
    CONF_CALENDAR_ENTITY,
)

_LOGGER = logging.getLogger(__name__)

# Static schema removed - now using dynamic schema building


class ConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Energa Awarie."""
    VERSION = 1
    MINOR_VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        if user_input is not None:
            errors: dict[str, str] = {}
            try:
                county_raw = user_input.get(CONF_COUNTY)
                area = user_input.get(CONF_AREA, "").strip()
                city = user_input.get(CONF_CITY, "").strip()
                street = user_input.get(CONF_STREET, "").strip()
                calendar_entity = user_input.get(CONF_CALENDAR_ENTITY)

                if county_raw is None or not area:
                    errors["base"] = "invalid_input"
                else:
                    try:
                        county_id = int(county_raw)
                    except (TypeError, ValueError):
                        county_id = None
                        errors["base"] = "invalid_input"

                    if county_id is not None:
                        if county_id not in COUNTY_OPTIONS:
                            errors["base"] = "invalid_location"
                        else:
                            # Unique ID: countyid + city + street (lower, underscores)
                            parts = [str(county_id), area]
                            if city:
                                parts.append(city)
                            if street:
                                parts.append(street)
                            unique_id = "_".join(parts).lower().replace(" ", "_")
                            await self.async_set_unique_id(unique_id)
                            self._abort_if_unique_id_configured()

                            county_name = COUNTY_OPTIONS[county_id]
                            title_parts = [f"Powiat {county_name}", f"Gmina {area}"]
                            if city and street:
                                title_parts.append(f"{city}, {street}")
                            elif city:
                                title_parts.append(city)
                            title = " - ".join(title_parts)

                            data = {
                                CONF_COUNTY: county_id,
                                CONF_AREA: area,
                                CONF_CITY: city,
                                CONF_STREET: street,
                            }
                            if calendar_entity:
                                data[CONF_CALENDAR_ENTITY] = calendar_entity
                            return self.async_create_entry(title=title, data=data)
            except Exception:  # pylint: disable=broad-except
                _LOGGER.exception("Unexpected exception during config flow")
                errors["base"] = "unknown"

            schema = self._build_schema(user_input)
            return self.async_show_form(step_id="user", data_schema=schema, errors=errors)

        schema = self._build_schema(user_input)
        return self.async_show_form(step_id="user", data_schema=schema, errors={})

    def _build_schema(self, user_input: dict[str, Any] | None = None) -> vol.Schema:
        """Build dynamic schema with county ID select."""
        county_default = user_input.get(CONF_COUNTY) if user_input else vol.UNDEFINED
        area_default = user_input.get(CONF_AREA, "") if user_input else ""
        city_default = user_input.get(CONF_CITY, "") if user_input else ""
        street_default = user_input.get(CONF_STREET, "") if user_input else ""
        calendar_default = user_input.get(CONF_CALENDAR_ENTITY) if user_input else vol.UNDEFINED

        def _sort_key(item: tuple[int, str]) -> str:
            return unicodedata.normalize("NFKD", item[1]).casefold()

        sorted_counties = {
            str(k): v for k, v in sorted(COUNTY_OPTIONS.items(), key=_sort_key)
        }

        # Build calendar entity options (entity_id -> friendly name)
        calendar_states = [
            (state.entity_id, state.name or state.entity_id)
            for state in self.hass.states.async_all()
            if state.entity_id.startswith("calendar.")
        ]
        calendar_states_sorted = sorted(
            calendar_states,
            key=lambda item: unicodedata.normalize("NFKD", item[1]).casefold(),
        )
        calendar_options = {eid: label for eid, label in calendar_states_sorted}

        schema_dict = {
            vol.Required(CONF_COUNTY, default=county_default): vol.In(sorted_counties),
            vol.Required(CONF_AREA, default=area_default): str,
            vol.Optional(CONF_CITY, default=city_default): str,
            vol.Optional(CONF_STREET, default=street_default): str,
        }
        if calendar_options:
            schema_dict[vol.Optional(CONF_CALENDAR_ENTITY, default=calendar_default)] = vol.In(calendar_options)
        else:
            schema_dict[vol.Optional(CONF_CALENDAR_ENTITY, default=calendar_default)] = str

        return vol.Schema(schema_dict)
