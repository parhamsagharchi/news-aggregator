import type { ENewsSource } from "./store.enum";

/*
   |--------------------------------------------------------------------------
   | NewsConfiguration
   |--------------------------------------------------------------------------
   */
export interface INewsConfiguration {
  sources: ENewsSource[];
  categories: string[];
  authors: string[];
}

export interface IUseNewsConfigurationStore {
  config: INewsConfiguration;
  setConfig: <K extends keyof INewsConfiguration>(
    field: K,
    value: INewsConfiguration[K]
  ) => void;
}

/*
   |--------------------------------------------------------------------------
   | Advance Filter
   |--------------------------------------------------------------------------
   */
export interface IAdvanceFilter {
  keyword: string;
  category: string[];
  sources: ENewsSource[];
  author: string[];
  startDate: string;
  endDate: string;
}

export interface IUseAdvanceFilterStore {
  filterState: IAdvanceFilter;
  setKeyword: (keyword: string) => void;
  setCategories: (categories: string[]) => void;
  setSources: (sources: ENewsSource[]) => void;
  setAuthors: (authors: string[]) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  resetFilters: (initialState: IAdvanceFilter) => void;
  initialize: (config: { categories: string[]; sources: ENewsSource[]; authors: string[] }) => void;
}

/*
   |--------------------------------------------------------------------------
   | Config
   |--------------------------------------------------------------------------
   */
export interface IStoreConfig {
  newsConfiguration: string;
}
