import { useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { getGuardianArticle } from "./guardian.apis";
import type {
  IGetGuardianPayload,
  IGetGuardianResponse,
} from "./guardian.types";
import { GUARDIAN_QUERY_KEYS } from "./guardian.keys";

export const useGetGuardianArticle = (
  params: Omit<IGetGuardianPayload, "page">,
  options?: Omit<
    UseInfiniteQueryOptions<IGetGuardianResponse, Error>,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
  >
) => {
  return useInfiniteQuery({
    queryKey: GUARDIAN_QUERY_KEYS.list(params),
    queryFn: ({ pageParam = 1, signal }) =>
      getGuardianArticle(
        { ...params, page: pageParam as number },
        signal
      ),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.response) {
        return undefined;
      }
      const currentPage = lastPage.response.currentPage || 0;
      const totalPages = lastPage.response.pages || 0;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: options?.enabled,
    ...options,
  });
};
