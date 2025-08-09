import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link, useParams } from "@tanstack/react-router";
import {
  Bookmark,
  CalendarClock,
  Camera,
  Clock,
  EllipsisVertical,
  Mail,
  MapPin,
  Navigation,
  Pencil,
  Phone,
  Share2,
  Star,
  Trash2,
} from "lucide-react";
import { useMemo } from "react";
import { Container } from "../components/Container";
import { IconButton } from "../components/IconButton";
import { usePlace } from "../hooks/usePlace";

function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Pill({
  children,
  color = "gray",
  className = "",
}: {
  children: React.ReactNode;
  color?: "gray" | "green" | "red" | "blue";
  className?: string;
}) {
  const colors = {
    gray: "bg-gray-100 text-gray-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${colors[color]} ${className}`}
    >
      {children}
    </span>
  );
}

function Skeleton() {
  return (
    <Container.Root>
      <Container.Navbar />
      <Container.Content>
        <div className="w-full py-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
            <div className="h-9 w-9 bg-gray-200 rounded-full animate-pulse" />
          </div>
          <div className="aspect-[21/9] w-full bg-gray-200 rounded-xl animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </Container.Content>
    </Container.Root>
  );
}

export function PlacePage() {
  const { id } = useParams({ from: "/places/$id" });
  const { place, loading, error } = usePlace(id);

  const cover = useMemo(() => {
    const fallback =
      "https://via.placeholder.com/1600x700/22c55e/ffffff?text=Soccer+Field";
    // TODO: Add images to place
    // @ts-expect-error optional custom shape from your backend
    const images: string[] | undefined = place?.images;
    return images?.[0] ?? fallback;
  }, [place]);

  if (loading) return <Skeleton />;

  if (error) {
    return (
      <Container.Root>
        <Container.Navbar />
        <Container.Content className="py-10">
          <div className="mx-auto max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-700 font-medium">Something went wrong</p>
            <p className="text-red-600/90 text-sm mt-1">{error}</p>
            <Link
              to="/places"
              className="inline-flex mt-4 text-green-700 hover:underline"
            >
              ← Back to Places
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
        <Container.Content className="py-10">
          <div className="mx-auto max-w-xl rounded-xl border bg-white p-6 text-center">
            <p className="text-gray-800 font-medium">Place not found</p>
            <Link
              to="/places"
              className="inline-flex mt-4 text-green-700 hover:underline"
            >
              ← Back to Places
            </Link>
          </div>
        </Container.Content>
      </Container.Root>
    );
  }

  const isActive = Boolean(place.isActive);
  const lastUpdated = new Date(place.updatedAt).toLocaleDateString();
  const createdAt = new Date(place.createdAt).toLocaleDateString();

  // TODO: Add more info to place
  // @ts-expect-error
  const rating: number | undefined = place.rating;
  // @ts-expect-error
  const pricePerHour: number | undefined = place.pricePerHour;
  // @ts-expect-error
  const phone: string | undefined = place.phone;
  // @ts-expect-error
  const email: string | undefined = place.email;
  // @ts-expect-error
  const openHours: string | undefined = place.openHours;

  return (
    <Container.Root>
      <Container.Navbar />
      <Container.Content className="py-10">
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <Link
            to="/places"
            className="text-green-700 hover:underline text-sm md:text-base"
          >
            ← Back to Places
          </Link>

          <div className="flex items-center gap-2">
            <IconButton
              aria-label="Share"
              icon={<Share2 className="h-4 w-4" />}
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: place.name,
                      text: place.description,
                      url: window.location.href,
                    })
                    .catch(() => {});
                } else {
                  navigator.clipboard?.writeText(window.location.href);
                }
              }}
            />
            <IconButton
              aria-label="Save"
              icon={<Bookmark className="h-4 w-4" />}
            />

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <IconButton
                  aria-label="More options"
                  icon={<EllipsisVertical className="h-4 w-4" />}
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="min-w-40 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                  <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-gray-800 rounded-md hover:bg-gray-100 cursor-pointer">
                    <Pencil className="h-4 w-4" /> Edit
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 cursor-pointer">
                    <Trash2 className="h-4 w-4" /> Delete
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>

        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl">
          <img
            src={cover}
            alt={place.name}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <div className="flex flex-wrap items-end gap-3">
              <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-sm">
                {place.name}
              </h1>
              <div className="flex items-center gap-1 text-white/90">
                {typeof rating === "number" && (
                  <>
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm md:text-base">
                      {rating.toFixed(1)}
                    </span>
                  </>
                )}
                <Pill color={isActive ? "green" : "red"} className="ml-2">
                  {isActive ? "Active" : "Inactive"}
                </Pill>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <Section title="Overview">
              <p className="text-gray-700 leading-relaxed">
                {place.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Pill color="gray">5v5</Pill>
                <Pill color="gray">Night lighting</Pill>
                <Pill color="gray">Locker room</Pill>
              </div>
            </Section>

            <Section title="Location">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-gray-900">{place.address}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        place.address
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
                    >
                      <Navigation className="h-4 w-4" /> Open in Maps
                    </a>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
                      onClick={() =>
                        navigator.clipboard?.writeText(place.address)
                      }
                    >
                      <Camera className="h-4 w-4 rotate-90" /> Copy address
                    </button>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Photos">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[cover, cover, cover, cover].map((src, i) => (
                  <div
                    key={cover}
                    className="aspect-square overflow-hidden rounded-xl bg-gray-100"
                  >
                    <img
                      src={src}
                      alt={`${i + 1}`}
                      className="size-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Details">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm text-gray-500">Created</dt>
                  <dd className="text-gray-900">{createdAt}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Last updated</dt>
                  <dd className="text-gray-900">{lastUpdated}</dd>
                </div>
                {openHours && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm text-gray-500">Open hours</dt>
                    <dd className="text-gray-900 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-600 mt-0.5" />{" "}
                      {openHours}
                    </dd>
                  </div>
                )}
              </dl>
            </Section>

            {typeof rating === "number" && (
              <Section title="Reviews">
                <div className="rounded-xl border p-4">
                  <p className="text-sm text-gray-600">Reviews coming soon.</p>
                </div>
              </Section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-5 w-5 text-gray-600" />
                  <p className="text-sm text-gray-600">Availability</p>
                </div>
                <Pill color={isActive ? "green" : "red"}>
                  {isActive ? "Open" : "Closed"}
                </Pill>
              </div>

              <div className="mt-4 flex items-end gap-2">
                {typeof pricePerHour === "number" ? (
                  <>
                    <span className="text-2xl font-bold text-gray-900">
                      R$ {pricePerHour.toFixed(0)}
                    </span>
                    <span className="text-sm text-gray-500">/ hour</span>
                  </>
                ) : (
                  <span className="text-sm text-gray-600">
                    Price on request
                  </span>
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2">
                <Link
                  to="/places/$id/book"
                  params={{ id }}
                  className="inline-flex items-center justify-center rounded-md bg-green-600 text-white px-4 py-2.5 font-medium hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                >
                  Reserve a court
                </Link>
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-2.5 font-medium hover:bg-gray-50"
                  >
                    <Phone className="h-4 w-4" /> Call
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-2.5 font-medium hover:bg-gray-50"
                  >
                    <Mail className="h-4 w-4" /> Email
                  </a>
                )}
              </div>

              <div className="mt-6 border-t pt-4 text-xs text-gray-500">
                Verified {lastUpdated}
              </div>
            </div>
          </aside>
        </div>
      </Container.Content>
    </Container.Root>
  );
}
