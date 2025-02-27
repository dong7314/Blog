import { Viewer } from "@toast-ui/react-editor";
import { useState, useEffect } from "react";
import * as styles from "./ToastUiViewer.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import { useAnchorNavigationStore } from "@/app/posts/detail/[id]/_store/anchorNavigation";

const codeSyntaxHighlight = require("@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js");

type Props = {
  content: string;
};

export default function ToastUiViewer({ content = "" }: Props) {
  const anchorNavigationStore = useAnchorNavigationStore();
  const [processedContent, setProcessedContent] = useState<string | null>(null);

  useEffect(() => {
    anchorNavigationStore.reset();
    setProcessedContent(content);
  }, [content]);

  const customHTMLRenderer = {
    heading(
      node: any,
      { entering, getChildrenText }: { entering: any; getChildrenText: any },
    ) {
      const tagName = `h${node.level}`;
      const id: string = getChildrenText(node).trim().replace(/\s+/g, "-");
      if (["h1", "h2", "h3"].includes(tagName)) {
        const name = getChildrenText(node);
        if (name) {
          anchorNavigationStore.addNavList({
            id,
            name,
            type: tagName as "h1" | "h2" | "h3",
          });
        }
      }
      if (entering) {
        return {
          type: "openTag",
          tagName,
          attributes: {
            id: id,
          },
        };
      }
      return { type: "closeTag", tagName };
    },
  };

  return (
    <div className={styles.viewer}>
      {processedContent !== null && (
        <Viewer
          initialValue={processedContent}
          plugins={[[codeSyntaxHighlight]]}
          customHTMLRenderer={customHTMLRenderer}
        />
      )}
    </div>
  );
}
