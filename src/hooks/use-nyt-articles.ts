import { useMemo } from "react";
import { useGetNytArticles } from "@/http-core/services/nyt";
import type { IGetNytResponse } from "@/http-core/services/nyt/nyt.types";
import { normalizeNytArticle } from "@/utils/article-normalizer";
import type { IArticle } from "@/types/article.types";

interface UseNytArticlesParams {
  keyword: string;
  category: string[];
  startDate?: string;
  endDate?: string;
  enabled: boolean;
}

interface UseNytArticlesResult {
  articles: IArticle[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  error: Error | null;
  isFetching: boolean;
}

/**
 * Extract and normalize articles from NYT pages
 */
const extractNytArticles = (
  data: { pages: IGetNytResponse[] } | undefined
): IArticle[] => {
  if (!data?.pages) return [];
  return data.pages.flatMap(
    (page) => page.response?.docs?.map(normalizeNytArticle) ?? []
  );
};

export const useNytArticles = ({
  keyword,
  category,
  startDate,
  endDate,
  enabled,
}: UseNytArticlesParams): UseNytArticlesResult => {
  // Build NYT fq query for multiple categories using OR syntax
  const nytFqQuery = useMemo(() => {
    if (category.length === 0) return undefined;
    if (category.length === 1) {
      return `news_desk:("${category[0]}")`;
    }
    const categories = category.map((cat) => `"${cat}"`).join(" OR ");
    return `news_desk:(${categories})`;
  }, [category]);

  const nytQuery = useGetNytArticles(
    {
      q: keyword || undefined,
      fq: nytFqQuery,
      begin_date: startDate ? startDate.replace(/-/g, "") : undefined,
      end_date: endDate ? endDate.replace(/-/g, "") : undefined,
    },
    {
      enabled,
    }
  );

  const articles = useMemo(() => {
    if (!enabled) return [];
    return extractNytArticles(
      nytQuery.data as { pages: IGetNytResponse[] } | undefined
    );
  }, [nytQuery.data, enabled]);

  return {
    articles,
    isLoading: nytQuery.isLoading,
    isFetchingNextPage: nytQuery.isFetchingNextPage,
    hasNextPage: !!nytQuery.hasNextPage,
    fetchNextPage: () => nytQuery.fetchNextPage(),
    error: nytQuery.error,
    isFetching: nytQuery.isFetching,
  };
};
