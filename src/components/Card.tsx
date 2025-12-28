import { useEffect, useState } from "react";
import fetchArticles from "../api/fetchArticles";
import type { Article } from "../types/Card";

export default function Card() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles().then(setArticles).catch(console.error);
  }, []);

  return (
    <>
      {articles.map((article) => (
        <div key={article.id} className="card">
          <h2>{article.title}</h2>

          <img src={article.image_url} alt={article.title} />

          <p>{article.summary}</p>

          <small>{new Date(article.published_at).toLocaleDateString()}</small>

          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </>
  );
}
