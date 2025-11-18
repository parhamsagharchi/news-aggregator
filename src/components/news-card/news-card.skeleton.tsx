export function NewsCardSkeleton() {
  return (
    <div className="p-5 box box--stacked cursor-pointer h-full w-full flex flex-col animate-pulse">
      <div className="h-48 overflow-hidden rounded-lg bg-slate-200" />

      <div className="mt-5 flex items-center gap-2">
        <div className="h-6 w-24 bg-slate-200 rounded-full" />
        <div className="h-4 w-40 bg-slate-200 rounded" />
      </div>

      <div className="mt-2 min-h-[3rem] space-y-2">
        <div className="h-5 bg-slate-200 rounded w-full" />
        <div className="h-5 bg-slate-200 rounded w-4/5" />
      </div>

      <div className="mt-2 leading-relaxed flex-grow min-h-[4.5rem] space-y-2">
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
        <div className="h-4 bg-slate-200 rounded w-4/5" />
      </div>
    </div>
  );
}
