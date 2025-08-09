import { createLazyRoute } from "@tanstack/react-router";
import { PlacePage } from "../pages/PlacePage";

export const Route = createLazyRoute("/places/$id")({
  component: PlacePage,
});
