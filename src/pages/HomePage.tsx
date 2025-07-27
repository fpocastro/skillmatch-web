import { Link } from "@tanstack/react-router";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Skeleton } from "../components/Skeleton";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const features = [
    {
      id: 1,
      icon: "⚽",
      title: "Skill Matching",
      description:
        "Find players that match your skill level for balanced and fun games.",
    },
    {
      id: 2,
      icon: "📍",
      title: "Local Games",
      description:
        "Discover matches and players in your area for convenient meetups.",
    },
    {
      id: 3,
      icon: "👥",
      title: "Community",
      description:
        "Join a vibrant community of soccer players and make new friends.",
    },
  ];

  return (
    <Container.Root>
      <Container.Navbar />
      <Container.Content>
        <div className="flex flex-col flex-1">
          <main className="flex-1 flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-gray-900 sm:text-6xl">
                Find Your Perfect
                <span className="text-green-600"> Soccer Match</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                Connect with players of your skill level, organize matches, and
                enjoy the beautiful game with like-minded soccer enthusiasts.
              </p>
              <div className="flex justify-center mt-10">
                {isLoading ? (
                  <Skeleton className="h-10 w-28" />
                ) : (
                  <Button asChild>
                    <Link to={isAuthenticated ? "/dashboard" : "/signin"}>
                      {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </main>
          <section className="py-16 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                  <div key={feature.id} className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-green-600 text-xl">
                        {feature.icon}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Container.Content>
    </Container.Root>
  );
}
