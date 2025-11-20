import { NewsCardSkeleton } from "@/components/news-card/news-card.skeleton";

export function HomeSkeleton() {
  return (
    <div className="col-span-12">
      <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-y-10 md:gap-x-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 flex"
          >
            <div className="w-full">
              <NewsCardSkeleton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
