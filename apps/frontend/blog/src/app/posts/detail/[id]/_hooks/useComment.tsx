import { useMutation, useQueryClient } from "@tanstack/react-query";

import createComment from "../_lib/comment/createComment";
import updateComment from "../_lib/comment/updateComment";

export const useComment = ({
  postId,
  commentId,
  parentId,
  closeEvent,
  accessToken,
  resetContent,
}: {
  postId: number;
  commentId: number | null;
  parentId?: number;
  closeEvent?: Function;
  accessToken: string | undefined;
  resetContent: Function;
}) => {
  const queryClient = useQueryClient();

  const invalidateReplies = (id?: number | null) => {
    if (id) {
      queryClient.invalidateQueries({
        queryKey: ["comment", `${id}`, "replies"],
      });
    }
  };

  const create = useMutation({
    mutationFn: ({
      content,
      isSecret,
    }: {
      content: string;
      isSecret: boolean;
    }) => createComment(postId, content, isSecret, commentId, accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", "detail", `${postId}`, "comments"],
      });
      resetContent();
      invalidateReplies(commentId);
      invalidateReplies(parentId);
      if (closeEvent) closeEvent();
    },
    onError: (error: any) => {
      console.error("댓글 작성 실패:", error);
    },
  });

  const update = useMutation({
    mutationFn: ({
      content,
      isSecret,
    }: {
      content: string;
      isSecret: boolean;
    }) => updateComment(content, isSecret, commentId, accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", "detail", `${postId}`, "comments"],
      });
      resetContent();
      invalidateReplies(commentId);
      invalidateReplies(parentId);
      if (closeEvent) closeEvent();
    },
    onError: (error: any) => {
      console.error("댓글 수정 실패:", error);
    },
  });

  return { create, update };
};
