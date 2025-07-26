import type { Place } from "../services/placesService";
import { Badge } from "./Badge";

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200">
        <img
          src="https://placehold.co/400x300/22c55e/ffffff/png?text=Soccer+Field"
          alt={`Field view of ${place.name}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {place.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {place.description}
        </p>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2">
          {place.address}
        </p>
        <Badge color={place.isActive ? "green" : "red"}>
          {place.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>
    </div>
  );
}
