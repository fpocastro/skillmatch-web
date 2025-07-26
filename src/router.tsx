import { createRoute, createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
}).lazy(() => import("./routes/index").then((d) => d.Route));

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "signin",
}).lazy(() => import("./routes/signin").then((d) => d.Route));

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "signup",
}).lazy(() => import("./routes/signup").then((d) => d.Route));

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "dashboard",
}).lazy(() => import("./routes/dashboard").then((d) => d.Route));

const placesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "places",
}).lazy(() => import("./routes/places").then((d) => d.Route));

const routeTree = rootRoute.addChildren([
  indexRoute,
  signInRoute,
  signUpRoute,
  dashboardRoute,
  placesRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
