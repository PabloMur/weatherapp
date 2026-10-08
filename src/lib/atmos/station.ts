import type { ForecastHour, ForecastResponse } from "../../types/weather";
import { type Condition, CONDITION_INFO, conditionFromCode } from "./conditions";
import { type Phase, parseClock, phaseAt, SIM_HOUR } from "./phases";
import { pad2, zonedTime } from "./format";

/** Datos base de una ubicación: lo que llega de la API (o el respaldo offline) */
export interface Station {
  city: string;
  lat: number;
  lon: number;
  tzId: string;
  condition: Condition;
  conditionText: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windKph: number;
  max: number;
  min: number;
  sunrise: number | null;
  sunset: number | null;
  hours: ForecastHour[];
}

/** Horas de la tira "PRÓXIMAS HORAS" (incluida AHORA); el celular muestra la mitad */
export const HOURS_SHOWN = 12;

export interface HourPoint {
  label: string;
  temp: number;
}

/** Lo que se dibuja en pantalla en un instante dado */
export interface Snapshot {
  phase: Phase;
  condition: Condition;
  title: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windKph: number;
  precip: number;
  max: number;
  min: number;
  hours: HourPoint[];
  /** Hora fija del reloj al simular la franja horaria; null = reloj en vivo */
  simHour: number | null;
}

export interface SimOverrides {
  phase: Phase | null;
  condition: Condition | null;
}

export function stationFromForecast(data: ForecastResponse): Station {
  const { location, current, forecast } = data;
  const today = forecast.forecastday[0];
  return {
    city: location.name,
    lat: location.lat,
    lon: location.lon,
    tzId: location.tz_id,
    condition: conditionFromCode(current.condition.code),
    conditionText: current.condition.text,
    temp: current.temp_c,
    feelsLike: current.feelslike_c,
    humidity: current.humidity,
    windKph: current.wind_kph,
    max: today?.day.maxtemp_c ?? current.temp_c,
    min: today?.day.mintemp_c ?? current.temp_c,
    sunrise: parseClock(today?.astro.sunrise),
    sunset: parseClock(today?.astro.sunset),
    hours: forecast.forecastday.flatMap((d) => d.hour ?? []),
  };
}

/** Respaldo cuando no hay enlace con la API: se muestra todo simulado */
export const FALLBACK_STATION: Station = {
  city: "Mar del Plata",
  lat: -38,
  lon: -57.56,
  tzId: Intl.DateTimeFormat().resolvedOptions().timeZone,
  condition: "claro",
  conditionText: "Despejado",
  temp: 17,
  feelsLike: 16,
  humidity: 41,
  windKph: 12,
  max: 20,
  min: 11,
  sunrise: null,
  sunset: null,
  hours: [],
};

interface Profile {
  humidity: number;
  windKph: number;
  precip: number;
  /** Corrimiento de la temperatura media respecto de un día despejado */
  shift: number;
  /** Cuánto se achica la amplitud térmica del día */
  damp: number;
}

const PROFILES: Record<Condition, Profile> = {
  claro: { humidity: 41, windKph: 12, precip: 0, shift: 0, damp: 1 },
  nubes: { humidity: 63, windKph: 17, precip: 10, shift: -2, damp: 0.7 },
  lluvia: { humidity: 88, windKph: 24, precip: 85, shift: -5, damp: 0.5 },
  tormenta: { humidity: 92, windKph: 46, precip: 95, shift: -3, damp: 0.6 },
  nieve: { humidity: 86, windKph: 14, precip: 80, shift: -8, damp: 0.5 },
  niebla: { humidity: 97, windKph: 4, precip: 20, shift: -6, damp: 0.6 },
};

function precipAt(hours: ForecastHour[], now: number) {
  const slot = hours.find(
    (h) => h.time_epoch * 1000 <= now && now < (h.time_epoch + 3600) * 1000,
  );
  return slot ? Math.max(slot.chance_of_rain, slot.chance_of_snow) : 0;
}

function simFeelsLike(temp: number, windKph: number, humidity: number) {
  if (temp >= 27 && humidity >= 40) {
    return temp + Math.round(((temp - 26) * humidity) / 100);
  }
  return temp - 1 - Math.round(Math.max(0, windKph - 12) / 8);
}

function liveSnapshot(st: Station, now: number, phase: Phase): Snapshot {
  const upcoming = st.hours
    .filter((h) => h.time_epoch * 1000 > now)
    .slice(0, HOURS_SHOWN - 1)
    .map((h) => ({ label: `${h.time.slice(11, 13)}h`, temp: Math.round(h.temp_c) }));

  return {
    phase,
    condition: st.condition,
    title: st.conditionText.toUpperCase(),
    temp: Math.round(st.temp),
    feelsLike: Math.round(st.feelsLike),
    humidity: st.humidity,
    windKph: Math.round(st.windKph),
    precip: precipAt(st.hours, now),
    max: Math.round(st.max),
    min: Math.round(st.min),
    hours: [{ label: "AHORA", temp: Math.round(st.temp) }, ...upcoming],
    simHour: null,
  };
}

/**
 * Simula una lectura a partir de la máxima/mínima del día de la estación:
 * la temperatura sigue una curva diaria (pico 15h, piso 3h) que se corre y
 * achata según la condición elegida.
 */
function simulatedSnapshot(
  st: Station,
  now: number,
  phase: Phase,
  condition: Condition,
  hour: number,
  simHour: number | null,
): Snapshot {
  const from = PROFILES[st.condition];
  const to = PROFILES[condition];

  let mid = (st.max + st.min) / 2 + to.shift - from.shift;
  if (condition === "nieve") mid = Math.min(mid, -1);
  const amp = ((st.max - st.min) / 2) * (to.damp / from.damp);
  const tempAt = (h: number) =>
    Math.round(mid + amp * Math.cos((2 * Math.PI * (h - 15)) / 24));

  const sameCondition = condition === st.condition;
  const humidity = sameCondition ? st.humidity : to.humidity;
  const windKph = sameCondition ? Math.round(st.windKph) : to.windKph;
  const precip = sameCondition ? precipAt(st.hours, now) : to.precip;
  const temp = tempAt(hour);
  const start = Math.floor(hour);

  return {
    phase,
    condition,
    title: CONDITION_INFO[condition].title,
    temp,
    feelsLike: simFeelsLike(temp, windKph, humidity),
    humidity,
    windKph,
    precip,
    max: Math.round(mid + amp),
    min: Math.round(mid - amp),
    hours: Array.from({ length: HOURS_SHOWN }, (_, i) =>
      i === 0
        ? { label: "AHORA", temp }
        : { label: `${pad2((start + i) % 24)}h`, temp: tempAt(start + i) },
    ),
    simHour,
  };
}

export function readStation(
  st: Station,
  now: number,
  sim: SimOverrides,
  live: boolean,
): Snapshot {
  const local = zonedTime(now, st.tzId);
  const minutes = local.hour * 60 + local.minute;
  const livePhase = phaseAt(minutes, st.sunrise, st.sunset);

  if (live && !sim.phase && !sim.condition) {
    return liveSnapshot(st, now, livePhase);
  }

  const phase = sim.phase ?? livePhase;
  const simHour = sim.phase ? SIM_HOUR[sim.phase] : null;
  return simulatedSnapshot(
    st,
    now,
    phase,
    sim.condition ?? st.condition,
    simHour ?? minutes / 60,
    simHour,
  );
}
