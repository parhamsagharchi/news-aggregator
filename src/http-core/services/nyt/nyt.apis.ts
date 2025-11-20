import { fetchData } from "@/http-core/api/api.request";
import { createAxiosClient } from "@/http-core/api/api.axios";
import { apiKeys, baseURLs } from "@/http-core/config";

import type { IGetNytPayload, IGetNytResponse } from "./nyt.types";

export async function getNytArticles(
  params: IGetNytPayload,
  signal?: AbortSignal
): Promise<IGetNytResponse> {
  return await fetchData<IGetNytResponse>(
    "",
    {
      params: {
        ...params,
        "api-key": apiKeys.nyt,
      },
      signal,
    },
    createAxiosClient(baseURLs.nytApi || "")
  );
}

