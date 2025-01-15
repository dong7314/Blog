"use client";
import { useState } from "react";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./DetailCommentTextarea.css";

import { Text, Textarea } from "@frontend/coreui";

type Props = {
  type: "comment" | "reply";
};
export default function DetailCommentTextarea({ type }: Props) {
  const [buttonIsHover, setButtonIsHover] = useState(false);

  return (
    <div className={composeStyles(styles.commentTextarea, styles[type])}>
      <Textarea
        className={styles.textarea}
        resize="none"
        placeholder={
          type === "comment" ? "댓글을 입력해 주세요." : "답글을 입력해 주세요."
        }
      />
      <div
        className={styles.textButton}
        onMouseOver={() => {
          setButtonIsHover(true);
        }}
        onMouseOut={() => {
          setButtonIsHover(false);
        }}
      >
        <Text color={buttonIsHover ? "#0066ff" : "#66A3FF"} size="s">
          작성
        </Text>
      </div>
    </div>
  );
}
