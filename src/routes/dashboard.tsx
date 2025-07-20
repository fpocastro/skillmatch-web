import { createLazyRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "../components/ProtectedRoute";
import DashboardPage from "../pages/DashboardPage";

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
