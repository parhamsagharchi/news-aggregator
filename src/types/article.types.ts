import { ENewsSource } from "@/store/store.enum";

/**
 * Unified article type that normalizes data from different news sources
 */
export interface IArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string | null;
  publishedAt: string;
  source: ENewsSource;
}

