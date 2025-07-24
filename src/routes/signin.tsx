import { createLazyRoute } from "@tanstack/react-router";
import SignInPage from "../pages/SignInPage";

export const Route = createLazyRoute("/signin")({
  component: SignInComponent,
});

function SignInComponent() {
  return <SignInPage />;
}
