import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { configureAmplify } from "./amplify-config";
import { Spinner } from "./components/Spinner";
import { Container } from "./layouts/Container";
import { router } from "./router";

configureAmplify();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <Container.Root>
          <Container.Content className="justify-center">
            <Spinner className="text-green-500" />
          </Container.Content>
        </Container.Root>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
