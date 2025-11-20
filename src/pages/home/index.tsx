import { useRef, useEffect } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import FilterBar from "@/components/filter-bar";
import { useNewsArticles } from "@/hooks/use-news-articles";
import { HomeHeader } from "./components/header/index.tsx";
import { HomeRefetchIndicator } from "./components/refetch-indicator/index.tsx";
import { HomeSkeleton } from "./home.skeleton";
import { HomeEmptyState } from "./components/empty-state/index.tsx";
import { HomeArticlesGrid } from "./components/articles-grid/index.tsx";
import { HomeInfiniteScrollTrigger } from "./components/infinite-scroll/home.infinite-scroll-trigger.tsx";
import { homePageSize } from "./home.constant.ts";

function Home() {
  const {
    articles,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  } = useNewsArticles({
    pageSize: homePageSize,
  });

  // for infinite scroll
  const isFetchingRef = useRef<boolean>(false);

  /**
   * Infinite Scroll Implementation
   *
   * Uses useIntersectionObserver hook to detect when user scrolls near bottom.
   * Automatically fetches next page when trigger element becomes visible.
   */
  const [loadMoreRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "200px",
  });

  useEffect(() => {
    // Only fetch if:
    // 1. Element is intersecting (visible)
    // 2. There is a next page
    // 3. Not currently fetching
    // 4. Not already triggered
    if (
      isIntersecting &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isFetchingRef.current
    ) {
      isFetchingRef.current = true;
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  /**
   * Prevents infinite loop by scrolling user up
   */
  useEffect(() => {
    if (!isFetchingNextPage && isFetchingRef?.current) {
      // Scroll up slightly to prevent infinite loop
      setTimeout(() => {
        window.scrollBy({
          top: -250, // intersection zone
          behavior: "smooth",
        });

        // Reset flag after scroll completes
        setTimeout(() => {
          isFetchingRef.current = false;
        }, 500);
      }, 300);
    }
  }, [isFetchingNextPage]);

  // Derived state for conditional rendering
  const hasArticles = articles && articles?.length > 0;

  // Show skeleton during initial loading
  const isInitialLoading = isLoading && !hasArticles;
  if (isInitialLoading) {
    return (
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <HomeHeader hasArticles={false} articleCount={0} />
        <FilterBar />
        <HomeSkeleton />
      </div>
    );
  }

  // Show empty state when no articles
  if (!hasArticles) {
    return (
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <HomeHeader hasArticles={false} articleCount={0} />
        <FilterBar />
        <HomeEmptyState />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      {/* Page Header */}
      <HomeHeader hasArticles={hasArticles} articleCount={articles.length} />

      {/* Filter Bar */}
      <FilterBar />

      {/* Loading indicator when refetching */}
      {isRefetching && <HomeRefetchIndicator />}

      {/* Articles Grid */}
      <HomeArticlesGrid articles={articles} />

      {/* Infinite Scroll Trigger */}
      {hasNextPage && (
        <HomeInfiniteScrollTrigger
          ref={loadMoreRef}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
}

export default Home;
