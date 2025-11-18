/**
 * Base URLs for API requests
 * Using Vite proxy paths to avoid CORS issues
 */
export const baseURLs = {
  newsApi: "/newsapi",
  guardianApi: "/guardian",
  nytApi: "/nyt",
};

export const apiKeys = {
  newsApi: import.meta.env.VITE_NEWSAPI_API_KEY,
  guardian: import.meta.env.VITE_GUARDIAN_API_KEY,
  nyt: import.meta.env.VITE_NYTIMES_API_KEY,
};

export const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
};
