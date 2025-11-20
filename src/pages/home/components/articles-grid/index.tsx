import { NewsCard } from "@/components/news-card";
import type { IHomeArticlesGrid } from "./article-grid.types";

export function HomeArticlesGrid({ articles }: IHomeArticlesGrid) {
  return (
    <div className="col-span-12">
      <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-y-10 md:gap-x-6">
        {articles?.map((article) => (
          <div
            key={`article-${article.id}-${article.source}`}
            className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 flex"
          >
            <div className="w-full">
              <NewsCard
                title={article.title}
                description={article.description}
                date={article.publishedAt}
                url={article.url}
                imageUrl={article.imageUrl}
                source={article.source}
                author={article.author}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
