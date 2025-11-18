import axios from "axios";

import { baseURLs, headers } from "@/http-core/config";

import { errorHandler, networkErrorStrategy } from "./http-error-strategies";

const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      try {
        if (error?.response) {
          const statusCode = error?.response?.status;
          const errorData = error?.response?.data;

          const handleError = errorHandler[statusCode];
          if (handleError) {
            handleError(errorData);
          }
        } else {
          networkErrorStrategy();
        }
      } catch (handlingError) {
        console.error("Error during error handling:", handlingError);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Create separate instances for each API
export const newsApiRequests = createAxiosInstance(baseURLs.newsApi || "");
export const guardianRequests = createAxiosInstance(baseURLs.guardianApi || "");
export const nytRequests = createAxiosInstance(baseURLs.nytApi || "");

// Default export for backward compatibility (using newsApi)
const requests = newsApiRequests;
export default requests;
