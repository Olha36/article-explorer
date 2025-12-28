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
export default function Card() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles().then(setArticles).catch(console.error);
  }, []);

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
          {articles.map((article) => (
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

                <Typography variant="h5">{article.title}</Typography>

                <CardSummary>{article.summary}</CardSummary>

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
