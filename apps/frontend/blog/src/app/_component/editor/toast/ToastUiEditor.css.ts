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
