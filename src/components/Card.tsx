import { Box, Divider, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import fallback from '../assets/fallback.png'

import {
  ArticlesContainer,
  CardSummary,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  CardWrapper,
} from "./Card.styles";

import dateIcon from "../assets/date-icon.png";
import formatDate from "../lib/formatDate";
import { useArticles } from "../hooks/useArticles";
import { highlight } from "../lib/highlight";
import { Link as RouterLink } from "react-router-dom";

export default function Card() {
  const { search, setSearch, filtered, keywords } = useArticles();

  return (
    <Box sx={{ padding: "50px 75px" }}>
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
          Results: {keywords.length === 0 ? 0 : filtered.length}
        </Typography>
        <Divider />
      </Box>

      <ArticlesContainer>
        {filtered.map((article) => (
          <CardWrapper key={article.id}>
            <img
              src={article.image_url || fallback}
              alt={article.title}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== fallback) {
                  target.src = fallback;
                }
              }}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: 16 / 9,
                borderRadius: "5px 5px 0 0",
                objectFit: "cover",
              }}
            />

            <Box
              style={{
                padding: "25px",
                textAlign: "start",
              }}
            >
              <Box display="flex" alignItems="center" gap="8px" mb="27px">
                <img src={dateIcon} alt="date icon" />
                <small style={{ color: "#363636", opacity: 0.6 }}>
                  {formatDate(article.published_at)}
                </small>
              </Box>

              <Typography
                variant="h5"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: "84px",
                }}
                dangerouslySetInnerHTML={{
                  __html: highlight(article.title, keywords),
                }}
              />

              <CardSummary
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: "96px",
                }}
                dangerouslySetInnerHTML={{
                  __html: highlight(article.summary, keywords),
                }}
              />

              <Box display="flex" gap="6px">
                <RouterLink
                  to={`/additional-info/${article.id}`}
                  style={{
                    fontWeight: 700,
                    color: "#363636",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  Read more
                </RouterLink>

                <ArrowRightAltIcon />
              </Box>
            </Box>
          </CardWrapper>
        ))}
      </ArticlesContainer>
    </Box>
  );
}
