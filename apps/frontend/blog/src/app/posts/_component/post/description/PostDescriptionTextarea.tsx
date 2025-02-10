"use client";

import { Textarea } from "@frontend/coreui";
import { usePostStore } from "../../../_store/postStore";
import { useEffect } from "react";

type Props = {
  description?: string;
};
export default function PostDescriptionTextarea({ description }: Props) {
  const postStore = usePostStore();

  const handleOnChange = (value: string) => {
    postStore.setDescription(value);
  };

  useEffect(() => {
    if (description) {
      postStore.setDescription(description);
    }
  }, [description]);

  return (
    <Textarea
      label="게시글 설명"
      resize="none"
      maxLength={150}
      placeholder="게시될 포스트의 설명을 작성해 주세요."
      value={description ?? ""}
      onChange={handleOnChange}
    />
  );
}
