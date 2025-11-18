import { useQuery } from "@tanstack/react-query";
import { getNewsApiArticles } from "./newsapi.apis";
import type { IGetNewsApiPayload } from "./newsapi.types";
import { NEWSAPI_QUERY_KEYS } from "./newsapi.keys";

export const useGetNewsApiArticles = (params: IGetNewsApiPayload) => {
  return useQuery({
    queryKey: NEWSAPI_QUERY_KEYS.list(params),
    queryFn: () => getNewsApiArticles(params),
  });
};

