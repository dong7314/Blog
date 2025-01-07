import * as styles from "./DetailViewer.css";

import Viewer from "@/app/_component/editor/Viewer";

type Props = {
  content: string;
};

export default function DetailViewer({ content }: Props) {
  return (
    <div className={styles.viewer}>
      <Viewer content={content} />
    </div>
  );
}
