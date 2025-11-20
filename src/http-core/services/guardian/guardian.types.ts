export interface IGetGuardianPayload {
  q?: string;
  section?: string;
  tag?: string;
  fromDate?: string;
  toDate?: string;
  orderBy?: "newest" | "oldest" | "relevance";
  pageSize?: number;
  page?: number;
  showFields?: string;
  showTags?: string;
}

export interface IGuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

export interface IGetGuardianResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: IGuardianArticle[];
  };
}
