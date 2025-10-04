# Energa Awarie (Home Assistant)

Niestandardowa integracja Home Assistant, która monitoruje planowane wyłączenia prądu od Energa-Operator i tworzy sensor pokazujący ile dni zostało do następnego planowanego wyłączenia dla skonfigurowanej lokalizacji (oddział, region, powiat, miasto, ulica).

## Instalacja

### HACS (zalecane)
1. Dodaj to repozytorium do HACS jako niestandardowe repozytorium (typ: Integration).
2. Zainstaluj "Energa Awarie".
3. Uruchom ponownie Home Assistant.

### Ręczna
1. Skopiuj `custom_components/energa_awarie` do katalogu `config/custom_components/` w Home Assistant.
2. Uruchom ponownie Home Assistant.

## Konfiguracja
1. Przejdź do Ustawienia → Urządzenia i usługi → Dodaj integrację.
2. Wyszukaj "Energa Awarie".
3. Wprowadź:
   - Oddział
   - Region
   - Powiat
   - Miasto
   - Ulica

## Sensor
- Stan sensora: liczba dni (liczba całkowita) do następnego planowanego wyłączenia (zaokrąglone w górę).
- Atrybuty:
  - Szczegóły następnego wyłączenia: data_rozpoczęcia, data_zakończenia, opis, lokalizacja
  - planned_outages: liczba znalezionych wyłączeń na stronie
  - oddział, region, powiat, miasto, ulica
  - źródło danych

## Uwagi
- Ta integracja pobiera dane ze strony: https://energa-operator.pl/uslugi/awarie-i-wylaczenia/wylaczenia-planowane
- Struktura strony może się zmienić. W przypadku problemów z parsowaniem, dostosuj logikę parsowania w `sensor.py` (`_parse_outages` / `_extract_outage_data`).
- Interwał odpytywania: 1 godzina.

## Licencja
MIT
