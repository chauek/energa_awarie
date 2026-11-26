# Blueprinty (automatyzacje)

Pliki w `custom_components/energa_awarie/blueprints/automation/`.

| Plik | Opis |
|------|------|
| `energa_awaria_aktywna.yaml` | Powiadomienie przy włączeniu **Awaria aktywna** |
| `energa_planowane_wylaczenie.yaml` | Gdy **Planowane wyłączenie** ≤ N dni |
| `energa_koniec_awarii.yaml` | Zamyka powiadomienie po zakończeniu awarii |

## Import w Home Assistant

1. Zainstaluj integrację (blueprinty ładują się z katalogu integracji).
2. **Ustawienia → Automatyzacje i sceny → Utwórz automatyzację → Importuj blueprint**.
3. Wybierz szablon z listy (szukaj „Energa”).
4. Wskaż encję z urządzenia integracji (np. `binary_sensor.energa_gdynia_awaria_aktywna`).

## Powiadomienia mobilne

W blueprincie **awaria aktywna** dodaj krok akcji notify w polu „Powiadomienie mobilne” (edytor akcji w UI) lub użyj osobnej automatyzacji z `notify.mobile_app_*`.

## Powiązanie z panelem Energy

Blueprinty **nie** dodają kart na `/energy/electricity`. Energy pokazuje zużycie kWh; wyłączenia sieci to osobne encje i powiadomienia.