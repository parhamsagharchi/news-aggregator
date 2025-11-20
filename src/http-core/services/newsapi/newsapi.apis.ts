import { fetchData } from "@/http-core/api/api.request";
import { apiKeys } from "@/http-core/config";
import { ENewsSource } from "@/store/store.enum";

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
    ENewsSource.NewsAPI
  );
}

