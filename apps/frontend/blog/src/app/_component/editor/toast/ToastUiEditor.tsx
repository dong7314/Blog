"use client";

import * as styles from "./ToastUiEditor.css";

import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import Prism from "prismjs";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { Editor } from "@toast-ui/react-editor";

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
      console.log(editorInstance.getMarkdown());
      onChange(editorInstance.getMarkdown());
    }
  };

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
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        options={{
          headingAnchor: true, // 제목에 자동으로 id를 추가하여 앵커 링크 기능 활성화
        }}
        onChange={handleChange}
      />
    </div>
  );
}
