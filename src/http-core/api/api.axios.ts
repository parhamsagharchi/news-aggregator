import axios, { type AxiosInstance } from "axios";

import { baseURLs, headers } from "@/http-core/config";

import { errorHandlers, handleNetworkError } from "./api.error";

/**
 * Creates a configured Axios instance with interceptors for error handling
 * @param baseURL - The base URL for the API
 * @returns Configured Axios instance
 */
const createAxiosClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers,
  });

  // Request interceptor (can be extended for auth tokens, etc.)
  client.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Don't show error toast for canceled requests (AbortError)
      // Check multiple ways axios might indicate a canceled request
      const isCanceled =
        error.code === "ERR_CANCELED" ||
        error.name === "CanceledError" ||
        error.name === "AbortError" ||
        (error.message && error.message.toLowerCase().includes("canceled"));

      if (isCanceled) {
        // Silently reject canceled requests without showing error toast
        return Promise.reject(error);
      }

      try {
        if (error?.response) {
          const statusCode = error.response.status;
          const errorData = error.response.data;

          const handler = errorHandlers[statusCode];
          if (handler) {
            handler(errorData);
          }
        } else {
          handleNetworkError();
        }
      } catch (handlingError) {
        console.error("Error during error handling:", handlingError);
      }
      return Promise.reject(error);
    }
  );

  return client;
};

/**
 * Axios instance for NewsAPI
 */
export const newsApiClient = createAxiosClient(baseURLs.newsApi || "");

/**
 * Axios instance for The Guardian API
 */
export const guardianClient = createAxiosClient(baseURLs.guardianApi || "");

/**
 * Axios instance for New York Times API
 */
export const nytClient = createAxiosClient(baseURLs.nytApi || "");

