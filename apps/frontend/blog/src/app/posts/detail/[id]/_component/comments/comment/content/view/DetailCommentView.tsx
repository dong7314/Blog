"use client";
import { useSession } from "next-auth/react";

import * as styles from "./DetailCommentView.css";

import { Button, Icon, Text } from "@frontend/coreui";
import { Comment as IComment } from "@/app/_model/Comment.model";
import { Dispatch, SetStateAction } from "react";

type Props = {
  comment: IComment;
  commentsActive: boolean;
  textareaActive: boolean;
  handleComments: Function;
  handleTextarea: Function;
};
export default function DetailCommentView({
  comment,
  commentsActive,
  textareaActive,
  handleComments,
  handleTextarea,
}: Props) {
  const { data } = useSession();

  return (
    <>
      <div className={styles.content}>
        <Text
          color={
            `${comment.author.id}` === data?.user.id || !comment.isSecret
              ? "#262626"
              : "#a5a5a5"
          }
        >
          {comment.content}
        </Text>
      </div>
      <div className={styles.addButton}>
        <div className={styles.button} onClick={() => handleComments()}>
          {comment.replies.length !== 0 && (
            <>
              <span className={styles.arrowIcon}>
                <Icon
                  type={commentsActive ? "minus" : "enter_arrow"}
                  color="#262626"
                  size="s"
                />
              </span>
              <Text size="s" weight={600} className={styles.textButton}>
                {commentsActive
                  ? "숨기기"
                  : `${comment.replies.length}개의 답글 보기`}
              </Text>
            </>
          )}
        </div>
        <div className={styles.button} onClick={() => handleTextarea()}>
          <Button size="s">{textareaActive ? "작성 취소" : "답글 달기"}</Button>
        </div>
      </div>
    </>
  );
}
