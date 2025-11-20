import { FileText, Newspaper, Filter } from "lucide-react";

export function HomeEmptyState() {
  return (
    <div className="col-span-12">
      <div className="flex flex-col items-center justify-center pt-0 pb-8 px-4">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-primary/5 rounded-3xl blur-2xl animate-pulse"></div>
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 border-2 border-primary/30 shadow-lg backdrop-blur-sm">
            <div className="relative">
              <Newspaper
                className="h-16 w-16 text-primary drop-shadow-lg"
                strokeWidth={1.5}
              />
              <div className="absolute -top-1 -right-1">
                <FileText className="h-6 w-6 text-primary/60" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-3">
          No articles found
        </h3>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-500">
          <Filter className="h-4 w-4 text-primary" />
          <span>Try different keywords, categories, or date ranges</span>
        </div>
      </div>
    </div>
  );
}
