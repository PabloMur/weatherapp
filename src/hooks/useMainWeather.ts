import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  selectedCityAtom,
  cityNameAtom,
  tmpAtom,
  tmpImgAtom,
  weather,
  humidity,
  termalSensation,
  isDay,
} from "../atoms";
import { APIgetForecast } from "../lib/APiCalls";
import type { ForecastDay } from "../types/weather";

export function useMainWeather(): {
  isLoading: boolean;
  isError: boolean;
  forecastDays: ForecastDay[];
} {
  const selectedCity = useRecoilValue(selectedCityAtom);

  const setCityName = useSetRecoilState(cityNameAtom);
  const setTmp = useSetRecoilState(tmpAtom);
  const setTmpImg = useSetRecoilState(tmpImgAtom);
  const setWeather = useSetRecoilState(weather);
  const setHumidity = useSetRecoilState(humidity);
  const setThermal = useSetRecoilState(termalSensation);
  const setIsDay = useSetRecoilState(isDay);

  const query = useQuery({
    queryKey: ["mainWeather", selectedCity],
    queryFn: () => APIgetForecast(selectedCity),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  useEffect(() => {
    if (query.data) {
      const { location, current } = query.data;
      setCityName(location.name);
      setTmp(current.temp_c);
      setTmpImg(current.condition.icon);
      setWeather(current.condition.text);
      setHumidity(current.humidity);
      setThermal(String(current.feelslike_c));
      setIsDay(current.is_day === 1);
    }
  }, [query.data, setCityName, setTmp, setTmpImg, setWeather, setHumidity, setThermal, setIsDay]);

  return {
    isLoading: query.isLoading,
    isError: query.isError,
    forecastDays: query.data?.forecast.forecastday ?? [],
  };
}
