import { NewsCard } from "@/components/news-card";
import { NewsCardSkeleton } from "@/components/news-card/news-card.skeleton";
import { ErrorMessage } from "@/components/error-message";
import { useNewsArticles } from "@/hooks/use-news-articles";

function Home() {
  const { articles, isLoading, errors } = useNewsArticles({
    query: "technology",
    pageSize: 10,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
          <h1 className="text-2xl font-bold mb-6">News Aggregator</h1>
        </div>
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="col-span-12 md:col-span-4 flex"
          >
            <NewsCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  const hasErrors = errors && errors.length > 0;
  const hasArticles = articles && articles.length > 0;

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <h1 className="text-2xl font-bold mb-6">News Aggregator</h1>
      </div>

      {/* Articles Grid */}
      {hasArticles &&
        articles?.map((article) => (
          <div
            key={`article-${article.id}-${article.source}`}
            className="col-span-12 md:col-span-4 flex"
          >
            <NewsCard
              title={article.title}
              description={article.description}
              date={article.publishedAt}
              url={article.url}
              imageUrl={article.imageUrl}
              source={article.source}
            />
          </div>
        ))}

      {/* Error Messages */}
      {hasErrors &&
        errors?.map((error) => (
          <ErrorMessage
            key={error.source}
            message={`Error loading ${error.source} articles`}
          />
        ))}
    </div>
  );
}

export default Home;
