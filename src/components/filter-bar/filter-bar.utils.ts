import type { IAdvanceFilter } from "@/store/store.types";

/**
 * Check if any filter is currently active
 * @param filterState - Current filter state
 * @returns true if any filter has a value, false otherwise
 */
export function hasActiveFilters(filterState: IAdvanceFilter): boolean {
  return (
    !!filterState.keyword ||
    !!filterState.startDate ||
    !!filterState.endDate ||
    filterState.category.length > 0 ||
    filterState.sources.length > 0 ||
    filterState.author.length > 0
  );
}

