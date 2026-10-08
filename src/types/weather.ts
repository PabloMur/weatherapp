export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeather {
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  is_day: 0 | 1;
  condition: WeatherCondition;
}

export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime: string;
}

export interface ForecastHour {
  time_epoch: number;
  time: string;
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  chance_of_rain: number;
  chance_of_snow: number;
  condition: WeatherCondition;
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    condition: WeatherCondition;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
  hour: ForecastHour[];
}

export interface ForecastResponse {
  location: WeatherLocation;
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface CurrentWeatherResponse {
  location: WeatherLocation;
  current: CurrentWeather;
}

export interface SearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}
