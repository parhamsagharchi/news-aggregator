import type { IGetNewsApiPayload } from "./newsapi.types";

export const NEWSAPI_QUERY_KEYS = {
  list: (params: IGetNewsApiPayload) => ["NewsAPI", params] as const,
};

