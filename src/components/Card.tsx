import { useEffect, useState } from "react";
import fetchArticles from "../api/fetchArticles";
import type { Article } from "../types/Card";
import {
  ArticlesContainer,
  CardSummary,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  CardWrapper,
} from "./Card.styles";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Divider, Link, Typography } from "@mui/material";
import formatDate from "../lib/formatDate";
import dateIcon from "../assets/date-icon.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function highlight(text: string, keywords: string[]) {
  if (!keywords.length) return text;

  const pattern = new RegExp(`(${keywords.join("|")})`, "gi");

  return text.replace(pattern, "<mark>$1</mark>");
}

export default function Card() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchArticles().then(setArticles).catch(console.error);
  }, []);

  const keywords = search.toLowerCase().split(/\s+/).filter(Boolean);

  const filtered = articles
    .map((article) => {
      const title = article.title.toLowerCase();
      const description = article.summary.toLowerCase();

      let titleMatches = 0;
      let descMatches = 0;

      keywords.forEach((k) => {
        if (title.includes(k)) titleMatches++;
        if (description.includes(k)) descMatches++;
      });

      const score = titleMatches * 2 + descMatches; // title has higher priority

      return { ...article, score, titleMatches, descMatches };
    })
    .filter((a) => a.score > 0 || keywords.length === 0)
    .sort((a, b) => b.score - a.score);

  return (
    <>
      <Box>
        <Box sx={{ textAlign: "start" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Filter by keywords
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="The most successful IT companies in 2020"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Search>
        </Box>
        <Box style={{ margin: "40px 0" }}>
          <Typography
            variant="h6"
            style={{ fontWeight: 600, textAlign: "start" }}
          >
            Results:
          </Typography>
          <Divider />
        </Box>

        <ArticlesContainer>
          {filtered.map((article) => (
            <CardWrapper key={article.id}>
              <img
                src={article.image_url}
                alt={article.title}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: 16 / 9,
                  borderRadius: "5px 5px 0 0",
                }}
              />
              <Box style={{ padding: "25px", textAlign: "start" }}>
                <Box display={"flex"} alignItems="center" gap="8px" mb="27px">
                  <img src={dateIcon} alt="date icon" />
                  <small style={{ color: "#363636", opacity: 0.6 }}>
                    {formatDate(article.published_at)}
                  </small>
                </Box>

                <Typography
                  variant="h5"
                  dangerouslySetInnerHTML={{
                    __html: highlight(article.title, keywords),
                  }}
                ></Typography>

                <CardSummary
                  dangerouslySetInnerHTML={{
                    __html: highlight(article.summary, keywords),
                  }}
                ></CardSummary>

                <Box display="flex" gap="6px">
                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontWeight: 700,
                      textDecoration: "none",
                      color: "#363636",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    Read more
                  </Link>
                  <ArrowRightAltIcon />
                </Box>
              </Box>
            </CardWrapper>
          ))}
        </ArticlesContainer>
      </Box>
    </>
  );
}
