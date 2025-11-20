import { useMemo } from "react";
import { useGetNewsApiArticles } from "@/http-core/services/newsapi";
import { useGetGuardianArticle } from "@/http-core/services/guardian";
import { useGetNytArticles } from "@/http-core/services/nyt";
import type { IGetNewsApiResponse } from "@/http-core/services/newsapi/newsapi.types";
import type { IGetGuardianResponse } from "@/http-core/services/guardian/guardian.types";
import type { IGetNytResponse } from "@/http-core/services/nyt/nyt.types";
import {
  normalizeNewsApiArticle,
  normalizeGuardianArticle,
  normalizeNytArticle,
} from "@/utils/article-normalizer";
import { filterArticles } from "@/utils/article-filter";
import { shouldFetchSource } from "@/utils/filter";
import type { IArticle } from "@/types/article.types";
import { ENewsSource } from "@/store/store.enum";
import { useAdvanceFilterStore } from "@/store/store.hooks";

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

  const nytFqQuery = useMemo(() => {
    if (category.length === 0) return undefined;
    if (category.length === 1) {
      return `news_desk:("${category[0]}")`;
    }
    const categories = category.map((cat) => `"${cat}"`).join(" OR ");
    return `news_desk:(${categories})`;
  }, [category]);

  const guardianSection = useMemo(() => {
    if (category.length === 0) return undefined;
    return category.join("|");
  }, [category]);

  const shouldFetchFlags = useMemo(
    () => ({
      newsAPI: shouldFetchSource(sources, ENewsSource.NewsAPI),
      guardian: shouldFetchSource(sources, ENewsSource.Guardian),
      nyt: shouldFetchSource(sources, ENewsSource.Nyt),
    }),
    [sources]
  );

  const newsApiQueryValue = useMemo(() => keyword.trim() || "news", [keyword]);

  const newsApiQuery = useGetNewsApiArticles(
    {
      q: newsApiQueryValue,
      pageSize,
      from: startDate || undefined,
      to: endDate || undefined,
    },
    {
      enabled: shouldFetchFlags.newsAPI && newsApiQueryValue.length > 0,
    }
  );

  const guardianQuery = useGetGuardianArticle(
    {
      q: keyword || undefined,
      pageSize,
      section: guardianSection,
      fromDate: startDate || undefined,
      toDate: endDate || undefined,
    },
    {
      enabled: shouldFetchFlags.guardian,
    }
  );

  const nytQuery = useGetNytArticles(
    {
      q: keyword || undefined,
      fq: nytFqQuery,
      begin_date: startDate ? startDate.replace(/-/g, "") : undefined,
      end_date: endDate ? endDate.replace(/-/g, "") : undefined,
    },
    {
      enabled: shouldFetchFlags.nyt,
    }
  );

  const articles = useMemo(() => {
    const allArticles: IArticle[] = [];

    if (shouldFetchFlags.newsAPI) {
      allArticles.push(
        ...extractNewsApiArticles(
          newsApiQuery.data as { pages: IGetNewsApiResponse[] } | undefined
        )
      );
    }

    if (shouldFetchFlags.guardian) {
      allArticles.push(
        ...extractGuardianArticles(
          guardianQuery.data as { pages: IGetGuardianResponse[] } | undefined
        )
      );
    }

    if (shouldFetchFlags.nyt) {
      allArticles.push(
        ...extractNytArticles(
          nytQuery.data as { pages: IGetNytResponse[] } | undefined
        )
      );
    }

    return filterArticles(allArticles, keyword, startDate, endDate, author);
  }, [
    newsApiQuery.data,
    guardianQuery.data,
    nytQuery.data,
    keyword,
    startDate,
    endDate,
    author,
    shouldFetchFlags,
  ]);

  const sourceCounts = useMemo(() => countBySource(articles), [articles]);

  const isLoading =
    newsApiQuery.isLoading || guardianQuery.isLoading || nytQuery.isLoading;

  const isFetchingNextPage =
    newsApiQuery.isFetchingNextPage ||
    guardianQuery.isFetchingNextPage ||
    nytQuery.isFetchingNextPage;

  const hasNextPage =
    (newsApiQuery.hasNextPage && shouldFetchFlags.newsAPI) ||
    (guardianQuery.hasNextPage && shouldFetchFlags.guardian) ||
    (nytQuery.hasNextPage && shouldFetchFlags.nyt);

  const isRefetching =
    (newsApiQuery.isFetching &&
      !newsApiQuery.isLoading &&
      shouldFetchFlags.newsAPI) ||
    (guardianQuery.isFetching &&
      !guardianQuery.isLoading &&
      shouldFetchFlags.guardian) ||
    (nytQuery.isFetching && !nytQuery.isLoading && shouldFetchFlags.nyt);

  const errors = useMemo(() => {
    const errorList: Array<{ source: string; message: string }> = [];
    if (newsApiQuery.error)
      errorList.push({ source: "NewsAPI", message: "Failed to load articles" });
    if (guardianQuery.error)
      errorList.push({
        source: "Guardian",
        message: "Failed to load articles",
      });
    if (nytQuery.error)
      errorList.push({ source: "NYT", message: "Failed to load articles" });
    return errorList;
  }, [newsApiQuery.error, guardianQuery.error, nytQuery.error]);

  const fetchNextPage = () => {
    if (shouldFetchFlags.newsAPI && newsApiQuery.hasNextPage)
      newsApiQuery.fetchNextPage();
    if (shouldFetchFlags.guardian && guardianQuery.hasNextPage)
      guardianQuery.fetchNextPage();
    if (shouldFetchFlags.nyt && nytQuery.hasNextPage) nytQuery.fetchNextPage();
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
