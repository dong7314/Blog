import { style } from "@vanilla-extract/css";

export const itemContent = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "45%",
  height: "260px",
  padding: "24px 28px",
  margin: "1.5% 2.4%",
  border: "1px solid #dbdbdb",
  borderRadius: "12px",
  boxSizing: "border-box",
  boxShadow: "none",
  transition: "all .2s ease-out",
  ":hover": {
    cursor: "pointer",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.08)",
  },
});

export const title = style({
  display: "block",
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  marginBottom: "6px",
});

export const itemCenter = style({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
});

export const image = style({
  borderRadius: "6px",
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
});

export const itemCenterText = style({
  display: "-webkit-box",
  width: "50%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: 7,
  WebkitBoxOrient: "vertical",
  whiteSpace: "pre-wrap",
  lineHeight: "140%",
});

export const itemFooter = style({
  display: "flex",
  justifyContent: "space-between",
});

export const flex = style({
  display: "flex",
});
