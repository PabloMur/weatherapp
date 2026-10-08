import type { ForecastHour } from "../../types/weather";
import { type Condition, conditionFromCode } from "./conditions";
import { calendarDay, pad2, zonedTime } from "./format";
import { type Phase, PHASES } from "./phases";
import { HOURS_SHOWN, type Snapshot, type Station, type StationDay } from "./station";

/** Un momento del pronóstico elegido en el panel: día (0 = hoy) y franja */
export interface ForecastPick {
  day: number;
  phase: Phase;
}

export interface PhaseCell {
  phase: Phase;
  label: string;
  hour: number;
  temp: number | null;
  /** La hora ya pasó (sólo para hoy) */
  past: boolean;
}

export interface DayCell {
  label: string;
  max: number;
  min: number;
  condition: Condition;
  precip: number;
}

/** Hora local que representa cada franja: alba y ocaso siguen al sol de ese día */
export function phaseHour(day: StationDay, phase: Phase): number {
  switch (phase) {
    case "alba":
      return day.sunrise === null ? 6 : Math.round(day.sunrise / 60);
    case "dia":
      return 13;
    case "ocaso":
      return day.sunset === null ? 19 : Math.round(day.sunset / 60);
    case "noche":
      return 23;
  }
}

function hourIndex(st: Station, date: string, hour: number) {
  return st.hours.findIndex((h) => h.time.startsWith(`${date} ${pad2(hour)}:`));
}

const precipOf = (h: ForecastHour) => Math.max(h.chance_of_rain, h.chance_of_snow);

/** "VIE 09.10.2026" para el encabezado al mirar otro día */
export function dayDateLabel(st: Station, day: number) {
  const date = st.days[day]?.date;
  if (!date) return null;
  const c = calendarDay(date);
  return `${c.weekday} ${c.day}.${c.month}.${c.year}`;
}

/** La pantalla completa en un momento del pronóstico (null si no hay datos) */
export function forecastSnapshot(st: Station, pick: ForecastPick): Snapshot | null {
  const day = st.days[pick.day];
  if (!day) return null;
  const hour = phaseHour(day, pick.phase);
  const i = hourIndex(st, day.date, hour);
  if (i < 0) return null;
  const h = st.hours[i];

  return {
    phase: pick.phase,
    condition: conditionFromCode(h.condition.code),
    title: h.condition.text.toUpperCase(),
    temp: Math.round(h.temp_c),
    feelsLike: Math.round(h.feelslike_c),
    humidity: h.humidity,
    windKph: Math.round(h.wind_kph),
    precip: precipOf(h),
    max: Math.round(day.max),
    min: Math.round(day.min),
    hours: st.hours.slice(i, i + HOURS_SHOWN).map((x) => ({
      label: `${x.time.slice(11, 13)}h`,
      temp: Math.round(x.temp_c),
    })),
    simHour: hour,
  };
}

/** Datos del panel: las franjas de un día y el resumen de cada día */
export function forecastOverview(st: Station, now: number, selectedDay: number) {
  const localHour = zonedTime(now, st.tzId).hour;
  const day = st.days[selectedDay];

  const phases: PhaseCell[] = day
    ? PHASES.map((p) => {
        const hour = phaseHour(day, p.id);
        const h = st.hours[hourIndex(st, day.date, hour)];
        return {
          phase: p.id,
          label: p.label,
          hour,
          temp: h ? Math.round(h.temp_c) : null,
          past: selectedDay === 0 && hour < localHour,
        };
      })
    : [];

  const days: DayCell[] = st.days.map((d, i) => {
    const c = calendarDay(d.date);
    return {
      label: i === 0 ? "HOY" : `${c.weekday} ${c.day}`,
      max: Math.round(d.max),
      min: Math.round(d.min),
      condition: d.condition,
      precip: d.precip,
    };
  });

  return { phases, days };
}
