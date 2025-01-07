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
  marginTop: "40px",
  marginBottom: "16px",
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents > h1:first-of-type`, {
  marginBottom: "40px",
});

globalStyle(`${viewer} .toastui-editor-contents h2`, {
  fontSize: "30px",
  borderBottom: "none",
  marginTop: "36px",
  marginBottom: "16px",
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents h3`, {
  fontSize: "24px",
  marginTop: "30px",
  marginBottom: "16px",
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents h4`, {
  fontSize: "22px",
  marginTop: "28px",
  marginBottom: "16px",
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents h5`, {
  fontSize: "20px",
  marginTop: "26px",
  marginBottom: "16px",
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents h6`, {
  fontSize: "18px",
  marginTop: "24px",
  marginBottom: "16px",
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
