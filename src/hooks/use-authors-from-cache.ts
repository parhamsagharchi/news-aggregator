import { useMemo, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { IGetNewsApiResponse } from "@/http-core/services/newsapi/newsapi.types";
import type { IGetGuardianResponse } from "@/http-core/services/guardian/guardian.types";
import type { IGetNytResponse } from "@/http-core/services/nyt/nyt.types";
import {
  normalizeNewsApiArticle,
  normalizeGuardianArticle,
  normalizeNytArticle,
} from "@/utils/article-normalizer";
import type { IArticle } from "@/types/article.types";

/**
 * Extract articles from NewsAPI cache
 */
const extractNewsApiArticlesFromCache = (
  data: { pages: IGetNewsApiResponse[] } | undefined
): IArticle[] => {
  if (!data?.pages) return [];
  return data.pages.flatMap(
    (page) => page.articles?.map(normalizeNewsApiArticle) ?? []
  );
};

/**
 * Extract articles from Guardian cache
 */
const extractGuardianArticlesFromCache = (
  data: { pages: IGetGuardianResponse[] } | undefined
): IArticle[] => {
  if (!data?.pages) return [];
  return data.pages.flatMap(
    (page) => page.response?.results?.map(normalizeGuardianArticle) ?? []
  );
};

/**
 * Extract articles from NYT cache
 */
const extractNytArticlesFromCache = (
  data: { pages: IGetNytResponse[] } | undefined
): IArticle[] => {
  if (!data?.pages) return [];
  return data.pages.flatMap(
    (page) => page.response?.docs?.map(normalizeNytArticle) ?? []
  );
};

/**
 * Hook to extract unique authors from React Query cache
 * Returns authors in dropdown format: { value: string, label: string }[]
 */
export const useAuthorsFromCache = () => {
  const queryClient = useQueryClient();
  const [cacheVersion, setCacheVersion] = useState(0);

  // Subscribe to cache changes
  useEffect(() => {
    const queryCache = queryClient.getQueryCache();
    
    const unsubscribe = queryCache.subscribe(() => {
      // Update version when cache changes to trigger recalculation
      setCacheVersion((prev) => prev + 1);
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient]);

  const authors = useMemo(() => {
    const allArticles: IArticle[] = [];
    const queryCache = queryClient.getQueryCache();

    // Get all queries from cache
    const queries = queryCache.getAll();

    // Extract articles from all cached queries
    queries.forEach((query) => {
      const queryData = query.state.data;
      const queryKey = query.queryKey;

      // Check if it's a NewsAPI query
      if (Array.isArray(queryKey) && queryKey[0] === "NewsAPI") {
        const data = queryData as { pages: IGetNewsApiResponse[] } | undefined;
        allArticles.push(...extractNewsApiArticlesFromCache(data));
      }

      // Check if it's a Guardian query
      if (Array.isArray(queryKey) && queryKey[0] === "Guardian") {
        const data = queryData as { pages: IGetGuardianResponse[] } | undefined;
        allArticles.push(...extractGuardianArticlesFromCache(data));
      }

      // Check if it's a NYT query
      if (Array.isArray(queryKey) && queryKey[0] === "NYT") {
        const data = queryData as { pages: IGetNytResponse[] } | undefined;
        allArticles.push(...extractNytArticlesFromCache(data));
      }
    });

    // Extract unique authors
    const uniqueAuthors = new Set<string>();
    allArticles.forEach((article) => {
      if (article.author && article.author.trim()) {
        uniqueAuthors.add(article.author.trim());
      }
    });

    // Convert to dropdown format and sort alphabetically
    const authorsList = Array.from(uniqueAuthors)
      .sort((a, b) => a.localeCompare(b))
      .map((author) => ({
        value: author,
        label: author,
      }));

    return authorsList;
  }, [queryClient, cacheVersion]);

  return authors;
};

