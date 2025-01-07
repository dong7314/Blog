"use client";

import { useRef } from "react";

import * as styles from "./CreateEditor.css";

import Editor from "@/app/_component/editor/Editor";
import { usePostStore } from "../../_store/post";

export default function CreateEditor() {
  const editorRef = useRef(null);
  const postStore = usePostStore();

  const handleOnChange = (value: string) => {
    postStore.setContent(value);
  };

  return (
    <div className={styles.editor}>
      <Editor
        content=""
        editorRef={editorRef}
        onChange={handleOnChange}
      ></Editor>
    </div>
  );
}
