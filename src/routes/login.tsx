import { createLazyRoute } from "@tanstack/react-router";
import LoginPage from "../pages/LoginPage";

export const Route = createLazyRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  return <LoginPage />;
}
