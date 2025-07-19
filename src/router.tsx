import { createRoute, createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
}).lazy(() => import("./routes/index").then((d) => d.Route));

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
}).lazy(() => import("./routes/login").then((d) => d.Route));

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "dashboard",
}).lazy(() => import("./routes/dashboard").then((d) => d.Route));

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
