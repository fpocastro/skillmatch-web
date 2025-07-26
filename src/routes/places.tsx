import { createLazyRoute } from "@tanstack/react-router";
import PlacesPage from "../pages/PlacesPage";

export const Route = createLazyRoute("/places")({
  component: PlacesPage,
});
