import Image from "next/image";

import * as styles from "./DetailViewer.css";

import Viewer from "@/app/_component/editor/Viewer";

type Props = {
  imgUrl: string;
  content: string;
};

export default function DetailViewer({ content, imgUrl }: Props) {
  return (
    <div className={styles.viewer}>
      <Image
        width={800}
        height={0}
        src={imgUrl}
        alt={imgUrl}
        style={{
          height: "auto",
          width: "100%",
          borderRadius: "6px",
          marginBottom: "32px",
        }}
      />
      <Viewer content={content} />
    </div>
  );
}
