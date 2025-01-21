"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import * as styles from "./DetailComment.css";

import { Comment as IComment } from "@/app/_model/Comment.model";
import { Button, Icon, Text, TextButton } from "@frontend/coreui";
import DetailCommentReplies from "../replies/DetailCommentReplies";
import DetailCommentTextarea from "../textarea/DetailCommentTextarea";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  postId: number;
  comment: IComment;
};

export default function DetailComment({ postId, comment }: Props) {
  const { data } = useSession();
  const [openReplyTextarea, setOpenReplyTextarea] = useState(false);
  const [openReplyComments, setOpenReplyComments] = useState(false);

  const convertDate = (date: Date) =>
    dayjs(date).isBefore(dayjs().subtract(1, "week"))
      ? dayjs(date).format("YYYY년 MM월 DD일")
      : dayjs(date).fromNow();

  const handleTextarea = () => setOpenReplyTextarea((prev) => !prev);
  const handleComments = () => setOpenReplyComments((prev) => !prev);

  return (
    <div className={styles.detailCommentContainer}>
      <div className={styles.header}>
        <div className={styles.author}>
          <Image
            src={"/profile.png"}
            alt={"profile-icon"}
            width={42}
            height={42}
            className={styles.profileIcon}
          />
          <div>
            <TextButton weight={500}>{comment.author.name}</TextButton>
            <Text size="s" color="#595959" className={styles.date}>
              {convertDate(comment.createdDate)}
            </Text>
          </div>
        </div>
        <div className={styles.functions}>
          <div className={styles.status}>
            {new Date(comment.createdDate).getTime() -
              new Date(comment.updatedDate).getTime() !==
              0 && (
              <Text color="#c9c9c9" size="xs">
                수정됨
              </Text>
            )}
            {comment.isSecret && (
              <div className={styles.lockIcon}>
                <Icon type="lock_color" />
              </div>
            )}
          </div>
          {comment.author.id.toString() === data?.user.id && (
            <div className={styles.authorFunctions}>
              <TextButton size="xs">수정</TextButton>
              <Text size="xs" className={styles.seperate}>
                |
              </Text>
              <TextButton size="xs">삭제</TextButton>
            </div>
          )}
        </div>
      </div>
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
        <div className={styles.button} onClick={handleComments}>
          {comment.replies.length !== 0 && (
            <>
              <span className={styles.arrowIcon}>
                <Icon
                  type={openReplyComments ? "minus" : "enter_arrow"}
                  color="#262626"
                  size="s"
                />
              </span>
              <Text size="s" weight={600} className={styles.textButton}>
                {openReplyComments
                  ? "숨기기"
                  : `${comment.replies.length}개의 답글 보기`}
              </Text>
            </>
          )}
        </div>
        <div className={styles.button} onClick={handleTextarea}>
          <Button size="s">
            {openReplyTextarea ? "작성 취소" : "답글 달기"}
          </Button>
        </div>
      </div>
      {openReplyTextarea && (
        <div className={styles.subFunctions}>
          <DetailCommentTextarea
            postId={postId}
            parentId={comment.id}
            type={"reply"}
          />
        </div>
      )}
      {openReplyComments && (
        <DetailCommentReplies postId={postId} commentId={comment.id} />
      )}
    </div>
  );
}
