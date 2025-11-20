import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "./providers/react-query";
import Router from "./router";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ReactQueryProvider>
        <Toaster position="top-center" />
        <Router />
      </ReactQueryProvider>
    </BrowserRouter>
  </StrictMode>
);
