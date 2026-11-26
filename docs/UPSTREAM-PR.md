# Propozycja PR do chauek/energa_awarie

## Podsumowanie

- Encje na wpis: `binary_sensor` awaria (typ 1), `binary_sensor` trwające wyłączenie planowane (typ 2), `sensor` dni do planu.
- `DataUpdateCoordinator`, wspólny fetch planowanych i mapy bieżących (`outages.py`); daty bez TZ → `Europe/Warsaw`.
- Config flow: reconfigure, API gmin/miast, czyszczenie ulicy/miasta (`suggested_value`), jedno urządzenie (`entry_id`) + `migrate.py`.
- Blueprinty powiadomień; stany PL: np. „Bez awarii” zamiast domyślnego „OK” na `/maintenance`.

## Breaking change

Stary pojedynczy sensor znika na rzecz trzech encji (`active_outage`, `planned_outage_soon`, `planned_outage`). Po aktualizacji: przeładuj integrację, migracja minor 9 usuwa duplikaty po rekonfiguracji, usuń sieroty urządzeń.

## Test plan (dla reviewera)

1. Dodaj wpis: powiat grodzki (np. Gdynia 2262) + gmina z listy.
2. Sprawdź encje w jednym urządzeniu.
3. Rekonfiguracja z dodaniem miasta — **jeden** wpis integracji (nie duplikat).
4. Import blueprintu awarii i test `persistent_notification` (symulacja stanu lub realny feed).
5. Opcjonalnie kalendarz — wydarzenie dla planu.

## Wersja

`manifest.json` → `1.2.0`