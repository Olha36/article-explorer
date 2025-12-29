import type { Article, ArticlesResponse } from "../types/Card";

const BASE_URL = "https://api.spaceflightnewsapi.net/v4/articles";

export default async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const json: ArticlesResponse = await res.json();

  return json.results.map((article) => ({
    id: article.id,
    title: article.title,
    summary: article.summary,
    image_url: article.image_url,
    published_at: article.published_at,
  }));
}
