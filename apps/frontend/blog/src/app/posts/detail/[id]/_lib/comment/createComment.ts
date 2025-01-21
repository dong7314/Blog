"use server";

import { modifyData } from "@/app/_lib/restful";

export default async function createComment(
  postId: number,
  content: string,
  isSecret: boolean,
  parentId: number | null,
  token: string,
) {
  let body = {
    content,
    isSecret,
  };

  if (parentId) {
    (body as any).parentId = parentId;
  }

  const res = await modifyData(
    `api.comment/${postId}/comments`,
    "post",
    ["comment", "create"],
    body,
    token,
  );

  if (!res.ok) {
    throw new Error("댓글 생성이 실패하였습니다.");
  }

  return res.json();
}
