export type Phase = "alba" | "dia" | "ocaso" | "noche";

export const PHASES: { id: Phase; label: string }[] = [
  { id: "alba", label: "ALBA" },
  { id: "dia", label: "DÍA" },
  { id: "ocaso", label: "OCASO" },
  { id: "noche", label: "NOCHE" },
];

export const PHASE_LABEL = Object.fromEntries(
  PHASES.map((p) => [p.id, p.label]),
) as Record<Phase, string>;

/** Hora que muestra el reloj al simular cada franja */
export const SIM_HOUR: Record<Phase, number> = {
  alba: 6,
  dia: 13,
  ocaso: 19,
  noche: 23,
};

export function isPhase(value: string | null): value is Phase {
  return value !== null && value in SIM_HOUR;
}

/** "06:45 AM" → minutos desde la medianoche */
export function parseClock(value: string | undefined): number | null {
  const match = value?.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  const hours = (Number(match[1]) % 12) + (match[3].toUpperCase() === "PM" ? 12 : 0);
  return hours * 60 + Number(match[2]);
}

const DEFAULT_SUNRISE = 6 * 60 + 30;
const DEFAULT_SUNSET = 19 * 60 + 30;
// Margen alrededor del amanecer/atardecer que cuenta como alba/ocaso
const TWILIGHT_MINUTES = 50;

export function phaseAt(
  minutes: number,
  sunrise: number | null,
  sunset: number | null,
): Phase {
  const rise = sunrise ?? DEFAULT_SUNRISE;
  const set = sunset ?? DEFAULT_SUNSET;
  if (Math.abs(minutes - rise) <= TWILIGHT_MINUTES) return "alba";
  if (Math.abs(minutes - set) <= TWILIGHT_MINUTES) return "ocaso";
  if (minutes > rise && minutes < set) return "dia";
  return "noche";
}
