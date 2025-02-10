"use client";

import { Input } from "@frontend/coreui";
import { usePostStore } from "../../../_store/postStore";
import { useEffect } from "react";

type Props = {
  title?: string;
};
export default function PostTitleInput({ title }: Props) {
  const postStore = usePostStore();

  const handleOnChange = (value: string) => {
    postStore.setTitle(value);
  };

  useEffect(() => {
    if (title) {
      postStore.setTitle(title);
    }
  }, [title]);

  return (
    <Input
      label="제목"
      placeholder="게시될 포스트의 제목을 입력해 주세요."
      value={title ?? ""}
      onChange={handleOnChange}
    />
  );
}
