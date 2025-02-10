"use client";

import { useEffect, useRef } from "react";

import * as styles from "./PostEditor.css";

import Editor from "@/app/_component/editor/Editor";
import { usePostStore } from "../../../_store/postStore";

type Props = {
  content?: string;
};
export default function PostEditor({ content }: Props) {
  const editorRef = useRef(null);
  const postStore = usePostStore();

  const handleOnChange = (value: string) => {
    postStore.setContent(value);
  };

  useEffect(() => {
    if (content) {
      postStore.setContent(content);
    }
  }, [content]);

  return (
    <div className={styles.editor}>
      <Editor
        content={content ?? ""}
        editorRef={editorRef}
        onChange={handleOnChange}
      ></Editor>
    </div>
  );
}
