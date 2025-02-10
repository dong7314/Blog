"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import * as styles from "./UpdatePostButton.css";

import { Button } from "@frontend/coreui";
import updatePost from "@/app/posts/update/_lib/updatePost";
import usePostStore from "@/app/posts/_store/postStore";

type Props = {
  id: number;
};
export default function UpdatePostButton({ id }: Props) {
  const router = useRouter();
  const postStore = usePostStore();

  const mutation = useMutation({
    mutationFn: () =>
      updatePost(
        id,
        postStore.title,
        postStore.description,
        postStore.content,
        postStore.tags,
        postStore.imgUrl,
        postStore.seriesId,
      ),
    onSuccess: (response) => {
      postStore.reset();
      router.push(`/posts/detail/${response.id}`);
    },
    onError: (error: any) => {
      console.error("포스트 수정 실패:", error);
    },
  });

  const handleUpdatePost = () => {
    if (postStore.title.trim() === "") {
      alert("포스트 타이틀은 필수적으로 입력하셔야 합니다.");
      return;
    }
    if (postStore.content.trim() === "") {
      alert("포스트 내용을 작성해 주세요.");
      return;
    }

    mutation.mutate();
  };

  return (
    <Button
      className={styles.buttonMargin}
      type="primary"
      onClick={handleUpdatePost}
    >
      수정하기
    </Button>
  );
}
