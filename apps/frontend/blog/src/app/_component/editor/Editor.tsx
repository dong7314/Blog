"use client";

import dynamic from "next/dynamic";

const ToastUiEditor = dynamic(
  () => import("@/app/_component/editor/toast/ToastUiEditor"),
  {
    ssr: false,
  },
);

type Props = {
  content: string;
  editorRef: React.MutableRefObject<any>;
  onChange?: (value: string) => void;
};

export default function Editor({ content, editorRef, onChange }: Props) {
  return (
    <>
      <ToastUiEditor
        content={content}
        editorRef={editorRef}
        onChange={onChange}
      />
    </>
  );
}
