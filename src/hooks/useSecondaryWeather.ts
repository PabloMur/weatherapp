import { useQuery } from "@tanstack/react-query";
import {
  APIgetWeatherTucuman,
  APIgetWeatherMontevideo,
  APIgetWeatherTrenqueLauquen,
} from "../lib/APiCalls";

const STALE = 5 * 60 * 1000;

export function useWeatherTucuman() {
  return useQuery({
    queryKey: ["weather", "tucuman"],
    queryFn: APIgetWeatherTucuman,
    staleTime: STALE,
  });
}

export function useWeatherMontevideo() {
  return useQuery({
    queryKey: ["weather", "montevideo"],
    queryFn: APIgetWeatherMontevideo,
    staleTime: STALE,
  });
}

export function useWeatherTrenqueLauquen() {
  return useQuery({
    queryKey: ["weather", "trenqueLauquen"],
    queryFn: APIgetWeatherTrenqueLauquen,
    staleTime: STALE,
  });
}
