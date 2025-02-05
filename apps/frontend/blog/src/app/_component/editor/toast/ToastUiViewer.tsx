import { Viewer } from "@toast-ui/react-editor";

import * as styles from "./ToastUiViewer.css";

import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { useAnchorNavigationStore } from "@/app/posts/detail/[id]/_store/anchorNavigation";

type Props = {
  content: string;
};

export default function ToastUiViewer({ content = "" }: Props) {
  const anchorNavigationStore = useAnchorNavigationStore();

  const customHTMLRenderer = {
    heading(
      node: any,
      { entering, getChildrenText }: { entering: any; getChildrenText: any },
    ) {
      const tagName = `h${node.level}`;

      // 제목 텍스트를 가져와 공백을 -로 변환하여 id로 사용
      const id: string = getChildrenText(node).trim().replace(/\s+/g, "-");
      if (["h1", "h2", "h3"].includes(tagName)) {
        const name = getChildrenText(node);
        if (name) {
          anchorNavigationStore.addNavList({
            id,
            name: getChildrenText(node),
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
      {content && (
        <Viewer
          initialValue={content || ""}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          customHTMLRenderer={customHTMLRenderer}
        />
      )}
    </div>
  );
}
