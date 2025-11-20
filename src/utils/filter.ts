import { ENewsSource } from "@/store/store.enum";

/**
 * Determine if a source should be fetched
 * @param sources - Selected sources array (empty means all sources)
 * @param source - Source to check
 * @returns True if source should be fetched
 */
export function shouldFetchSource(
  sources: ENewsSource[],
  source: ENewsSource
): boolean {
  return sources?.length === 0 || sources?.includes(source);
}
