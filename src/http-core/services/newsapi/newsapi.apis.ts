import { readData } from "@/http-core/api/api-base";
import { apiKeys } from "@/http-core/config";
import { ENewsSource } from "@/store/store.enum";

import type {
  IGetNewsApiPayload,
  IGetNewsApiResponse,
} from "./newsapi.types";

export async function getNewsApiArticles(
  params: IGetNewsApiPayload
): Promise<IGetNewsApiResponse> {
  return await readData<IGetNewsApiResponse>(
    "",
    {
      params: {
        ...params,
        apiKey: apiKeys.newsApi,
      },
    },
    ENewsSource.NewsAPI
  );
}

