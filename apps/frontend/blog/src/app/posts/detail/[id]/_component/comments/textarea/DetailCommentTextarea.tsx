"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { composeStyles } from "@vanilla-extract/css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as styles from "./DetailCommentTextarea.css";

import { Icon, Text, Textarea } from "@frontend/coreui";
import createComment from "../../../_lib/comment/createComment";

type Props = {
  type: "comment" | "reply";
  postId: number;
  parentId: number | null;
};
export default function DetailCommentTextarea({
  type,
  postId,
  parentId,
}: Props) {
  const { data } = useSession();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const [buttonIsHover, setButtonIsHover] = useState(false);

  // Mutation 정의
  const mutation = useMutation({
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
        parentId,
        data?.user.accessToken!,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", "detail", `${postId}`, "comments"],
      });
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
    mutation.mutate({ content, isSecret });
  };

  return (
    <div className={composeStyles(styles.commentTextarea, styles[type])}>
      {data && <div className={styles.commentFilter} />}
      <Textarea
        name="comment-content"
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
              작성
            </Text>
          </button>
        </form>
      </div>
    </div>
  );
}
