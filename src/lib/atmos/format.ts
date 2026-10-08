export interface ZonedTime {
  weekday: string;
  day: string;
  month: string;
  year: string;
  hour: number;
  minute: number;
}

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatterFor(timeZone: string) {
  let fmt = formatters.get(timeZone);
  if (!fmt) {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    };
    try {
      fmt = new Intl.DateTimeFormat("es-AR", { ...options, timeZone });
    } catch {
      // tz_id desconocido para el navegador: usamos la zona local
      fmt = new Intl.DateTimeFormat("es-AR", options);
    }
    formatters.set(timeZone, fmt);
  }
  return fmt;
}

/** Fecha y hora de un instante en la zona horaria de la ciudad */
export function zonedTime(now: number, timeZone: string): ZonedTime {
  const parts: Record<string, string> = {};
  for (const part of formatterFor(timeZone).formatToParts(now)) {
    parts[part.type] = part.value;
  }
  return {
    weekday: parts.weekday.replace(".", "").toUpperCase(),
    day: parts.day,
    month: parts.month,
    year: parts.year,
    hour: Number(parts.hour) % 24,
    minute: Number(parts.minute),
  };
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

const weekdayFmt = new Intl.DateTimeFormat("es-AR", { weekday: "short", timeZone: "UTC" });

/** "2026-10-09" → { weekday: "VIE", day: "09", month: "10", year: "2026" } */
export function calendarDay(date: string) {
  const [year, month, day] = date.split("-");
  const weekday = weekdayFmt
    .format(new Date(`${date}T12:00:00Z`))
    .replace(".", "")
    .toUpperCase();
  return { weekday, day, month, year };
}

/** -34.6, -58.38 → "34.60°S / 58.38°W" */
export function formatCoords(lat: number, lon: number) {
  const ns = `${Math.abs(lat).toFixed(2)}°${lat < 0 ? "S" : "N"}`;
  const ew = `${Math.abs(lon).toFixed(2)}°${lon < 0 ? "W" : "E"}`;
  return `${ns} / ${ew}`;
}
