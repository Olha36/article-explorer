import { styled } from "@mui/material/styles";

import { InputBase } from "@mui/material";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #EAEAEA",
  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
  margin: "10px 0",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

export const ArticlesContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "45px",
});

export const CardSummary = styled("p")({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 4,
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "start",
});

export const CardWrapper = styled("div")({
  boxShadow: "0px 8px 24px 0px #0000000D",
  border: "1px solid #EAEAEA",
  borderRadius: "5px",
});


export const CardContainer = styled("div")(({ theme }) => ({
  padding: "50px 75px",

  [theme.breakpoints.down(475)]: {
    padding: "20px 13px",
  },
}));
