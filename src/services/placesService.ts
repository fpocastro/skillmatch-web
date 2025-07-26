import { api } from "./api";

export interface Place {
  id: string;
  name: string;
  description: string;
  address: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlacesResponse {
  data: Place[];
  hasNextPage: boolean;
}

export const placesService = {
  getPlaces: (page: number = 1): Promise<PlacesResponse> =>
    api.get<PlacesResponse>(`/places?page=${page}`),
};
