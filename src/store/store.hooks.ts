import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IUseNewsConfigurationStore } from "./store.types";
import { ENewsSource } from "./store.enum";
import { storeConfig } from "./store.constant";

/**
 * useNewsConfigurationStore
 *
 * Persisted Zustand store that manages the user's news configuration,
 * including selected sources, categories, and authors.
 *
 * Provides `config` for reading settings and `setConfig` for updating them.
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
