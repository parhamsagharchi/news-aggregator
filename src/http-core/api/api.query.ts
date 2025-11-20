import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

/**
 * Check if error is from a canceled request
 */
const isCanceledError = (error: unknown): boolean => {
  if (!error || typeof error !== "object") return false;

  const err = error as Record<string, unknown>;
  return (
    err.code === "ERR_CANCELED" ||
    err.name === "CanceledError" ||
    err.name === "AbortError" ||
    (typeof err.message === "string" &&
      err.message.toLowerCase().includes("canceled"))
  );
};

/**
 * React Query client configuration
 * - Disables automatic retries
 * - Disables refetch on window focus
 * - Sets garbage collection time to 24 hours
 * - Silently handles canceled requests without showing errors
 */
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      // Don't log or show errors for canceled requests
      if (!isCanceledError(error)) {
        console.error("Query error:", error);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      // Don't log or show errors for canceled requests
      if (!isCanceledError(error)) {
        console.error("Mutation error:", error);
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      throwOnError: false,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});
