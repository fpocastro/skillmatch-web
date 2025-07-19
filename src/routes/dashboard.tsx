import { createLazyRoute } from "@tanstack/react-router";
import DashboardPage from "../pages/DashboardPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const Route = createLazyRoute("/dashboard")({
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}
