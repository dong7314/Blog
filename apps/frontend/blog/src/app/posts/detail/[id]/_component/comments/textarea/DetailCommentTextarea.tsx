"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useComment } from "../../../_hooks/useComment";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./DetailCommentTextarea.css";

import { Icon, Text, Textarea } from "@frontend/coreui";
import { Comment as IComment } from "@/app/_model/Comment.model";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  // 로컬 상태 관리
  const [content, setContent] = useState(
    type !== "edit" ? "" : comment?.content || "",
  );
  const [isSecret, setIsSecret] = useState(
    type !== "edit" ? false : comment?.isSecret || false,
  );
  const [buttonIsHover, setButtonIsHover] = useState(false);
  // 세션에서 accessToken 추출
  const accessToken = data?.user.accessToken;

  const resetContent = () => {
    setContent("");
  };

  // 커스텀 훅 사용
  const { create, update } = useComment({
    postId,
    commentId,
    parentId,
    closeEvent,
    accessToken,
    resetContent,
  });

  const handleAction = () => {
    // 로그인 되어 있을 때만 동작
    if (data?.user) {
      if (!content.trim()) {
        alert("댓글 내용을 입력해주세요.");
        return;
      }

      // 댓글 작성 또는 수정 요청
      if (type === "edit") {
        update.mutate({ content, isSecret });
      } else {
        create.mutate({ content, isSecret });
      }
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
      {!data?.user && (
        <div
          className={styles.commentTextareaCover}
          onClick={() => router.replace("/login")}
        />
      )}
    </div>
  );
}
