"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import * as styles from "./DetailComments.css";

import { Text } from "@frontend/coreui";
import { getComments } from "../../_lib/comment/getComments";
import { Comment as IComment } from "@/app/_model/Comment.model";
import { Comments as IComments } from "@/app/_model/Comments.model";
import DetailComment from "./comment/DetailComment";
import DetailCommentTextarea from "./textarea/DetailCommentTextarea";

type Props = {
  postId: number;
};
export default function DetailComments({ postId }: Props) {
  const [commentsData, setCommentsData] = useState<IComments>({
    count: 0,
    comments: [],
  });
  // React Query를 사용하여 데이터 가져오기
  const { data } = useQuery<IComments>({
    queryKey: ["post", "detail", `${postId}`, "comments"],
    queryFn: () => getComments(postId),
    subscribed: true,
  });

  useEffect(() => {
    if (data) {
      setCommentsData(data);
    }
  }, [data]);

  return (
    <>
      <Text size="xl" weight={500} className={styles.detailCommentsCount}>
        {commentsData.count}개의 댓글
      </Text>
      <DetailCommentTextarea
        postId={postId}
        commentId={null}
        type={"comment"}
      />
      {commentsData.comments.map((comment: IComment) => {
        return (
          <DetailComment
            key={`comment-id-${comment.id}`}
            postId={postId}
            comment={comment}
          />
        );
      })}
    </>
  );
}
