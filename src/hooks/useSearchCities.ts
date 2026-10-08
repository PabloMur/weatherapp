import { useQuery } from "@tanstack/react-query";
import { APISearchCities } from "../lib/APiCalls";

export function useSearchCities(searchTerm: string) {
  return useQuery({
    queryKey: ["citySearch", searchTerm],
    queryFn: () => APISearchCities(searchTerm),
    enabled: searchTerm.length >= 2,
    staleTime: 60 * 1000,
  });
}
