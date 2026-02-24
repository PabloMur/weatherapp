import { httpClient } from "./httpClient";
import { WEATHER_LOCATIONS } from "./weatherLocations";
import type { ForecastResponse, CurrentWeatherResponse, SearchResult } from "../types/weather";

async function getWeatherByLocation(locationKey: keyof typeof WEATHER_LOCATIONS) {
  const location = WEATHER_LOCATIONS[locationKey];
  return httpClient.get<CurrentWeatherResponse>(`/current.json`, {
    params: { q: location.coords },
  });
}

// Mar del Plata — usado por ciudades secundarias (mantiene compatibilidad)
export async function APIgetWeather() {
  return getWeatherByLocation("marDelPlata");
}

export async function APIgetWeatherTrenqueLauquen() {
  return getWeatherByLocation("trenqueLauquen");
}

export async function APIgetWeatherMontevideo() {
  return getWeatherByLocation("montevideo");
}

export async function APIgetWeatherTucuman() {
  return getWeatherByLocation("tucuman");
}

// Clima + forecast de 7 días para una ciudad arbitraria (query = nombre o lat,lon)
export async function APIgetForecast(cityQuery: string): Promise<ForecastResponse> {
  return httpClient.get<ForecastResponse>("/forecast.json", {
    params: { q: cityQuery, days: 7 },
  });
}

// Autocompletado de ciudades
export async function APISearchCities(searchTerm: string): Promise<SearchResult[]> {
  return httpClient.get<SearchResult[]>("/search.json", {
    params: { q: searchTerm },
  });
}
