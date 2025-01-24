"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import * as styles from "./CreatePostButton.css";

import { Button } from "@frontend/coreui";
import createPost from "@/app/posts/create/_lib/createPost";
import usePostStore from "@/app/posts/create/_store/postStore";

export default function CreatPostButton() {
  const router = useRouter();
  const postStore = usePostStore();

  const mutation = useMutation({
    mutationFn: () =>
      createPost(
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
      console.error("포스트트 생성 실패:", error);
    },
  });

  const handleCreatePost = () => {
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
      onClick={handleCreatePost}
      type="primary"
    >
      출간 하기
    </Button>
  );
}
