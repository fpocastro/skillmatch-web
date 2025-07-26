import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { placesService } from "../services/placesService";

export function usePlace() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["places", page],
    queryFn: () => placesService.getPlaces(page),
    staleTime: 1000 * 60 * 5,
  });

  return {
    places: data?.data || [],
    loading: isLoading,
    error: error?.message || null,
    page,
    hasNextPage: data?.hasNextPage || false,
    setPage,
    refetch,
  };
}
