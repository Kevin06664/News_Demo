export interface Article {
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
  isBookmarked?: boolean;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type RootStackParamList = {
  Home: undefined;
  ArticleDetail: { article: Article };
  Bookmarks: undefined;
};

export type TabParamList = {
  Home: undefined;
  Bookmarks: undefined;
}; 