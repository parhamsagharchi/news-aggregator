import { ENewsSource } from "@/store/store.enum";
import type { IArticle } from "@/types/article.types";
import type { INewsApiArticle } from "@/http-core/services/newsapi/newsapi.types";
import type { IGuardianArticle } from "@/http-core/services/guardian/guardian.types";
import type { INytArticle } from "@/http-core/services/nyt/nyt.types";

/**
 * Normalize NewsAPI article to unified format
 */
export const normalizeNewsApiArticle = (
  article: INewsApiArticle
): IArticle => ({
  id: article?.url || "",
  title: article?.title || "",
  description: article?.description || article?.content || "",
  url: article?.url || "",
  imageUrl: article?.urlToImage || null,
  publishedAt: article?.publishedAt || "",
  source: ENewsSource.NewsAPI,
  author: article?.author || null,
});

/**
 * Normalize Guardian article to unified format
 */
export const normalizeGuardianArticle = (
  article: IGuardianArticle
): IArticle => ({
  id: article?.id || "",
  title: article?.webTitle || "",
  description: "",
  url: article?.webUrl || "",
  imageUrl: null, // Guardian doesn't provide reliable images
  publishedAt: article?.webPublicationDate || "",
  source: ENewsSource.Guardian,
  author: "",
});

/**
 * Normalize NYT article to unified format
 */
export const normalizeNytArticle = (article: INytArticle): IArticle => ({
  id: article?._id,
  title: article?.headline?.main || "",
  description: article?.snippet || article?.abstract || "",
  url: article?.web_url,
  imageUrl: article?.multimedia?.default?.url || null,
  publishedAt: article?.pub_date,
  source: ENewsSource.Nyt,
  author: article?.byline?.original || null,
});
