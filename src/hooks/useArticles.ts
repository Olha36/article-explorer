import { useEffect, useMemo, useState } from "react";
import fetchArticles from "../api/fetchArticles";
import type { Article } from "../types/Card";

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchArticles().then(setArticles).catch(console.error);
  }, []);

  const keywords = useMemo(
    () => search.toLowerCase().split(/\s+/).filter(Boolean),
    [search]
  );

  const filtered = useMemo(() => {
    return articles
      .map((article) => {
        const title = article.title.toLowerCase();
        const description = article.summary.toLowerCase();

        let titleMatches = 0;
        let descMatches = 0;

        keywords.forEach((k) => {
          if (title.includes(k)) titleMatches++;
          if (description.includes(k)) descMatches++;
        });

        const score = titleMatches * 2 + descMatches;

        return { ...article, score };
      })
      .filter((a) => a.score > 0 || keywords.length === 0)
      .sort((a, b) => b.score - a.score);
  }, [articles, keywords]);

  return {
    search,
    setSearch,
    keywords,
    filtered,
  };
}
