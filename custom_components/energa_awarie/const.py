"""Constants for the Energa Awarie integration."""

DOMAIN = "energa_awarie"

# Configuration keys
CONF_COUNTY = "county"
CONF_AREA = "area"  # Gmina
CONF_CITY = "city"
CONF_STREET = "street"
CONF_CALENDAR_ENTITY = "calendar_entity"  # Optional calendar to create events

# Source URL
ENERGA_BASE_URL = "https://energa-operator.pl"
ENERGA_PLANNED_URL = f"{ENERGA_BASE_URL}/uslugi/awarie-i-wylaczenia/wylaczenia-planowane"

# Attributes
ATTR_START = "start"
ATTR_END = "end"
ATTR_DESCRIPTION = "description"
ATTR_COUNTY = "county"
ATTR_AREA = "area"
ATTR_CITY = "city"
ATTR_STREET = "street"
ATTR_TYPE = "type"
ATTR_ATTRIBUTION = "attribution"

ATTRIBUTION = "Data provided by Energa-Operator"

SHUTDOWN_TYPE = {
    "1": "Outage",
    "2": "Planned",
}

# County select options (ID -> display name)
COUNTY_OPTIONS = {
    213: "milicki",
    214: "oleśnicki",
    401: "aleksandrowski",
    402: "brodnicki",
    404: "chełmiński",
    405: "golubsko-dobrzyński",
    406: "grudziądzki",
    407: "inowrocławski",
    408: "lipnowski",
    409: "mogileński",
    411: "radziejowski",
    412: "rypiński",
    413: "sępoleński",
    414: "świecki",
    415: "toruński",
    416: "tucholski",
    417: "wąbrzeski",
    418: "włocławski",
    462: "Grudziądz",
    463: "Toruń",
    464: "Włocławek",
    1002: "kutnowski",
    1004: "łęczycki",
    1005: "łowicki",
    1011: "poddębicki",
    1014: "sieradzki",
    1017: "wieluński",
    1018: "wieruszowski",
    1020: "zgierski",
    1402: "ciechanowski",
    1404: "gostyniński",
    1408: "legionowski",
    1411: "makowski",
    1413: "mławski",
    1414: "nowodworski, Płońsk",
    1419: "płocki",
    1420: "płoński",
    1422: "przasnyski",
    1424: "pułtuski",
    1427: "sierpecki",
    1428: "sochaczewski",
    1437: "żuromiński",
    1462: "Płock",
    1608: "oleski",
    2201: "bytowski",
    2202: "chojnicki",
    2203: "człuchowski",
    2204: "gdański",
    2205: "kartuski",
    2206: "kościerski",
    2207: "kwidzyński",
    2208: "lęborski",
    2209: "malborski",
    2210: "nowodworski, Malbork",
    2211: "pucki",
    2212: "słupski",
    2213: "starogardzki",
    2214: "tczewski",
    2215: "wejherowski",
    2216: "sztumski",
    2261: "Gdańsk",
    2262: "Gdynia",
    2263: "Słupsk",
    2264: "Sopot",
    2801: "bartoszycki",
    2802: "braniewski",
    2803: "działdowski",
    2804: "elbląski",
    2806: "giżycki",
    2807: "iławski",
    2808: "kętrzyński",
    2809: "lidzbarski",
    2810: "mrągowski",
    2811: "nidzicki",
    2812: "nowomiejski",
    2814: "olsztyński",
    2815: "ostródzki",
    2816: "piski",
    2817: "szczycieński",
    2819: "węgorzewski",
    2861: "Elbląg",
    2862: "Olsztyn",
    3003: "gnieźnieński",
    3004: "gostyński",
    3006: "jarociński",
    3007: "kaliski",
    3008: "kępiński",
    3009: "kolski",
    3010: "koniński",
    3012: "krotoszyński",
    3017: "ostrowski",
    3018: "ostrzeszowski",
    3020: "pleszewski",
    3023: "słupecki",
    3025: "średzki",
    3027: "turecki",
    3030: "wrzesiński",
    3031: "złotowski",
    3061: "Kalisz",
    3062: "Konin",
    3201: "białogardzki",
    3202: "choszczeński",
    3203: "drawski",
    3205: "gryficki",
    3208: "kołobrzeski",
    3209: "koszaliński",
    3213: "sławieński",
    3215: "szczecinecki",
    3216: "świdwiński",
    3218: "łobeski",
    3261: "Koszalin",
}

# Map county ID -> (deprecated structure) retained only if future migration needed
# Can be safely removed later; not used now.
COUNTY_ID_MAP = {}  # intentionally emptied; matching now uses county id only
