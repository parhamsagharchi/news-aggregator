import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { newsApiClient } from "./api.axios";
import type { ApiRequestOptions } from "./api.types";

/**
 * Makes an HTTP request using the provided client
 * @param url - The endpoint URL
 * @param options - Axios request configuration
 * @param client - Axios instance to use for the request (defaults to newsApiClient)
 * @param returnFullResponse - Whether to return the full response object or just data
 * @returns Promise resolving to the response data or full response
 */
export async function makeHttpRequest<T>(
  url: string,
  options?: AxiosRequestConfig,
  client: AxiosInstance = newsApiClient,
  returnFullResponse = false
): Promise<T> {
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
 * @param client - Axios instance to use for the request (defaults to newsApiClient)
 * @returns Promise resolving to the response data
 */
export async function fetchData<T>(
  url: string,
  options?: ApiRequestOptions,
  client: AxiosInstance = newsApiClient
): Promise<T> {
  const requestConfig: AxiosRequestConfig = {
    method: "GET",
    params: options?.params,
    headers: options?.headers,
    baseURL: options?.baseURL,
    signal: options?.signal, // Add AbortSignal for request cancellation
  };

  return await makeHttpRequest<T>(url, requestConfig, client, false);
}
