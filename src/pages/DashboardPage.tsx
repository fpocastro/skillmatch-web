import { useAuth } from "../hooks/useAuth";
import { Container } from "../layouts/Container";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <Container.Root>
      <Container.Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Dashboard
              </h2>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-gray-600">
                Welcome to your SkillMatch dashboard!
              </p>
            </div>
          </div>
        </div>
      </main>
    </Container.Root>
  );
}
