import { fetchData } from "@/http-core/api/api.request";
import { createAxiosClient } from "@/http-core/api/api.axios";
import { apiKeys, baseURLs } from "@/http-core/config";

import type {
  IGetNewsApiPayload,
  IGetNewsApiResponse,
} from "./newsapi.types";

export async function getNewsApiArticles(
  params: IGetNewsApiPayload,
  signal?: AbortSignal
): Promise<IGetNewsApiResponse> {
  return await fetchData<IGetNewsApiResponse>(
    "",
    {
      params: {
        ...params,
        apiKey: apiKeys.newsApi,
      },
      signal,
    },
    createAxiosClient(baseURLs.newsApi || "")
  );
}

