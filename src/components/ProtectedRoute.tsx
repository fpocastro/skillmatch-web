import { Navigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { Container } from "./Container";
import { Spinner } from "./Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Container.Root>
        <Container.Content className="justify-center">
          <Spinner className="text-green-500" />
        </Container.Content>
      </Container.Root>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
}
