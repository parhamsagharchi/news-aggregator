import { fetchData } from "@/http-core/api/api.request";
import { apiKeys } from "@/http-core/config";
import { ENewsSource } from "@/store/store.enum";

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
    ENewsSource.Nyt
  );
}

