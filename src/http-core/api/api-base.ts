import type { AxiosInstance, AxiosRequestConfig } from "axios";

import { ENewsSource } from "@/store/store.enum";

import { guardianRequests, newsApiRequests, nytRequests } from "./requests";
import type { ApiOptions } from "./types";

export type ApiType = ENewsSource;

const getApiInstance = (apiType?: ApiType): AxiosInstance => {
  switch (apiType) {
    case ENewsSource.Guardian:
      return guardianRequests;
    case ENewsSource.Nyt:
      return nytRequests;
    case ENewsSource.NewsAPI:
    default:
      return newsApiRequests;
  }
};

export async function apiBase<T>(
  url: string,
  options?: AxiosRequestConfig,
  hasHeader?: boolean,
  apiType?: ApiType
): Promise<T> {
  const instance = getApiInstance(apiType);
  const response = await instance(url, options);
  if (hasHeader) return response as T;
  return response?.data as T;
}

export async function readData<T>(
  url: string,
  apiOptions?: ApiOptions,
  apiType?: ApiType
): Promise<T> {
  const options: AxiosRequestConfig = {
    ...apiOptions,
    method: "GET",
    params: apiOptions?.params,
  };
  return await apiBase<T>(url, options, false, apiType);
}
