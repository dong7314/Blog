"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import { TextButton } from "@frontend/coreui";
import useModalStore from "@/app/_store/modalStore";
import { useRouter } from "next/navigation";
import deletePost from "../../_lib/post/deletePost";

type Props = {
  postId: number;
};
export default function DeletePostTextButton({ postId }: Props) {
  const router = useRouter();
  const modalStore = useModalStore();

  const mutation = useMutation({
    mutationFn: () => deletePost(`${postId}`),
    onSuccess: () => {
      router.replace("/posts");
    },
    onError: (error: any) => {
      console.error("게시글 삭제 실패:", error);
    },
  });

  useEffect(() => {
    if (modalStore.id === postId && modalStore.modalAction === "active") {
      mutation.mutate();
    }
    modalStore.resetModalAction();
  }, [modalStore.modalAction]);

  return (
    <Link href={`/posts/detail/${postId}/delete`}>
      <TextButton size="s">삭제</TextButton>
    </Link>
  );
}
