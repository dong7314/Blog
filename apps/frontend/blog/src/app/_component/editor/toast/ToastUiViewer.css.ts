import { globalStyle, style } from "@vanilla-extract/css";

export const viewer = style({
  width: "100%",
  height: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents`, {
  fontFamily: "Pretendard, sans-serif !important",
});

globalStyle(`${viewer} .toastui-editor-contents h1`, {
  display: "flex",
  fontSize: "36px",
  borderBottom: "none",
  paddingTop: "46px",
  paddingBottom: "16px",
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents > h1:first-of-type`, {
  paddingTop: "32px",
});

globalStyle(`${viewer} .toastui-editor-contents h2`, {
  display: "flex",
  fontSize: "30px",
  borderBottom: "none",
  paddingTop: "40px",
  paddingBottom: "16px",
  marginBlock: 0,
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents h3`, {
  fontSize: "24px",
  paddingTop: "34px",
  paddingBottom: "16px",
  marginBlock: 0,
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents h4`, {
  fontSize: "22px",
  paddingTop: "32px",
  paddingBottom: "16px",
  marginBlock: 0,
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents h5`, {
  fontSize: "20px",
  paddingTop: "30px",
  paddingBottom: "16px",
  marginBlock: 0,
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents h6`, {
  fontSize: "18px",
  paddingTop: "26px",
  paddingBottom: "16px",
  marginBlock: 0,
  lineHeight: "100%",
});

globalStyle(`${viewer} .toastui-editor-contents p`, {
  display: "flex",
  fontSize: "16px",
  lineHeight: "1.5",
});

globalStyle(`${viewer} .toastui-editor-contents p:has(img)`, {
  justifyContent: "center",
});

globalStyle(`${viewer} .toastui-editor-contents ul li`, {
  paddingBlock: "4px",
});

globalStyle(`${viewer} .toastui-editor-contents-br`, {
  height: "6px",
  marginBlock: "6px",
});

globalStyle(`${viewer} .toastui-editor-contents ol li`, {
  paddingBlock: "4px",
});

globalStyle(`${viewer} .toastui-editor-contents ol li::before`, {
  marginTop: "-2px",
  fontSize: "15px",
});

globalStyle(`${viewer} .toastui-editor-contents ul li::before`, {
  marginTop: "8.5px",
});

globalStyle(`${viewer} pre`, {
  borderRadius: "6px !important",
});
