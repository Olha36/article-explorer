export interface Article {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  published_at: string;
  url?: string;
}

export interface ArticlesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}
