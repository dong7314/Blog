"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { composeStyles } from "@vanilla-extract/css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as styles from "./DetailCommentTextarea.css";

import createComment from "../../../_lib/comment/createComment";
import { Comment as IComment } from "@/app/_model/Comment.model";
import { Icon, Text, Textarea } from "@frontend/coreui";
import updateComment from "../../../_lib/comment/updateComment";

type Props = {
  type: "comment" | "reply" | "edit";
  postId: number;
  commentId: number | null;
  comment?: IComment;
  parentId?: number;
  closeEvent?: Function;
};
export default function DetailCommentTextarea({
  type,
  postId,
  commentId,
  comment,
  parentId,
  closeEvent,
}: Props) {
  const { data } = useSession();
  const queryClient = useQueryClient();
  const [content, setContent] = useState(
    type !== "edit" ? "" : comment!.content,
  );
  const [isSecret, setIsSecret] = useState(
    type !== "edit" ? false : comment!.isSecret,
  );
  const [buttonIsHover, setButtonIsHover] = useState(false);

  const invalidateReplies = (id?: number | null) => {
    if (id) {
      queryClient.invalidateQueries({
        queryKey: ["comment", `${id}`, "replies"],
      });
    }
  };

  // Mutation 정의
  const create = useMutation({
    mutationFn: ({
      content,
      isSecret,
    }: {
      content: string;
      isSecret: boolean;
    }) =>
      createComment(
        postId,
        content,
        isSecret,
        commentId,
        data?.user.accessToken!,
      ),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["post", "detail", `${postId}`, "comments"],
        })
        .then(() => {
          setContent("");
        });

      invalidateReplies(commentId);
      invalidateReplies(parentId);
      if (closeEvent) closeEvent();
    },
    onError: (error: any) => {
      console.error("댓글 작성 실패:", error);
    },
  });

  // Mutation 정의
  const update = useMutation({
    mutationFn: ({
      content,
      isSecret,
    }: {
      content: string;
      isSecret: boolean;
    }) => updateComment(content, isSecret, commentId, data?.user.accessToken!),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["post", "detail", `${postId}`, "comments"],
        })
        .then(() => {
          setContent("");
        });

      invalidateReplies(commentId);
      invalidateReplies(parentId);
      if (closeEvent) closeEvent();
    },
    onError: (error: any) => {
      console.error("댓글 작성 실패:", error);
    },
  });

  const handleAction = () => {
    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    // 댓글 작성 요청
    if (type === "edit") {
      update.mutate({ content, isSecret });
    } else {
      create.mutate({ content, isSecret });
    }
  };

  return (
    <div className={composeStyles(styles.commentTextarea, styles[type])}>
      {data && <div className={styles.commentFilter} />}
      <Textarea
        name="comment-content"
        value={content}
        className={styles.textarea}
        resize="none"
        placeholder={
          type === "comment" ? "댓글을 입력해 주세요." : "답글을 입력해 주세요."
        }
        onChange={(value) => setContent(value)}
      />
      <div
        className={styles.first}
        onClick={() => setIsSecret((prev) => !prev)}
      >
        <Icon type={isSecret ? "lock" : "lock_open"} />
        <Text
          color={isSecret ? "#595959" : "#a5a5a5"}
          size="s"
          className={styles.firstButtonText}
        >
          비밀댓글
        </Text>
      </div>
      <div
        className={styles.second}
        onMouseOver={() => {
          setButtonIsHover(true);
        }}
        onMouseOut={() => {
          setButtonIsHover(false);
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAction();
          }}
          className={styles.form}
        >
          <button type="submit" className={styles.submitButton}>
            <Text color={buttonIsHover ? "#0066ff" : "#66A3FF"} size="s">
              {type === "edit" ? "수정" : "작성"}
            </Text>
          </button>
        </form>
      </div>
    </div>
  );
}
