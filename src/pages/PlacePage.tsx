import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link, useParams } from "@tanstack/react-router";
import { Container } from "../components/Container";
import { IconButton } from "../components/IconButton";
import { Spinner } from "../components/Spinner";
import { usePlace } from "../hooks/usePlace";

export function PlacePage() {
  const { id } = useParams({ from: "/places/$id" });
  const { place, loading, error } = usePlace(id);

  if (loading) {
    return (
      <Container.Root>
        <Container.Navbar />
        <Container.Content>
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        </Container.Content>
      </Container.Root>
    );
  }

  if (error) {
    return (
      <Container.Root>
        <Container.Navbar />
        <Container.Content>
          <div className="text-center text-red-600 mt-8">
            <p>Error: {error}</p>
            <Link
              to="/places"
              className="text-green-600 hover:underline mt-4 inline-block"
            >
              Back to Places
            </Link>
          </div>
        </Container.Content>
      </Container.Root>
    );
  }

  if (!place) {
    return (
      <Container.Root>
        <Container.Navbar />
        <Container.Content>
          <div className="text-center text-gray-600 mt-8">
            <p>Place not found</p>
            <Link
              to="/places"
              className="text-green-600 hover:underline mt-4 inline-block"
            >
              Back to Places
            </Link>
          </div>
        </Container.Content>
      </Container.Root>
    );
  }

  return (
    <Container.Root>
      <Container.Navbar />
      <Container.Content className="py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/places" className="text-green-600 hover:underline text-sm">
            ← Back to Places
          </Link>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <IconButton
                className="bg-transparent hover:bg-gray-100"
                icon={
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <title>Options</title>
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                }
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="min-w-32 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                <DropdownMenu.Item className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                  Edit
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer">
                  Delete
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <div className="h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden mb-8">
          <img
            src="https://via.placeholder.com/1200x400/22c55e/ffffff?text=Soccer+Field"
            alt={place.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-900">{place.name}</h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                place.isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {place.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {place.description}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Address
              </h2>
              <p className="text-gray-700">{place.address}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Details
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500 block">Created</span>
                <p className="text-gray-900">
                  {new Date(place.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">
                  Last Updated
                </span>
                <p className="text-gray-900">
                  {new Date(place.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container.Content>
    </Container.Root>
  );
}
