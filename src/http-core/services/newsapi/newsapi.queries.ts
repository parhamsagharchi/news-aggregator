import {
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { getNewsApiArticles } from "./newsapi.apis";
import type { IGetNewsApiPayload, IGetNewsApiResponse } from "./newsapi.types";
import { NEWSAPI_QUERY_KEYS } from "./newsapi.keys";

export const useGetNewsApiArticles = (
  params: Omit<IGetNewsApiPayload, "page">,
  options?: Omit<
    UseInfiniteQueryOptions<IGetNewsApiResponse, Error>,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
  >
) => {
  return useInfiniteQuery({
    queryKey: NEWSAPI_QUERY_KEYS.list(params),
    queryFn: ({ pageParam = 1, signal }) =>
      getNewsApiArticles(
        { ...params, page: pageParam as number },
        signal
      ),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return undefined;
      }
      const totalPages = Math.ceil(
        (lastPage.totalResults || 0) / (params.pageSize || 20)
      );
      const nextPage = allPages.length + 1;
      return totalPages > 0 && nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: options?.enabled,
    ...options,
  });
};
