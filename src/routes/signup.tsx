import { createLazyRoute } from "@tanstack/react-router";
import SignUpPage from "../pages/SignUpPage";

export const Route = createLazyRoute("/signup")({
  component: SignUpComponent,
});

function SignUpComponent() {
  return <SignUpPage />;
}