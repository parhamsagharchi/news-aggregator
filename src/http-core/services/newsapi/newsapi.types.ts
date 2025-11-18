export interface IGetNewsApiPayload {
  q?: string;
  sources?: string;
  domains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: string;
  pageSize?: number;
  page?: number;
}

export interface INewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface IGetNewsApiResponse {
  status: string;
  totalResults: number;
  articles: INewsApiArticle[];
}

