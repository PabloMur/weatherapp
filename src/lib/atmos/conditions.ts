export type Condition =
  | "claro"
  | "nubes"
  | "lluvia"
  | "tormenta"
  | "nieve"
  | "niebla";

interface ConditionInfo {
  id: Condition;
  /** Texto del botón del simulador */
  label: string;
  /** Texto grande junto a la temperatura cuando se simula */
  title: string;
  /** Código de la cámara (esquina superior derecha de SKY.CAM) */
  camCode: string;
}

export const CONDITIONS: ConditionInfo[] = [
  { id: "claro", label: "CLARO", title: "DESPEJADO", camCode: "CLR-01" },
  { id: "nubes", label: "NUBES", title: "NUBLADO", camCode: "CLD-04" },
  { id: "lluvia", label: "LLUVIA", title: "LLUVIA", camCode: "RAN-07" },
  { id: "tormenta", label: "TORMENTA", title: "TORMENTA ELÉCTRICA", camCode: "STM-11" },
  { id: "nieve", label: "NIEVE", title: "NEVADA", camCode: "SNW-09" },
  { id: "niebla", label: "NIEBLA", title: "NIEBLA DENSA", camCode: "FOG-02" },
];

export const CONDITION_INFO = Object.fromEntries(
  CONDITIONS.map((c) => [c.id, c]),
) as Record<Condition, ConditionInfo>;

export function isCondition(value: string | null): value is Condition {
  return value !== null && value in CONDITION_INFO;
}

// Códigos de https://www.weatherapi.com/docs/weather_conditions.json
const STORM_CODES = [1087, 1273, 1276, 1279, 1282];
const SNOW_CODES = [
  1066, 1069, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225,
  1237, 1249, 1252, 1255, 1258, 1261, 1264,
];
const FOG_CODES = [1030, 1135, 1147];
const CLOUD_CODES = [1003, 1006, 1009];

export function conditionFromCode(code: number): Condition {
  if (code === 1000) return "claro";
  if (STORM_CODES.includes(code)) return "tormenta";
  if (SNOW_CODES.includes(code)) return "nieve";
  if (FOG_CODES.includes(code)) return "niebla";
  if (CLOUD_CODES.includes(code)) return "nubes";
  return "lluvia";
}
