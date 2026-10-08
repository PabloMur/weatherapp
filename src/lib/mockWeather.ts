/**
 * API falsa para desarrollar o mostrar la app sin API key.
 * Se activa con VITE_USE_MOCK=true (ver `npm run dev:mock`).
 * Genera respuestas con la misma forma que WeatherAPI, relativas a la hora actual.
 */
import type {
  ForecastHour,
  ForecastResponse,
  SearchResult,
  WeatherCondition,
} from "../types/weather";

interface MockCity {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz: string;
  min: number;
  max: number;
  code: number;
  sunrise: string;
  sunset: string;
}

// Condiciones variadas para poder ver todas las escenas de SKY.CAM
const CITIES: MockCity[] = [
  { name: "Mar del Plata", region: "Buenos Aires", country: "Argentina", lat: -38, lon: -57.56, tz: "America/Argentina/Buenos_Aires", min: 9, max: 18, code: 1000, sunrise: "06:32 AM", sunset: "07:28 PM" },
  { name: "Buenos Aires", region: "Distrito Federal", country: "Argentina", lat: -34.6, lon: -58.38, tz: "America/Argentina/Buenos_Aires", min: 11, max: 20, code: 1003, sunrise: "06:25 AM", sunset: "07:15 PM" },
  { name: "Córdoba", region: "Córdoba", country: "Argentina", lat: -31.4, lon: -64.18, tz: "America/Argentina/Cordoba", min: 12, max: 22, code: 1189, sunrise: "06:52 AM", sunset: "07:36 PM" },
  { name: "San Miguel de Tucumán", region: "Tucumán", country: "Argentina", lat: -26.82, lon: -65.22, tz: "America/Argentina/Tucuman", min: 17, max: 29, code: 1276, sunrise: "06:59 AM", sunset: "07:33 PM" },
  { name: "Bariloche", region: "Río Negro", country: "Argentina", lat: -41.13, lon: -71.3, tz: "America/Argentina/Salta", min: -3, max: 6, code: 1213, sunrise: "07:21 AM", sunset: "08:12 PM" },
  { name: "Montevideo", region: "Montevideo", country: "Uruguay", lat: -34.9, lon: -56.19, tz: "America/Montevideo", min: 10, max: 17, code: 1135, sunrise: "06:20 AM", sunset: "07:10 PM" },
  { name: "Madrid", region: "Madrid", country: "España", lat: 40.42, lon: -3.7, tz: "Europe/Madrid", min: 12, max: 24, code: 1000, sunrise: "08:08 AM", sunset: "07:42 PM" },
  { name: "Tokio", region: "Tokyo", country: "Japón", lat: 35.69, lon: 139.69, tz: "Asia/Tokyo", min: 17, max: 24, code: 1063, sunrise: "05:39 AM", sunset: "05:18 PM" },
  { name: "Nueva York", region: "New York", country: "Estados Unidos", lat: 40.71, lon: -74.01, tz: "America/New_York", min: 13, max: 21, code: 1006, sunrise: "07:02 AM", sunset: "06:31 PM" },
];

const CONDITION_TEXT: Record<number, string> = {
  1000: "Despejado",
  1003: "Parcialmente nublado",
  1006: "Nublado",
  1063: "Lluvia moderada a intervalos",
  1135: "Niebla",
  1189: "Lluvia moderada",
  1213: "Nieve ligera",
  1276: "Lluvias con tormenta",
};

// Humedad, viento y probabilidad de precipitación típicos por condición
const CONDITION_STATS: Record<number, [number, number, number]> = {
  1000: [41, 12, 0],
  1003: [55, 15, 5],
  1006: [66, 18, 15],
  1063: [82, 20, 70],
  1135: [97, 4, 20],
  1189: [88, 24, 85],
  1213: [86, 14, 80],
  1276: [92, 46, 95],
};

// Condición de los dos días siguientes según la de hoy
const NEXT_DAYS: Record<number, [number, number]> = {
  1000: [1003, 1189],
  1003: [1006, 1000],
  1006: [1063, 1003],
  1063: [1189, 1006],
  1135: [1006, 1000],
  1189: [1276, 1003],
  1213: [1213, 1006],
  1276: [1189, 1000],
};

