import type { AxiosInstance, AxiosRequestConfig } from "axios";

import { ENewsSource } from "@/store/store.enum";

import { guardianClient, newsApiClient, nytClient } from "./api.axios";
import type { ApiRequestOptions } from "./api.types";

/**
 * Type representing available news sources
 */
export type NewsSourceType = ENewsSource;

/**
 * Gets the appropriate Axios instance based on the news source
 * @param source - The news source type
 * @returns Axios instance for the specified source
 */
const getHttpClient = (source?: NewsSourceType): AxiosInstance => {
  switch (source) {
    case ENewsSource.Guardian:
      return guardianClient;
    case ENewsSource.Nyt:
      return nytClient;
    case ENewsSource.NewsAPI:
    default:
      return newsApiClient;
  }
};

/**
 * Makes an HTTP request using the appropriate client
 * @param url - The endpoint URL
 * @param options - Axios request configuration
 * @param returnFullResponse - Whether to return the full response object or just data
 * @param source - The news source to use for the request
 * @returns Promise resolving to the response data or full response
 */
export async function makeHttpRequest<T>(
  url: string,
  options?: AxiosRequestConfig,
  returnFullResponse = false,
  source?: NewsSourceType
): Promise<T> {
  const client = getHttpClient(source);
  const response = await client(url, options);

  if (returnFullResponse) {
    return response as T;
  }

  return response.data as T;
}

/**
 * Makes a GET request to fetch data
 * @param url - The endpoint URL
 * @param options - API request options (headers, params, signal, etc.)
 * @param source - The news source to use for the request
 * @returns Promise resolving to the response data
 */
export async function fetchData<T>(
  url: string,
  options?: ApiRequestOptions,
  source?: NewsSourceType
): Promise<T> {
  const requestConfig: AxiosRequestConfig = {
    method: "GET",
    params: options?.params,
    headers: options?.headers,
    baseURL: options?.baseURL,
    signal: options?.signal, // Add AbortSignal for request cancellation
  };

  return await makeHttpRequest<T>(url, requestConfig, false, source);
}
