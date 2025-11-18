import { useMemo } from "react";
import { useGetNewsApiArticles } from "@/http-core/services/newsapi";
import { useGetGuardianArticle } from "@/http-core/services/guardian";
import { useGetNytArticles } from "@/http-core/services/nyt";
import {
  normalizeNewsApiArticle,
  normalizeGuardianArticle,
  normalizeNytArticle,
} from "@/utils/article-normalizer";
import type { IArticle } from "@/types/article.types";

interface UseNewsArticlesParams {
  query: string;
  pageSize?: number;
}

interface UseNewsArticlesResult {
  articles: IArticle[];
  isLoading: boolean;
  errors: Array<{ source: string; message: string }>;
}

/**
 * Custom hook to fetch and normalize articles from all news sources
 * Follows DRY principle by centralizing the fetching logic
 */
export const useNewsArticles = ({
  query,
  pageSize = 10,
}: UseNewsArticlesParams): UseNewsArticlesResult => {
  // Fetch from all sources
  const newsApiQuery = useGetNewsApiArticles({
    q: query,
    pageSize,
    page: 1,
  });

  const guardianQuery = useGetGuardianArticle({
    q: query,
    pageSize,
    page: 1,
  });

  const nytQuery = useGetNytArticles({
    q: query,
    page: 0,
  });

  // Normalize and combine articles
  const articles = useMemo(() => {
    const normalized: IArticle[] = [];

    if (newsApiQuery.data?.articles) {
      normalized.push(
        ...newsApiQuery.data.articles.map(normalizeNewsApiArticle)
      );
    }

    if (guardianQuery.data?.response?.results) {
      normalized.push(
        ...guardianQuery.data.response.results.map(normalizeGuardianArticle)
      );
    }

    if (nytQuery.data?.response?.docs) {
      normalized.push(...nytQuery.data.response.docs.map(normalizeNytArticle));
    }

    return normalized;
  }, [newsApiQuery.data, guardianQuery.data, nytQuery.data]);

  // Collect errors
  const errors = useMemo(() => {
    const errorList: Array<{ source: string; message: string }> = [];
    if (newsApiQuery.error) {
      errorList.push({ source: "NewsAPI", message: "Failed to load articles" });
    }
    if (guardianQuery.error) {
      errorList.push({ source: "Guardian", message: "Failed to load articles" });
    }
    if (nytQuery.error) {
      errorList.push({ source: "NYT", message: "Failed to load articles" });
    }
    return errorList;
  }, [newsApiQuery.error, guardianQuery.error, nytQuery.error]);

  const isLoading =
    newsApiQuery.isLoading ||
    guardianQuery.isLoading ||
    nytQuery.isLoading;

  return {
    articles,
    isLoading,
    errors,
  };
};

