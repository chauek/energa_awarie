# Energa Awarie — Home Assistant

Monitors **planned shutdowns** and **active outage** alerts from Energa Operator (Poland) for a configured county / municipality / optional city and street.

Development fork: [Flower7C3/energa_awarie](https://github.com/Flower7C3/energa_awarie) (based on [chauek/energa_awarie](https://github.com/chauek/energa_awarie)).

## Entities (1.2+)

- **`binary_sensor`** — active unplanned outage (current outages map, ~15 min polling).
- **`sensor`** — days until next planned shutdown, `outages` attribute list.

Also: reconfigure flow, location hints from API, optional calendar events, automation blueprints.

See [README.md](README.md) (Polish) and [docs/BLUEPRINTS.md](docs/BLUEPRINTS.md).

## Install

HACS custom repository → Integration → restart Home Assistant.

## License

MIT