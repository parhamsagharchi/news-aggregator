import { useMemo } from "react";
import { useGetNewsApiArticles } from "@/http-core/services/newsapi";
import type { IGetNewsApiResponse } from "@/http-core/services/newsapi/newsapi.types";
import { normalizeNewsApiArticle } from "@/utils/article-normalizer";
import type { IArticle } from "@/types/article.types";

interface UseNewsApiArticlesParams {
  keyword: string;
  pageSize: number;
  startDate?: string;
  endDate?: string;
  enabled: boolean;
}

interface UseNewsApiArticlesResult {
  articles: IArticle[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  error: Error | null;
  isFetching: boolean;
}

/**
 * Extract and normalize articles from NewsAPI pages
 */
const extractNewsApiArticles = (
  data: { pages: IGetNewsApiResponse[] } | undefined
): IArticle[] => {
  if (!data?.pages) return [];
  return data.pages.flatMap(
    (page) => page.articles?.map(normalizeNewsApiArticle) ?? []
  );
};

export const useNewsApiArticles = ({
  keyword,
  pageSize,
  startDate,
  endDate,
  enabled,
}: UseNewsApiArticlesParams): UseNewsApiArticlesResult => {
  const newsApiQueryValue = useMemo(() => keyword.trim() || "news", [keyword]);

  const newsApiQuery = useGetNewsApiArticles(
    {
      q: newsApiQueryValue,
      pageSize,
      from: startDate || undefined,
      to: endDate || undefined,
    },
    {
      enabled: enabled && newsApiQueryValue.length > 0,
    }
  );

  const articles = useMemo(() => {
    if (!enabled) return [];
    return extractNewsApiArticles(
      newsApiQuery.data as { pages: IGetNewsApiResponse[] } | undefined
    );
  }, [newsApiQuery.data, enabled]);

  return {
    articles,
    isLoading: newsApiQuery.isLoading,
    isFetchingNextPage: newsApiQuery.isFetchingNextPage,
    hasNextPage: !!newsApiQuery.hasNextPage,
    fetchNextPage: () => newsApiQuery.fetchNextPage(),
    error: newsApiQuery.error,
    isFetching: newsApiQuery.isFetching,
  };
};
