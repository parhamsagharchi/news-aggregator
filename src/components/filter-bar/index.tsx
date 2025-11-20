import { useCallback, useState } from "react";
import { Search, Calendar, Filter, Newspaper, X, User } from "lucide-react";
import { Input, MultiSelect, Label } from "@/components/ui";
import Litepicker from "@/components/litepicker";
import { ENewsSource } from "@/store/store.enum";
import {
  NEWS_CATEGORIES,
  SOURCE_OPTIONS,
  POPULAR_AUTHORS,
} from "@/constants/dropdown-options.constant";
import { parseDateRange, formatDateRange } from "@/utils/date-range";
import { useDebounceCallback } from "usehooks-ts";
import { useAdvanceFilterStore } from "@/store/store.hooks";
import type {
  IInputChangeEvent,
  IMultiSelectChangeEvent,
  IDateRangeChangeEvent,
} from "./filter-bar.types";

function FilterBar() {
  const {
    filterState,
    setKeyword,
    setCategories,
    setSources,
    setAuthors,
    setStartDate,
    setEndDate,
  } = useAdvanceFilterStore();

  // Local state for immediate UI update
  const [localKeyword, setLocalKeyword] = useState(filterState.keyword);

  // Debounced callback to update store (triggers API call)
  const debouncedSetKeyword = useDebounceCallback((value: string) => {
    setKeyword(value);
  }, 500);

  // Handle search input change
  const handleSearchChange = useCallback(
    (e: IInputChangeEvent) => {
      const value = e.target.value;
      // Update local state immediately for responsive UI
      setLocalKeyword(value);
      // Debounce the store update (triggers API call)
      debouncedSetKeyword(value);
    },
    [debouncedSetKeyword]
  );

  const dateRangeValue = formatDateRange(
    filterState.startDate,
    filterState.endDate
  );

  const handleDateRangeChange = (e: IDateRangeChangeEvent) => {
    const { startDate, endDate } = parseDateRange(e.target.value);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleFieldChange =
    (actionType: "SET_SOURCES" | "SET_CATEGORIES" | "SET_AUTHORS") =>
    (e: IMultiSelectChangeEvent) => {
      const payload =
        actionType === "SET_SOURCES"
          ? (e.target.value as ENewsSource[])
          : e.target.value;

      if (actionType === "SET_SOURCES") {
        setSources(payload as ENewsSource[]);
      } else if (actionType === "SET_CATEGORIES") {
        setCategories(payload as string[]);
      } else if (actionType === "SET_AUTHORS") {
        setAuthors(payload as string[]);
      }
    };

  // Handle clear search
  const handleClearSearch = () => {
    setLocalKeyword("");
    setKeyword("");
  };

  return (
    <div className="col-span-12">
      <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-5 md:p-6 box box--stacked">
        {/* Filter Description */}
        <div className="flex flex-col gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-slate-200/80">
          <h3 className="text-base sm:text-lg font-semibold text-slate-800">
            Filters
          </h3>
          <p className="text-xs sm:text-sm text-slate-500/80 leading-relaxed">
            Use the filters below to refine your news search. You can search by
            keywords, filter by date range, category, or news source. All
            filters work together to help you find the most relevant articles.
          </p>
        </div>

        {/* First Row: Search and Date Range */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Search Input - Takes 2 columns */}
          <div className="sm:col-span-2 flex flex-col">
            <Label className="mb-2 text-sm font-medium text-slate-700">
              Search
            </Label>
            <div className="relative flex items-center w-full">
              <Search className="absolute left-3 z-10 w-4 h-4 stroke-[1.3] text-slate-500 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={localKeyword}
                onChange={handleSearchChange}
                className="pl-10 pr-10 py-2.5 w-full rounded-[0.5rem] h-10"
              />
              {localKeyword && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 z-10 p-1 rounded-full hover:bg-slate-100 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                </button>
              )}
            </div>
          </div>

          {/* Date Range Picker - Takes 1 column */}
          <div className="flex flex-col">
            <Label className="mb-2 text-sm font-medium text-slate-700">
              Date Range
            </Label>
            <div className="relative flex items-center w-full">
              <Calendar className="absolute left-3 z-10 w-4 h-4 stroke-[1.3] text-slate-500 pointer-events-none" />
              <Litepicker
                value={dateRangeValue}
                onChange={handleDateRangeChange}
                placeholder="Select date range"
                options={{
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                className="pl-10 pr-10 py-2.5 w-full rounded-[0.3rem] h-10 [&::after]:hidden [&::before]:hidden"
                style={{
                  backgroundImage: "none !important",
                  backgroundPosition: "unset !important",
                }}
              />
            </div>
          </div>
        </div>

        {/* Second Row: Category, Source, Author - Equal sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Category MultiSelect */}
          <div className="flex flex-col">
            <Label className="mb-2 text-sm font-medium text-slate-700">
              Category
            </Label>
            <div className="relative flex items-center w-full">
              <Filter className="absolute left-3 z-10 w-4 h-4 stroke-[1.3] text-slate-500 pointer-events-none" />
              <MultiSelect
                value={filterState.category}
                onChange={handleFieldChange("SET_CATEGORIES")}
                className="pl-10 pr-8 py-2.5 w-full h-10"
              >
                {NEWS_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </MultiSelect>
            </div>
          </div>

          {/* Source MultiSelect */}
          <div className="flex flex-col">
            <Label className="mb-2 text-sm font-medium text-slate-700">
              Source
            </Label>
            <div className="relative flex items-center w-full">
              <Newspaper className="absolute left-3 z-10 w-4 h-4 stroke-[1.3] text-slate-500 pointer-events-none" />
              <MultiSelect
                value={filterState.sources}
                onChange={handleFieldChange("SET_SOURCES")}
                className="pl-10 pr-8 py-2.5 w-full h-10"
              >
                {SOURCE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </MultiSelect>
            </div>
          </div>

          {/* Author MultiSelect */}
          <div className="flex flex-col">
            <Label className="mb-2 text-sm font-medium text-slate-700">
              Author
            </Label>
            <div className="relative flex items-center w-full">
              <User className="absolute left-3 z-10 w-4 h-4 stroke-[1.3] text-slate-500 pointer-events-none" />
              <MultiSelect
                value={filterState.author}
                onChange={handleFieldChange("SET_AUTHORS")}
                className="pl-10 pr-8 py-2.5 w-full h-10"
              >
                {POPULAR_AUTHORS.map((author) => (
                  <option key={author.value} value={author.value}>
                    {author.label}
                  </option>
                ))}
              </MultiSelect>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
