import type { IGetNytPayload } from "./nyt.types";

export const NYT_QUERY_KEYS = {
  list: (params: IGetNytPayload) => ["NYT", params] as const,
};

