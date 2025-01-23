"use client";

import * as styles from "./DetailCommentEdit.css";

import { Comment as IComment } from "@/app/_model/Comment.model";
import DetailCommentTextarea from "../../../textarea/DetailCommentTextarea";

type Props = {
  postId: number;
  comment: IComment;
  parentId?: number;
  closeEvent: Function;
};
export default function DetailCommentEdit({
  postId,
  comment,
  parentId,
  closeEvent,
}: Props) {
  return (
    <div className={styles.edit}>
      <DetailCommentTextarea
        type="edit"
        postId={postId}
        comment={comment}
        parentId={parentId}
        commentId={comment.id}
        closeEvent={closeEvent}
      />
    </div>
  );
}
