import { style } from "@vanilla-extract/css";

export const tagsBox = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  paddingLeft: "8px",
  width: "100%",
  minHeight: "36px",
  border: "1px solid #dbdbdb",
  borderRadius: "4px",
  boxSizing: "border-box",
});

export const placeholder = style({
  marginLeft: "4px",
});

export const tagInputBox = style({
  display: "inline-flex",
  alignItems: "center",
  marginLeft: "4px",
  marginBlock: "4px",
  borderRadius: "18px",
  backgroundColor: "#f2f2f2",
  padding: "4px 6px",
});

export const tagInput = style({
  display: "flex",
  padding: 0,
  minWidth: "50px",
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  fontSize: "0.875rem",
  fontFamily: "Pretendard",
});

export const lineHeight = style({
  lineHeight: "20px",
});

export const tag = style({
  display: "flex",
  padding: "4px 8px",
  marginLeft: "8px",
  marginBlock: "4px",
  borderRadius: "19px",
  backgroundColor: "#EBF3FF",
});
