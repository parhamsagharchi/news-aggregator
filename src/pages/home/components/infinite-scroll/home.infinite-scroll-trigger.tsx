import { forwardRef } from "react";

interface HomeInfiniteScrollTriggerProps {
  isFetchingNextPage: boolean;
}

/**
 * HomeInfiniteScrollTrigger Component
 *
 * Displays a loading indicator when fetching next page
 * and serves as the intersection observer trigger element
 */
export const HomeInfiniteScrollTrigger = forwardRef<
  HTMLDivElement,
  HomeInfiniteScrollTriggerProps
>(({ isFetchingNextPage }, ref) => {
  return (
    <div ref={ref} className="col-span-12 py-8">
      {isFetchingNextPage ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative">
            <svg
              className="w-8 h-8 text-primary animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Loading more articles...
          </p>
        </div>
      ) : (
        <div className="h-20" />
      )}
    </div>
  );
});

HomeInfiniteScrollTrigger.displayName = "HomeInfiniteScrollTrigger";

