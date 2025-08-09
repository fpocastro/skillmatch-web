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

class PlacesService {
  async getPlaces(page: number = 1): Promise<PlacesResponse> {
    return api.get<PlacesResponse>(`/places?page=${page}`);
  }

  async getPlace(id: Place["id"]): Promise<Place> {
    return api.get<Place>(`/places/${id}`);
  }
}

export const placesService = new PlacesService();
