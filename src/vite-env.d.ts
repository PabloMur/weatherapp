/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Key de WeatherAPI.com (https://www.weatherapi.com/my/) */
  readonly RAPIDAPI_KEY?: string;
  /** Opcional: otra URL base para la API */
  readonly VITE_API_BASE_URL?: string;
  /** "true" para usar respuestas falsas (npm run dev:mock) */
  readonly VITE_USE_MOCK?: string;
}
