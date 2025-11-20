import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  IUseNewsConfigurationStore,
  IUseAdvanceFilterStore,
} from "./store.types";
import { ENewsSource } from "./store.enum";
import { storeConfig } from "./store.constant";

/**
 * useNewsConfigurationStore that manages the user's news configuration,
 * Persisted - dont reset on page reload.
 */
export const useNewsConfigurationStore = create<IUseNewsConfigurationStore>()(
  persist(
    (set) => ({
      config: {
        sources: [ENewsSource.NewsAPI, ENewsSource.Guardian, ENewsSource.Nyt],
        categories: [],
        authors: [],
      },

      setConfig: (field, value) =>
        set((state) => ({
          config: {
            ...state.config,
            [field]: value,
          },
        })),
    }),
    {
      name: storeConfig.newsConfiguration,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * useAdvanceFilterStore that manages advanced filter state for articles.
 * Not persisted - resets on page reload.
 * Automatically initializes from config store.
 */
export const useAdvanceFilterStore = create<IUseAdvanceFilterStore>((set) => {
  const config = useNewsConfigurationStore.getState().config;

  const getInitialState = (): IUseAdvanceFilterStore["filterState"] => {
    return {
      keyword: "",
      category: config?.categories ?? [],
      sources: config?.sources ?? [],
      author: config?.authors ?? [],
      startDate: "",
      endDate: "",
    };
  };

  return {
    filterState: getInitialState(),

    setKeyword: (keyword) =>
      set((state) => ({
        filterState: {
          ...state.filterState,
          keyword,
        },
      })),

    setCategories: (categories) =>
      set((state) => ({
        filterState: {
          ...state.filterState,
          category: categories,
        },
      })),

    setSources: (sources) =>
      set((state) => ({
        filterState: {
          ...state.filterState,
          sources,
        },
      })),

    setAuthors: (authors) =>
      set((state) => ({
        filterState: {
          ...state.filterState,
          author: authors,
        },
      })),

    setStartDate: (startDate) =>
      set((state) => ({
        filterState: {
          ...state.filterState,
          startDate,
        },
      })),

    setEndDate: (endDate) =>
      set((state) => ({
        filterState: {
          ...state.filterState,
          endDate,
        },
      })),

    resetFilters: (initialState) =>
      set({
        filterState: initialState,
      }),

    initialize: (config) =>
      set((state) => ({
        filterState: {
          ...state.filterState,
          category: config.categories ?? [],
          sources: config.sources ?? [],
          author: config.authors ?? [],
        },
      })),
  };
});

// Subscribe to config changes and auto-initialize filter store when empty
useNewsConfigurationStore.subscribe((state) => {
  const filterStore = useAdvanceFilterStore.getState();
  const currentFilterState = filterStore.filterState;

  // Only initialize if filter state is empty (not user-modified)
  const isEmpty =
    currentFilterState.keyword === "" &&
    currentFilterState.startDate === "" &&
    currentFilterState.endDate === "" &&
    currentFilterState.category.length === 0 &&
    currentFilterState.sources.length === 0 &&
    currentFilterState.author.length === 0;

  if (isEmpty && state.config) {
    useAdvanceFilterStore.getState().initialize({
      categories: state.config.categories ?? [],
      sources: state.config.sources ?? [],
      authors: state.config.authors ?? [],
    });
  }
});
