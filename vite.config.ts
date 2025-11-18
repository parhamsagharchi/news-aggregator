import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const config = {
    plugins: [react()],
    server: {
      host: true,
      port: 3000,
      open: true,
      proxy: {
        // 🔹 NewsAPI
        "/newsapi": {
          target: process.env.VITE_NEWSAPI_API_ENDPOINT,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/newsapi/, ""),
        },

        // 🔹 Guardian API
        "/guardian": {
          target: process.env.VITE_GUARDIAN_API_ENDPOINT,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/guardian/, ""),
        },

        // 🔹 New York Times API
        "/nyt": {
          target: process.env.VITE_NYTIMES_API_ENDPOINT,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/nyt/, ""),
        },
      },
    },
    preview: {
      host: true,
      port: 3000,
      open: true,
    },
  };

  return defineConfig(config);
};
