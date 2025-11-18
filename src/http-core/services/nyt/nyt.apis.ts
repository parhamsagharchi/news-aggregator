import { readData } from "@/http-core/api/api-base";
import { apiKeys } from "@/http-core/config";
import { ENewsSource } from "@/store/store.enum";

import type { IGetNytPayload, IGetNytResponse } from "./nyt.types";

export async function getNytArticles(
  params: IGetNytPayload
): Promise<IGetNytResponse> {
  return await readData<IGetNytResponse>(
    "",
    {
      params: {
        ...params,
        "api-key": apiKeys.nyt,
      },
    },
    ENewsSource.Nyt
  );
}

