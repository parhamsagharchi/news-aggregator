import { useMemo } from "react";
import { filterArticles } from "@/utils/article-filter";
import { shouldFetchSource } from "@/utils/filter";
import type { IArticle } from "@/types/article.types";
import { ENewsSource } from "@/store/store.enum";
import { useAdvanceFilterStore } from "@/store/store.hooks";
import { useNewsApiArticles } from "./use-news-api-articles";
import { useGuardianArticles } from "./use-guardian-articles";
import { useNytArticles } from "./use-nyt-articles";

interface UseNewsArticlesParams {
  pageSize?: number;
}

interface UseNewsArticlesResult {
  articles: IArticle[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  errors: Array<{ source: string; message: string }>;
  isRefetching: boolean;
  newsAPICount: number;
  guardianCount: number;
  nytCount: number;
}

/**
 * Count articles by source
 */
const countBySource = (articles: IArticle[]) => {
  return {
    newsAPICount: articles.filter((a) => a.source === ENewsSource.NewsAPI)
      .length,
    guardianCount: articles.filter((a) => a.source === ENewsSource.Guardian)
      .length,
    nytCount: articles.filter((a) => a.source === ENewsSource.Nyt).length,
  };
};

export const useNewsArticles = ({
  pageSize = 10,
}: UseNewsArticlesParams = {}): UseNewsArticlesResult => {
  const { filterState } = useAdvanceFilterStore();
  const { keyword, category, sources, author, startDate, endDate } =
    filterState;

  const shouldFetchFlags = useMemo(
    () => ({
      newsAPI: shouldFetchSource(sources, ENewsSource.NewsAPI),
      guardian: shouldFetchSource(sources, ENewsSource.Guardian),
      nyt: shouldFetchSource(sources, ENewsSource.Nyt),
    }),
    [sources]
  );

  // Use individual hooks for each API
  const newsApiResult = useNewsApiArticles({
    keyword,
    pageSize,
    startDate,
    endDate,
    enabled: shouldFetchFlags.newsAPI,
  });

  const guardianResult = useGuardianArticles({
    keyword,
    category,
    pageSize,
    startDate,
    endDate,
    enabled: shouldFetchFlags.guardian,
  });

  const nytResult = useNytArticles({
    keyword,
    category,
    startDate,
    endDate,
    enabled: shouldFetchFlags.nyt,
  });

  // Combine all articles and apply filters
  const articles = useMemo(() => {
    const allArticles: IArticle[] = [
      ...newsApiResult.articles,
      ...guardianResult.articles,
      ...nytResult.articles,
    ];

    return filterArticles(allArticles, keyword, startDate, endDate, author);
  }, [
    newsApiResult.articles,
    guardianResult.articles,
    nytResult.articles,
    keyword,
    startDate,
    endDate,
    author,
  ]);

  const sourceCounts = useMemo(() => countBySource(articles), [articles]);

  const isLoading =
    newsApiResult.isLoading || guardianResult.isLoading || nytResult.isLoading;

  const isFetchingNextPage =
    newsApiResult.isFetchingNextPage ||
    guardianResult.isFetchingNextPage ||
    nytResult.isFetchingNextPage;

  const hasNextPage =
    (newsApiResult.hasNextPage && shouldFetchFlags.newsAPI) ||
    (guardianResult.hasNextPage && shouldFetchFlags.guardian) ||
    (nytResult.hasNextPage && shouldFetchFlags.nyt);

  const isRefetching =
    (newsApiResult.isFetching &&
      !newsApiResult.isLoading &&
      shouldFetchFlags.newsAPI) ||
    (guardianResult.isFetching &&
      !guardianResult.isLoading &&
      shouldFetchFlags.guardian) ||
    (nytResult.isFetching && !nytResult.isLoading && shouldFetchFlags.nyt);

  const errors = useMemo(() => {
    const errorList: Array<{ source: string; message: string }> = [];
    if (newsApiResult.error)
      errorList.push({ source: "NewsAPI", message: "Failed to load articles" });
    if (guardianResult.error)
      errorList.push({
        source: "Guardian",
        message: "Failed to load articles",
      });
    if (nytResult.error)
      errorList.push({ source: "NYT", message: "Failed to load articles" });
    return errorList;
  }, [newsApiResult.error, guardianResult.error, nytResult.error]);

  const fetchNextPage = () => {
    if (shouldFetchFlags.newsAPI && newsApiResult.hasNextPage)
      newsApiResult.fetchNextPage();
    if (shouldFetchFlags.guardian && guardianResult.hasNextPage)
      guardianResult.fetchNextPage();
    if (shouldFetchFlags.nyt && nytResult.hasNextPage)
      nytResult.fetchNextPage();
  };

  return {
    articles,
    isLoading,
    isFetchingNextPage,
    hasNextPage: !!hasNextPage,
    fetchNextPage,
    errors,
    isRefetching: !!isRefetching,
    ...sourceCounts,
  };
};
