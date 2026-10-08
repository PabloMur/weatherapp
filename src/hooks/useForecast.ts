import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { selectedCityAtom } from "../atoms";
import { APIgetForecast } from "../lib/APiCalls";

/** Forecast (current + horas + astro) de la ciudad seleccionada */
export function useForecast() {
  const selectedCity = useRecoilValue(selectedCityAtom);

  return useQuery({
    queryKey: ["forecast", selectedCity],
    queryFn: () => APIgetForecast(selectedCity),
    placeholderData: keepPreviousData,
    refetchInterval: 10 * 60 * 1000,
    retry: 1,
  });
}
