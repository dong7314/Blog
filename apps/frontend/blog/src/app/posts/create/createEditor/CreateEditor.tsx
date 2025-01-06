"use client";

import { useRef } from "react";

import * as styles from "./CreateEditor.css";

import Editor from "@/app/_component/editor/Editor";

export default function CreateEditor() {
  const editorRef = useRef(null);

  return (
    <div className={styles.editor}>
      <Editor content="" editorRef={editorRef}></Editor>
    </div>
  );
}
