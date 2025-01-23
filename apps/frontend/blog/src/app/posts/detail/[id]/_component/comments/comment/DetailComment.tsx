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
import DeleteTextButton from "./button/DeleteTextButton";
import DetailCommentReplies from "../replies/DetailCommentReplies";
import DetailCommentTextarea from "../textarea/DetailCommentTextarea";
import DetailCommentView from "./content/view/DetailCommentView";
import DetailCommentEdit from "./content/edit/DetailCommentEdit";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  postId: number;
  comment: IComment;
  parentId?: number;
  grandParentId?: number;
};

export default function DetailComment({
  postId,
  comment,
  parentId,
  grandParentId,
}: Props) {
  const { data } = useSession();
  const [isEditMode, setIsEditMode] = useState(false);
  const [openReplyTextarea, setOpenReplyTextarea] = useState(false);
  const [openReplyComments, setOpenReplyComments] = useState(false);

  const convertDate = (date: Date) =>
    dayjs(date).isBefore(dayjs().subtract(1, "week"))
      ? dayjs(date).format("YYYY년 MM월 DD일")
      : dayjs(date).fromNow();

  const handleComments = () => setOpenReplyComments((prev) => !prev);
  const handleTextarea = () => setOpenReplyTextarea((prev) => !prev);
  const handleCloseEdit = () => setIsEditMode(false);
  const handleCloseTextarea = () => setOpenReplyTextarea(false);

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
              {!isEditMode ? (
                <>
                  <TextButton size="xs" onClick={() => setIsEditMode(true)}>
                    수정
                  </TextButton>
                  <Text size="xs" className={styles.seperate}>
                    |
                  </Text>
                  <DeleteTextButton
                    postId={postId}
                    parentId={parentId}
                    commentId={comment.id}
                    grandParentId={grandParentId}
                  />
                </>
              ) : (
                <TextButton
                  color="red"
                  size="xs"
                  onClick={() => setIsEditMode(false)}
                >
                  취소
                </TextButton>
              )}
            </div>
          )}
        </div>
      </div>
      {!isEditMode ? (
        <DetailCommentView
          comment={comment}
          textareaActive={openReplyTextarea}
          commentsActive={openReplyComments}
          handleComments={handleComments}
          handleTextarea={handleTextarea}
        />
      ) : (
        <DetailCommentEdit
          postId={postId}
          comment={comment}
          parentId={parentId}
          closeEvent={handleCloseEdit}
        />
      )}
      {openReplyTextarea && (
        <div className={styles.subFunctions}>
          <DetailCommentTextarea
            postId={postId}
            parentId={parentId}
            commentId={comment.id}
            closeEvent={handleCloseTextarea}
            type={"reply"}
          />
        </div>
      )}
      {openReplyComments && (
        <DetailCommentReplies
          postId={postId}
          parentId={parentId}
          commentId={comment.id}
        />
      )}
    </div>
  );
}
