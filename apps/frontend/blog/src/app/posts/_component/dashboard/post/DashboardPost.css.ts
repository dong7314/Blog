import { style } from "@vanilla-extract/css";

export const flexCenter = style({
  display: "flex",
  alignItems: "center",
});

export const article = style({
  display: "flex",
  width: "100%",
  borderBottom: "1px solid #dbdbdb",
  selectors: {
    "&:nth-last-of-type(1)": {
      borderBottom: "none",
    },
  },
});

export const postContainer = style({
  display: "flex",
  width: "100%",
  height: "330px",
  padding: "20px",
  boxSizing: "border-box",
});

export const image = style({
  borderRadius: "12px",
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
});

export const infoContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  marginLeft: "32px",
  paddingTop: "6px",
});

export const author = style([
  flexCenter,
  {
    marginBottom: "14px",
    justifyContent: "space-between",
  },
]);

export const profile = style([
  flexCenter,
  {
    ":hover": {
      cursor: "pointer",
    },
  },
]);

export const profileIcon = style({
  marginRight: "8px",
});

export const title = style({
  paddingLeft: "4px",
  marginBottom: "14px",
});

export const content = style({
  marginBottom: "14px",
  paddingLeft: "4px",
  display: "-webkit-box",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: 7,
  WebkitBoxOrient: "vertical",
  whiteSpace: "pre-wrap",
  lineHeight: "140%",
});

export const postLink = style({
  flexDirection: "column",
});

export const details = style([
  flexCenter,
  {
    paddingBottom: "4px",
    justifyContent: "space-between",
  },
]);

export const tags = style([flexCenter]);

export const tag = style({
  marginLeft: "8px",
  ":hover": {
    cursor: "pointer",
    color: "#262626 !important",
  },
  selectors: {
    "&:nth-of-type(1)": {
      marginLeft: "4px",
    },
  },
});

export const comments = style([
  flexCenter,
  {
    padding: "2px",
    marginRight: "10px",
    borderRadius: "6px",
    backgroundColor: "transparent",
    transition: "background-color .15s ease-out",
    boxSizing: "border-box",
    ":hover": {
      backgroundColor: "rgba(0,0,0,0.08)",
      cursor: "pointer",
    },
  },
]);

export const commentsCounter = style({
  marginLeft: "4px",
});

export const favorites = style([flexCenter]);
