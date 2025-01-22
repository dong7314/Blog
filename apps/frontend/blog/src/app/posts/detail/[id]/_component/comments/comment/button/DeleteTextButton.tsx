"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TextButton } from "@frontend/coreui";
import useModalStore from "@/app/_store/modalStore";
import deleteComment from "../../../../_lib/comment/deleteComment";

type Props = {
  postId: number;
  parentId?: number;
  commentId: number;
  grandParentId?: number;
};
export default function DeleteTextButton({
  postId,
  parentId,
  commentId,
  grandParentId,
}: Props) {
  const { data } = useSession();
  const modalStore = useModalStore();
  const queryClient = useQueryClient();

  const invalidateReplies = (id?: number | null) => {
    if (id) {
      queryClient.invalidateQueries({
        queryKey: ["comment", `${id}`, "replies"],
      });
    }
  };

  const mutation = useMutation({
    mutationFn: () => deleteComment(`${commentId}`, data?.user.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", "detail", `${postId}`, "comments"],
      });
      invalidateReplies(parentId);
      invalidateReplies(grandParentId);
    },
    onError: (error: any) => {
      console.error("댓글 삭제 실패:", error);
    },
  });

  useEffect(() => {
    if (modalStore.id === commentId && modalStore.modalAction === "active") {
      mutation.mutate();
    }
    modalStore.resetModalAction();
  }, [modalStore.modalAction]);

  return (
    <Link href={`/posts/detail/${postId}/confirm/${commentId}`}>
      <TextButton size="xs">삭제</TextButton>
    </Link>
  );
}
