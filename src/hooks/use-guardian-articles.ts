import { useMemo } from "react";
import { useGetGuardianArticle } from "@/http-core/services/guardian";
import type { IGetGuardianResponse } from "@/http-core/services/guardian/guardian.types";
import { normalizeGuardianArticle } from "@/utils/article-normalizer";
import type { IArticle } from "@/types/article.types";

interface UseGuardianArticlesParams {
  keyword: string;
  category: string[];
  pageSize: number;
  startDate?: string;
  endDate?: string;
  enabled: boolean;
}

interface UseGuardianArticlesResult {
  articles: IArticle[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  error: Error | null;
  isFetching: boolean;
}

/**
 * Extract and normalize articles from Guardian pages
 */
const extractGuardianArticles = (
  data: { pages: IGetGuardianResponse[] } | undefined
): IArticle[] => {
  if (!data?.pages) return [];
  return data.pages.flatMap(
    (page) => page.response?.results?.map(normalizeGuardianArticle) ?? []
  );
};

export const useGuardianArticles = ({
  keyword,
  category,
  pageSize,
  startDate,
  endDate,
  enabled,
}: UseGuardianArticlesParams): UseGuardianArticlesResult => {
  // Build Guardian section parameter (pipe-separated for multiple sections)
  const guardianSection = useMemo(() => {
    if (category.length === 0) return undefined;
    return category.join("|");
  }, [category]);

  const guardianQuery = useGetGuardianArticle(
    {
      q: keyword || undefined,
      pageSize,
      section: guardianSection,
      fromDate: startDate || undefined,
      toDate: endDate || undefined,
    },
    {
      enabled,
    }
  );

  const articles = useMemo(() => {
    if (!enabled) return [];
    return extractGuardianArticles(
      guardianQuery.data as { pages: IGetGuardianResponse[] } | undefined
    );
  }, [guardianQuery.data, enabled]);

  return {
    articles,
    isLoading: guardianQuery.isLoading,
    isFetchingNextPage: guardianQuery.isFetchingNextPage,
    hasNextPage: !!guardianQuery.hasNextPage,
    fetchNextPage: () => guardianQuery.fetchNextPage(),
    error: guardianQuery.error,
    isFetching: guardianQuery.isFetching,
  };
};
