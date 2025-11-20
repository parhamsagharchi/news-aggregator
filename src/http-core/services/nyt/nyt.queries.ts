import {
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { getNytArticles } from "./nyt.apis";
import type { IGetNytPayload, IGetNytResponse } from "./nyt.types";
import { NYT_QUERY_KEYS } from "./nyt.keys";

export const useGetNytArticles = (
  params: Omit<IGetNytPayload, "page">,
  options?: Omit<
    UseInfiniteQueryOptions<IGetNytResponse, Error>,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
  >
) => {
  return useInfiniteQuery({
    queryKey: NYT_QUERY_KEYS.list(params),
    queryFn: ({ pageParam = 0, signal }) =>
      getNytArticles({ ...params, page: pageParam as number }, signal),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.response?.meta) {
        return undefined;
      }
      const totalHits = lastPage.response.meta.hits || 0;
      const currentOffset = lastPage.response.meta.offset || 0;
      const pageSize = 10; // NYT default page size
      const nextOffset = currentOffset + pageSize;
      return nextOffset < totalHits ? allPages.length : undefined;
    },
    initialPageParam: 0,
    enabled: options?.enabled,
    ...options,
  });
};
