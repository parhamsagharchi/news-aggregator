import {
  useReducer,
  useEffect,
  type FormEvent,
  useId,
  type ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { Settings as SettingsIcon, Pocket } from "lucide-react";
import toast from "react-hot-toast";
import { Button, MultiSelect, Label } from "@/components/ui";
import { ENewsSource } from "@/store/store.enum";
import {
  useNewsConfigurationStore,
  useAdvanceFilterStore,
} from "@/store/store.hooks";
import {
  NEWS_CATEGORIES,
  SOURCE_OPTIONS,
} from "@/constants/dropdown-options.constant";
import { settingsFormReducer } from "./settings.reducer";
import type { TSettingsFormAction } from "./settings.types";
import { queryClient } from "@/http-core/api/api.query";
import { useAuthorsFromCache } from "@/hooks/use-authors-from-cache";
import { ESettingsFormAction } from "./settings.enum";

function Settings() {
  const formId = useId();
  const navigate = useNavigate();
  const { config, setConfig } = useNewsConfigurationStore();

  // Get authors from cache
  const authorsFromCache = useAuthorsFromCache();
  const hasAuthors = authorsFromCache && authorsFromCache.length > 0;

  // Initialize form state from config
  const [formState, dispatch] = useReducer(settingsFormReducer, {
    sources: config?.sources ?? [],
    categories: config?.categories ?? [],
    authors: config?.authors ?? [],
  });

  // Sync form state when config changes
  useEffect(() => {
    dispatch({
      type: ESettingsFormAction.RESET,
      payload: {
        sources: config?.sources ?? [],
        categories: config?.categories ?? [],
        authors: config?.authors ?? [],
      },
    });
  }, [config?.sources, config?.categories, config?.authors]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Save to store (no filtering needed - all values are valid)
      setConfig("sources", formState?.sources as ENewsSource[]);
      setConfig("categories", formState?.categories);
      setConfig("authors", formState?.authors);

      // Reset filter state to match new config
      const { initialize } = useAdvanceFilterStore.getState();
      initialize({
        categories: formState?.categories,
        sources: formState?.sources as ENewsSource[],
        authors: formState?.authors,
      });

      // Invalidate all query caches to force refetch with new settings
      queryClient.invalidateQueries();

      toast.success("Settings saved successfully!");
      navigate("/");
    } catch {
      toast.error("Failed to save settings. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleFieldChange =
    (
      actionType:
        | ESettingsFormAction.SET_SOURCES
        | ESettingsFormAction.SET_CATEGORIES
        | ESettingsFormAction.SET_AUTHORS
    ) =>
    (
      e: ChangeEvent<HTMLSelectElement> & {
        target: { value: string[] };
      }
    ) => {
      dispatch({
        type: actionType,
        payload: e?.target?.value,
      } as TSettingsFormAction);
    };

  return (
    <div className="grid grid-cols-12 gap-y-6 sm:gap-y-10 gap-x-4 sm:gap-x-6 pb-12 sm:pb-0">
      <div className="col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3">
        {/* Settings Description */}
        <div className="mb-4 sm:mb-6">
          <div className="box box--stacked p-4 sm:p-5 md:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm flex-shrink-0">
                <SettingsIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Settings
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500/80 leading-relaxed">
              Customize your news preferences by selecting your preferred news
              sources, categories, and authors. These settings will be saved and
              used as default filters when you browse articles. You can always
              override these settings using the filter bar on the home page.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-4 sm:mt-7 mb-12 sm:mb-0"
          id={formId}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          autoSave="off"
          spellCheck="false"
          inputMode="text"
          role="form"
          aria-labelledby={formId}
          aria-describedby={formId}
        >
          <div className="flex flex-col box box--stacked">
            <div className="p-4 sm:p-6 md:p-7">
              {/* Source Field  */}
              <div className="flex-col block pt-4 sm:pt-5 mt-4 sm:mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <Label className="sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14 mb-2">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium text-sm sm:text-base">
                        Sources
                      </div>
                    </div>
                    <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                      Select your preferred news sources. You can select
                      multiple sources. Leave empty to get articles from all
                      available providers.
                    </div>
                  </div>
                </Label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <MultiSelect
                    value={formState.sources}
                    onChange={handleFieldChange(
                      ESettingsFormAction.SET_SOURCES
                    )}
                  >
                    {SOURCE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </MultiSelect>
                </div>
              </div>

              {/* Category Field  */}
              <div className="flex-col block pt-4 sm:pt-5 mt-4 sm:mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <Label className="sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14 mb-2 sm:mb-0">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium text-sm sm:text-base">
                        Categories
                      </div>
                    </div>
                    <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                      Select default categories to filter news articles. You can
                      select multiple categories. Leave empty to see articles
                      from all topics.
                    </div>
                  </div>
                </Label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <MultiSelect
                    value={formState.categories}
                    onChange={handleFieldChange(
                      ESettingsFormAction.SET_CATEGORIES
                    )}
                  >
                    {NEWS_CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </MultiSelect>
                </div>
              </div>

              {/* Author Field  */}
              <div className="flex-col block pt-4 sm:pt-5 mt-4 sm:mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <Label className="sm:mr-5 sm:text-right xl:w-60 xl:mr-14 mb-2 sm:mb-0">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium text-sm sm:text-base">
                        Authors
                      </div>
                    </div>
                    <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                      Select preferred authors or journalists. You can select
                      multiple authors. Leave empty to see articles from all
                      writers. Note: Author filtering depends on API support.
                    </div>
                  </div>
                </Label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <MultiSelect
                    value={formState.authors}
                    onChange={handleFieldChange(
                      ESettingsFormAction.SET_AUTHORS
                    )}
                    disabled={!hasAuthors}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                    title={
                      !hasAuthors
                        ? "No authors available. Load articles first to see available authors."
                        : undefined
                    }
                  >
                    {hasAuthors ? (
                      authorsFromCache.map((author) => (
                        <option key={author.value} value={author.value}>
                          {author.label}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No authors available
                      </option>
                    )}
                  </MultiSelect>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 py-4 sm:py-5 border-t md:justify-end px-4 sm:px-6 md:px-7 border-slate-200/80">
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline-primary"
                className="w-full sm:w-auto px-8 sm:px-10 border-red-400/50 bg-gradient-to-r from-red-500/90 to-orange-500/90 text-white hover:from-red-500 hover:to-orange-500 shadow-md hover:shadow-lg transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outline-primary"
                className="w-full sm:w-auto px-8 sm:px-10 border-primary/50"
              >
                <Pocket className="stroke-[1.3] w-4 h-4 mr-2 -ml-2" />
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
