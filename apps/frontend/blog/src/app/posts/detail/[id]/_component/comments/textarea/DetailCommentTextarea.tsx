import { composeStyles } from "@vanilla-extract/css";
import * as styles from "./DetailCommentTextarea.css";

import { Button, Text, Textarea } from "@frontend/coreui";

type Props = {
  type: "comment" | "reply";
};
export default function DetailCommentTextarea({ type }: Props) {
  return (
    <div className={composeStyles(styles.commentTextarea, styles[type])}>
      <Textarea
        className={styles.textarea}
        resize="none"
        placeholder={
          type === "comment" ? "댓글을 입력해 주세요." : "답글을 입력해 주세요."
        }
      />
      <div className={styles.textButton}>
        <Button size="m" type="primary">
          작성
        </Button>
      </div>
    </div>
  );
}
