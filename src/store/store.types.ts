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
   | Config
   |--------------------------------------------------------------------------
   */
export interface IStoreConfig {
  newsConfiguration: string;
}
