import { Link } from "@tanstack/react-router";
import type { Place } from "../services/placesService";
import { Skeleton } from "./Skeleton";

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Link to={"/places/$id"} params={{ id: place.id }}>
      <div className="h-[21rem] flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-48 bg-gray-200">
          <img
            src="https://placehold.co/400x300/22c55e/ffffff/png?text=Field+Image"
            alt={`Field view of ${place.name}`}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
        <div className="flex flex-col flex-1 p-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {place.name}
            </h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {place.description}
            </p>
            <p className="text-gray-500 text-xs mb-3 line-clamp-2">
              {place.address}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PlaceCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48">
        <Skeleton form="free" className="w-full h-full" />
      </div>
      <div className="p-4">
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-5 w-full mb-0.5" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-4 w-40 mb-2" />
      </div>
    </div>
  );
}
