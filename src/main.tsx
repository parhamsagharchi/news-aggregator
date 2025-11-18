import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "./components/scroll-to-top";
import { ReactQueryProvider } from "./providers/react-query";
import Router from "./router";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ReactQueryProvider>
        <Toaster position="top-right" />
        <ScrollToTop />
        <Router />
      </ReactQueryProvider>
    </BrowserRouter>
  </StrictMode>
);
