import { style } from "@vanilla-extract/css";

export const postContainer = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "330px",
  height: "350px",
  borderRadius: "12px",
  border: "1px solid #dbdbdb",
  boxShadow: "none",
  overflow: "hidden",
  transition: "all .2s ease-out",
  ":hover": {
    cursor: "pointer",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.08)",
  },
});

export const imageContainer = style({
  width: "100%",
  height: "195px",
  position: "relative",
  overflow: "hidden",
});

export const imageHover = style({
  transition: "transform 0.2s ease-out",
  transform: "scale(1)",
  selectors: {
    [`${postContainer}:hover &`]: {
      transform: "scale(1.07)", // hover 시 이미지 확대
    },
  },
});

export const infoContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: "155px",
  padding: "16px",
  boxSizing: "border-box",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "10px",
});

export const favorites = style({
  display: "inline-flex",
});

export const likes = style({
  marginLeft: "6px",
  marginTop: "1.5px",
});

export const title = style({
  width: "85%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const description = style({
  display: "-webkit-box",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  lineHeight: "135%",
});

export const details = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const author = style({
  display: "inline-flex",
});

export const by = style({
  color: "#262626",
  fontSize: "0.75rem",
  marginRight: "6px",
});
