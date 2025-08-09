import { useQuery } from "@tanstack/react-query";
import { placesService } from "../services/placesService";

export function usePlace(id: string) {
  const placeQuery = useQuery({
    queryKey: ["place", id],
    queryFn: () => placesService.getPlace(id),
    staleTime: 1000 * 60 * 5,
  });

  return {
    place: placeQuery.data,
    loading: placeQuery.isLoading,
    error: placeQuery.error?.message || null,
    refetch: placeQuery.refetch,
  };
}
