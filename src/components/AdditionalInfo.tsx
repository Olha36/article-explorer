import { useParams, Link as RouterLink } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import { useArticles } from "../hooks/useArticles";
import "../css/additionalInfo.scss";

import { Box, Typography } from "@mui/material";

export default function AdditionalInfo() {
  const { id } = useParams<{ id: string }>();
  const { filtered } = useArticles();

  const article = filtered.find((a) => a.id.toString() === id);

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <>
      <header>
        <img
          src={article.image_url}
          alt={article.title}
          referrerPolicy="no-referrer"
        />
      </header>

      <Box className="page-wrapper">
        <Box className="article-container">
          <Typography variant="h5" className="article-title">
            {article.title}
          </Typography>

          <Typography
            variant="body1"
            className="article-summary"
            sx={{
              fontSize: {
                xs: "15px",
                sm: "18px",
              },
              lineHeight: "150%",
            }}
          >
            {article.summary}
          </Typography>
        </Box>

        <Box className="back-container">
          <RouterLink to="/" className="router-link">
            <WestIcon />
            Back to homepage
          </RouterLink>
        </Box>
      </Box>
    </>
  );
}
