import { globalStyle, style } from "@vanilla-extract/css";

export const viewer = style({
  width: "100%",
  height: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents`, {
  fontFamily: "Pretendard, sans-serif !important",
});

globalStyle(`${viewer} .toastui-editor-contents h1`, {
  fontSize: "36px",
  borderBottom: "none",
  paddingTop: "30px",
  marginBlock: "16px",
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents > h1:first-of-type`, {
  paddingTop: "16px",
});

globalStyle(`${viewer} .toastui-editor-contents h2`, {
  fontSize: "30px",
  borderBottom: "none",
  paddingTop: "24px",
  marginBlock: "16px",
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents h3`, {
  fontSize: "24px",
  paddingTop: "18px",
  marginBlock: "16px",
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents h4`, {
  fontSize: "22px",
  paddingTop: "16px",
  marginBlock: "16px",
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents h5`, {
  fontSize: "20px",
  paddingTop: "14px",
  marginBlock: "16px",
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents h6`, {
  fontSize: "18px",
  paddingTop: "24px",
  marginBlock: "16px",
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents p`, {
  fontSize: "16px",
  lineHeight: "1.5",
});

globalStyle(`${viewer} .toastui-editor-contents ul li`, {
  paddingBlock: "4px",
});

globalStyle(`${viewer} .toastui-editor-contents ol li`, {
  paddingBlock: "4px",
});

globalStyle(`${viewer} .toastui-editor-contents ol li::before`, {
  marginTop: "-2px",
  fontSize: "15px",
});
