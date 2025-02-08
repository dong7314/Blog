import { globalStyle, style } from "@vanilla-extract/css";

export const editor = style({
  width: "100%",
  height: "100%",
});

globalStyle(
  `${editor} .toastui-editor-.toastui-editor-defaultUI, ${editor} .toastui-editor-tooltip, ${editor} .ProseMirror`,
  {
    fontFamily: "Pretendard, sans-serif !important",
  },
);

globalStyle(
  `${editor} .toastui-editor-tooltip, ${editor} .toastui-editor-tooltip .arrow`,
  {
    backgroundColor: "#3F3F3F",
  },
);

globalStyle(`${editor} .toastui-editor-tabs`, {
  display: "none",
});

globalStyle(`${editor} .toastui-editor-defaultUI`, {
  border: "1px solid #dbdbdb",
});

globalStyle(`${editor} .ProseMirror::-webkit-scrollbar`, {
  width: "5px !important",
});

globalStyle(`${editor} .ProseMirror::-webkit-scrollbar-track`, {
  backgroundColor: "transparent !important",
});

globalStyle(`${editor} .ProseMirror::-webkit-scrollbar-thumb`, {
  background: "#a5a5a5 !important",
  borderRadius: "2.5px !important",
  transition: "all 0.2s ease-out !important",
});

globalStyle(
  `${editor} .toastui-editor-file-select-button, ${editor} .toastui-editor-close-button, ${editor} .toastui-editor-ok-button`,
  {
    fontFamily: "Pretendard, sans-serif !important",
  },
);