const HOUR = 3600 * 1000;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function findCity(query: string): MockCity {
  const [lat, lon] = query.split(",").map(Number);
  if (Number.isFinite(lat) && Number.isFinite(lon)) {
    const nearest = [...CITIES].sort(
      (a, b) => Math.hypot(a.lat - lat, a.lon - lon) - Math.hypot(b.lat - lat, b.lon - lon),
    )[0];
    if (Math.hypot(nearest.lat - lat, nearest.lon - lon) < 0.5) return nearest;
    // Coordenadas de la geolocalización: una ubicación genérica en la zona del navegador
    return {
      ...CITIES[0],
      name: "Mi ubicación",
      region: "",
      country: "",
      lat,
      lon,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }
  return CITIES.find((c) => normalize(c.name).includes(normalize(query))) ?? CITIES[0];
}

function clockMinutes(value: string) {
  const [, h, m, ampm] = value.match(/(\d+):(\d+) (AM|PM)/) ?? [];
  return ((Number(h) % 12) + (ampm === "PM" ? 12 : 0)) * 60 + Number(m);
}

function buildForecast(city: MockCity): ForecastResponse {
  const fmt = new Intl.DateTimeFormat("sv-SE", {
    timeZone: city.tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const now = Date.now();
  const localNow = fmt.format(now); // "2026-10-07 23:08"
  const localHour = Number(localNow.slice(11, 13));
  const localMinute = Number(localNow.slice(14, 16));
  const midnight = Math.floor(now / HOUR) * HOUR - localHour * HOUR;

  // Días siguientes: otra condición y la temperatura corrida, para que el
  // panel de pronóstico muestre días distintos
  const dayCodes = [city.code, ...NEXT_DAYS[city.code]];
  const dayShift = [0, 2, -1];
  const tempAt = (d: number, h: number) => {
    const mid = (city.max + city.min) / 2 + dayShift[d];
    const amp = (city.max - city.min) / 2;
    return mid + amp * Math.cos((2 * Math.PI * (h - 15)) / 24);
  };
  const conditionOf = (code: number): WeatherCondition => ({
    code,
    text: CONDITION_TEXT[code],
    icon: "",
  });
  const round1 = (n: number) => Math.round(n * 10) / 10;

  const hours: ForecastHour[] = Array.from({ length: 72 }, (_, i) => {
    const d = Math.floor(i / 24);
    const h = i % 24;
    const code = dayCodes[d];
    const [humidity, wind, precip] = CONDITION_STATS[code];
    const temp = tempAt(d, h);
    const epoch = midnight + i * HOUR;
    return {
      time_epoch: epoch / 1000,
      time: fmt.format(epoch),
      temp_c: round1(temp),
      feelslike_c: round1(temp - 1 - Math.max(0, wind - 12) / 8),
      // Más húmedo de noche que a la tarde
      humidity: Math.min(100, Math.round(humidity - 8 * Math.cos((2 * Math.PI * (h - 15)) / 24))),
      wind_kph: wind,
      chance_of_rain: code === 1213 ? 0 : precip,
      chance_of_snow: code === 1213 ? precip : 0,
      condition: conditionOf(code),
    };
  });

  const minutes = localHour * 60 + localMinute;
  const isDay = minutes > clockMinutes(city.sunrise) && minutes < clockMinutes(city.sunset);
  const temp = round1(tempAt(0, minutes / 60));
  const [humidity, wind] = CONDITION_STATS[city.code];
  const condition = conditionOf(city.code);

  return {
    location: {
      name: city.name,
      region: city.region,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      tz_id: city.tz,
      localtime: localNow,
    },
    current: {
      temp_c: temp,
      feelslike_c: Math.round((temp - 1 - Math.max(0, wind - 12) / 8) * 10) / 10,
      humidity,
      wind_kph: wind,
      is_day: isDay ? 1 : 0,
      condition: isDay && city.code === 1000 ? { ...condition, text: "Soleado" } : condition,
    },
    forecast: {
      forecastday: [0, 1, 2].map((d) => {
        const [, , precip] = CONDITION_STATS[dayCodes[d]];
        const snow = dayCodes[d] === 1213;
        return {
          date: hours[d * 24].time.slice(0, 10),
          day: {
            maxtemp_c: city.max + dayShift[d],
            mintemp_c: city.min + dayShift[d],
            daily_chance_of_rain: snow ? 0 : precip,
            daily_chance_of_snow: snow ? precip : 0,
            condition: conditionOf(dayCodes[d]),
          },
          astro: { sunrise: city.sunrise, sunset: city.sunset },
          hour: hours.slice(d * 24, d * 24 + 24),
        };
      }),
    },
  };
}

export async function mockForecast(query: string): Promise<ForecastResponse> {
  await sleep(450);
  return buildForecast(findCity(decodeURIComponent(query)));
}

export async function mockSearch(term: string): Promise<SearchResult[]> {
  await sleep(250);
  const needle = normalize(term);
  return CITIES.filter((c) => normalize(`${c.name} ${c.region} ${c.country}`).includes(needle)).map(
    (c, i) => ({
      id: i + 1,
      name: c.name,
      region: c.region,
      country: c.country,
      lat: c.lat,
      lon: c.lon,
      url: "",
    }),
  );
}
