import { Spinner } from "@/components/spinner";
import { Layout } from "@/layout";
import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";

// Lazy load pages
const Home = lazy(() => import("../pages/home"));
const Settings = lazy(() => import("../pages/settings"));

/**
 * Route configuration
 */
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<Spinner />}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
];

function Router() {
  return useRoutes(routes);
}

export default Router;
