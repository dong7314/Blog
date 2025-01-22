"use client";

import { Input } from "@frontend/coreui";
import { usePostStore } from "../../_store/postStore";

export default function CreateTitleInput() {
  const postStore = usePostStore();

  const handleOnChange = (value: string) => {
    postStore.setTitle(value);
  };

  return (
    <Input
      label="제목"
      placeholder="게시될 포스트의 제목을 입력해 주세요."
      onChange={handleOnChange}
    />
  );
}
