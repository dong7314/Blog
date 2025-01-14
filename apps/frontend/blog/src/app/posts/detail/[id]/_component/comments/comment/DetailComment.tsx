"use client";
import { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import * as styles from "./DetailComment.css";

import { Comment } from "@/app/_model/Comment.model";
import { Button, Icon, Text, TextButton } from "@frontend/coreui";
import DetailCommentTextarea from "../textarea/DetailCommentTextarea";
import { composeStyles } from "@vanilla-extract/css";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  comment: Comment;
};
export default function DetailComment({ comment }: Props) {
  const [openReplyTextarea, setOpenReplyTextarea] = useState(false);
  const [openReplyComments, setOpenReplyComments] = useState(false);
  const data = {
    comments: [
      {
        id: 7,
        content: "비밀 댓글입니다.",
        isSecret: true,
        author: {
          id: 1,
          name: "admin",
          description: "",
          email: "eaea7314@naver.com",
          thumbnail: "",
        },
        replies: [],
        createdDate: new Date("2025-01-10T06:42:51.930Z"),
        updatedDate: new Date("2025-01-10T06:42:51.930Z"),
      },
      {
        id: 5,
        content: "좋은 글의 대댓글2 입니다.",
        isSecret: false,
        author: {
          id: 1,
          name: "admin",
          description: "",
          email: "eaea7314@naver.com",
          thumbnail: "",
        },
        replies: [
          {
            id: 6,
            content: "좋은 글의 대댓글의 대댓글 입니다.",
            isSecret: false,
            author: {
              id: 1,
              name: "admin",
              description: "",
              email: "eaea7314@naver.com",
              thumbnail: "",
            },
            createdDate: new Date("2025-01-10T06:40:00.092Z"),
            updatedDate: new Date("2025-01-10T06:40:00.092Z"),
          },
        ],
        createdDate: new Date("2025-01-10T06:11:01.707Z"),
        updatedDate: new Date("2025-01-10T06:11:01.707Z"),
      },
    ],
    count: 2,
  };

  const convertDate = (date: Date) => {
    const givenDate = dayjs(date);
    // 1주일 전 기준
    const oneWeekAgo = dayjs().subtract(1, "week");

    if (givenDate.isBefore(oneWeekAgo)) {
      // 1주일을 넘은 경우 날짜 형식으로 반환
      return givenDate.format("YYYY년 MM월 DD일");
    } else {
      // 1주일 이내인 경우 상대 시간 반환
      return givenDate.fromNow();
    }
  };

  const handleTextarea = () => {
    setOpenReplyTextarea((prev) => {
      return !prev;
    });
  };

  const handleComments = () => {
    setOpenReplyComments((prev) => {
      return !prev;
    });
  };

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
          {comment.createdDate.getTime() - comment.updatedDate.getTime() !==
            0 && (
            <Text color="#c9c9c9" size="xs">
              수정됨
            </Text>
          )}
          {comment.isSecret && (
            <div className={styles.lockIcon}>
              <Icon type="lock" />
            </div>
          )}
        </div>
      </div>
      <div className={styles.content}>
        <Text>{comment.content}</Text>
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
          <Button size="s">답글 달기</Button>
        </div>
      </div>
      {openReplyTextarea && (
        <div className={styles.subFunctions}>
          <DetailCommentTextarea type={"reply"} />
        </div>
      )}
      {openReplyComments && (
        <div
          className={composeStyles(styles.subFunctions, styles.commentReplies)}
        >
          {data.comments.map((comment) => {
            return (
              <DetailComment
                key={`reply-comment-id-${comment.id}`}
                comment={comment as Comment}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
