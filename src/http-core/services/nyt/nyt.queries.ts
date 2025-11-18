import { useQuery } from "@tanstack/react-query";
import { getNytArticles } from "./nyt.apis";
import type { IGetNytPayload } from "./nyt.types";
import { NYT_QUERY_KEYS } from "./nyt.keys";

export const useGetNytArticles = (params: IGetNytPayload) => {
  return useQuery({
    queryKey: NYT_QUERY_KEYS.list(params),
    queryFn: () => getNytArticles(params),
  });
};

