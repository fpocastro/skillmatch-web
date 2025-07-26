import type { ReactNode } from "react";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { PlaceCard } from "../components/PlaceCard";
import { Spinner } from "../components/Spinner";
import { usePlace } from "../hooks/usePlace";
import type { Place } from "../services/placesService";

interface PlacesStateWrapperProps {
  loading: boolean;
  error: string | null;
  places: Place[];
  children: ReactNode;
}

function PlacesStateWrapper({
  loading,
  error,
  places,
  children,
}: PlacesStateWrapperProps) {
  if (loading) {
    return (
      <div className="flex justify-center mt-4">
        <Spinner className="text-green-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-4">
        <p>{error}</p>
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        <p>No places found</p>
      </div>
    );
  }

  return <>{children}</>;
}

export default function PlacesPage() {
  const { places, loading, error, page, hasNextPage, setPage } = usePlace();

  return (
    <Container.Root>
      <Container.Navbar />
      <Container.Content className="w-full">
        <div className="my-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Places</h1>
          <p className="text-gray-600">
            Find the perfect place for your soccer match
          </p>
        </div>

        <PlacesStateWrapper loading={loading} error={error} places={places}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </PlacesStateWrapper>

        {(page > 1 || hasNextPage) && (
          <div className="flex justify-center items-center space-x-4">
            <Button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
              Previous
            </Button>
            <span className="text-gray-600">Page {page}</span>
            <Button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNextPage}
            >
              Next
            </Button>
          </div>
        )}
      </Container.Content>
    </Container.Root>
  );
}
