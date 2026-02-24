/**
 * Configuración de ciudades y coordenadas
 */

export const WEATHER_LOCATIONS = {
  marDelPlata: {
    name: "Mar del Plata",
    lat: -38,
    lon: -57.56,
    coords: "-38%2C-57.56",
  },
  trenqueLauquen: {
    name: "Trenque Lauquen",
    lat: -35.98,
    lon: -62.73,
    coords: "-35.98%2C-62.73",
  },
  montevideo: {
    name: "Montevideo",
    lat: -34.9,
    lon: -56.19,
    coords: "-34.90%2C-56.19",
  },
  tucuman: {
    name: "Tucumán",
    lat: -26.83,
    lon: -65.2,
    coords: "-26.83%2C-65.20",
  },
} as const;

export type LocationKey = keyof typeof WEATHER_LOCATIONS;
