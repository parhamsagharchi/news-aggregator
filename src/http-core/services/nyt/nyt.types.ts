export interface IGetNytPayload {
  q?: string;
  fq?: string;
  begin_date?: string;
  end_date?: string;
  sort?: "newest" | "oldest" | "relevance";
  page?: number;
}

export interface INytArticle {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string | null;
  print_section: string | null;
  print_page: string | null;
  source: string;
  multimedia: Array<{
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
  }>;
  headline: {
    main: string;
    kicker: string | null;
    content_kicker: string | null;
    print_headline: string | null;
    name: string | null;
    seo: string | null;
    sub: string | null;
  };
  keywords: Array<{
    name: string;
    value: string;
    rank: number;
    major: string;
  }>;
  pub_date: string;
  document_type: string;
  news_desk: string | null;
  section_name: string | null;
  subsection_name: string | null;
  byline: {
    original: string | null;
    person: Array<{
      firstname: string | null;
      middlename: string | null;
      lastname: string | null;
      qualifier: string | null;
      title: string | null;
      role: string;
      organization: string;
      rank: number;
    }>;
    organization: string | null;
  };
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface IGetNytResponse {
  status: string;
  copyright: string;
  response: {
    docs: INytArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

