import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { Spinner } from "../components/Spinner";
import { Container } from "../layouts/Container";

export const rootRoute = createRootRoute({
  component: RootComponent,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <Container.Root>
            <Container.Content className="justify-center">
              <Spinner className="text-green-500" />
            </Container.Content>
          </Container.Root>
        }
      >
        <Outlet />
      </Suspense>
    </QueryClientProvider>
  );
}
