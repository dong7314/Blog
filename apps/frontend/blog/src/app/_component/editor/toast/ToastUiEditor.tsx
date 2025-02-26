"use client";

import { useEffect } from "react";

import * as styles from "./ToastUiEditor.css";

import { Editor } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
const codeSyntaxHighlight = require("@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js");

import uploadImage from "@/app/_lib/image/uploadImage";
import compressImage from "@/app/_lib/image/compressImage";

type Props = {
  content: string;
  editorRef: React.MutableRefObject<any>;
  onChange?: (value: string) => void;
};

export default function ToastUiEditor({ content, editorRef, onChange }: Props) {
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["code"],
    ["image"],
    ["link", "table"],
    ["scrollSync"],
  ];

  const handleChange = () => {
    const editorInstance = editorRef.current.getInstance();

    if (onChange) {
      onChange(editorInstance.getMarkdown());
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (!content && editorRef.current) {
        const instance = editorRef.current.getInstance(); // 인스턴스 가져오기
        instance.setMarkdown("");
      }
    }, 10);
  }, [content]);

  useEffect(() => {
    if (editorRef) {
      editorRef.current.getInstance().removeHook("addImageBlobHook");
      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", async (file: File, callback: any) => {
          // file 크기 10mb 넘을 시 converting 작업
          let converFile = file;
          if (file.size > 10 * 1024 * 1024) {
            converFile = await compressImage(file);
          }
          const res = await uploadImage(file);
          // 에디터에 url과 파일 이름을 이용한 마크다운 이미지 문법 작성 콜백 함수
          callback(res.url, file.name);
          return false;
        });
    }
  }, [editorRef]);

  return (
    <div className={styles.editor}>
      <Editor
        ref={editorRef}
        initialValue={content || " "} // 글 수정 시 사용
        initialEditType="markdown"
        previewStyle="tab"
        placeholder="게시글을 작성해 주세요."
        height="100%"
        theme={""} // '' & 'dark'
        toolbarItems={toolbarItems}
        useCommandShortcut={true}
        hideModeSwitch={true}
        language="ko-KR"
        plugins={[colorSyntax, [codeSyntaxHighlight]]}
        options={{
          headingAnchor: true, // 제목에 자동으로 id를 추가하여 앵커 링크 기능 활성화
        }}
        onChange={handleChange}
      />
    </div>
  );
}
