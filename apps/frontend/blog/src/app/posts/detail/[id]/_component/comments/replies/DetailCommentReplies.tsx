"use client";
import { useQuery } from "@tanstack/react-query";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./DetailCommentReplies.css";

import DetailComment from "../comment/DetailComment";
import { Loading, Text } from "@frontend/coreui";
import { getCommentReplies } from "@/app/posts/detail/[id]/_lib/comment/getCommentReplies";
import { Comment as IComment } from "@/app/_model/Comment.model";

type Props = {
  postId: number;
  commentId: number;
};

const ReplyStatus = ({
  message,
  color = "#595959",
  loading = false,
}: {
  message: string;
  color?: string;
  loading?: boolean;
}) => (
  <div
    className={composeStyles(
      styles.subFunctions,
      styles.commentReplies,
      styles.message,
    )}
  >
    <Loading size="s" />
    <Text
      size="s"
      color={color}
      className={composeStyles(
        styles.repliesMessage,
        loading ? styles.loading : "",
      )}
    >
      {message}
    </Text>
  </div>
);

export default function DetailCommentReplies({ postId, commentId }: Props) {
  const {
    data: replies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comment", commentId, "replies"],
    queryFn: () => getCommentReplies(commentId),
    enabled: true, // 자동으로 데이터 가져오기
  });

  if (isLoading) {
    return <ReplyStatus message="댓글을 불러오는 중입니다." loading={true} />;
  }

  if (error) {
    return (
      <ReplyStatus
        message="댓글 데이터를 불러오는데 실패했습니다."
        color="red"
      />
    );
  }

  if (!replies || replies.comments.length === 0) {
    return <ReplyStatus message="답글이 없습니다." />;
  }

  return (
    <div className={composeStyles(styles.subFunctions, styles.commentReplies)}>
      {replies.comments.map((reply: IComment) => (
        <DetailComment
          key={`reply-comment-id-${reply.id}`}
          postId={postId}
          comment={reply}
        />
      ))}
    </div>
  );
}
