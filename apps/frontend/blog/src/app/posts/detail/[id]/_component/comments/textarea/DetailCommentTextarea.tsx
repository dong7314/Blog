import * as styles from "./DetailCommentTextarea.css";

import { Button, Text, Textarea } from "@frontend/coreui";

export default function DetailCommentTextarea() {
  return (
    <div className={styles.commentTextarea}>
      <Textarea
        className={styles.textarea}
        resize="none"
        placeholder="댓글을 작성하세요."
      />
      <div className={styles.textButton}>
        <Button size="s" type="primary">
          댓글 작성
        </Button>
      </div>
    </div>
  );
}
