import { Bell } from "lucide-react";
import type { IHomeHeader } from "../../home.types";
import { SOURCE_OPTIONS } from "@/constants/dropdown-options.constant";
import { useNewsArticles } from "@/hooks/use-news-articles";
import { homePageSize } from "../../home.constant";
import { ENewsSource } from "@/store/store.enum";

export function HomeHeader({ hasArticles, articleCount }: IHomeHeader) {
  const { newsAPICount, guardianCount, nytCount } = useNewsArticles({
    pageSize: homePageSize,
  });

  const sourceBadges = [
    {
      count: newsAPICount,
      label: SOURCE_OPTIONS[0].label,
      source: ENewsSource.NewsAPI,
    },
    {
      count: guardianCount,
      label: SOURCE_OPTIONS[1].label,
      source: ENewsSource.Guardian,
    },
    {
      count: nytCount,
      label: SOURCE_OPTIONS[2].label,
      source: ENewsSource.Nyt,
    },
  ].filter((badge) => badge.count > 0); // Only show sources with articles

  const descriptionText = hasArticles
    ? `Discover ${articleCount} ${
        articleCount === 1 ? "story" : "stories"
      } from around the world`
    : "Discover trending stories from around the world";

  return (
    <div className="col-span-12">
      <div className="box box--stacked p-4 sm:p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm flex-shrink-0">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-bold text-slate-800 truncate">
                Latest News
              </h1>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                {descriptionText}
              </p>
            </div>
          </div>

          {sourceBadges.length > 0 && (
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {sourceBadges.map((badge) => {
                return (
                  <div
                    key={badge.source}
                    className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200 flex-shrink-0"
                  >
                    <span className="text-xs whitespace-nowrap">
                      <span className="font-semibold text-slate-500">
                        {badge.label}:
                      </span>
                      <span className="ml-1 text-slate-400 ">
                        {badge.count}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
