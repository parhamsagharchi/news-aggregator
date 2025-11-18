import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../layout";
import { Spinner } from "../components/spinner";

// Lazy load pages
const Home = lazy(() => import("../pages/home"));
const Configuration = lazy(() => import("../pages/configuration"));

/**
 * Route configuration
 * Follows DRY principle by centralizing route definitions
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
        path: "configuration",
        element: (
          <Suspense fallback={<Spinner />}>
            <Configuration />
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
