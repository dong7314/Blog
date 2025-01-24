"use server";

import { modifyData } from "@/app/_lib/restful";

export default async function createComment(
  postId: number,
  content: string,
  isSecret: boolean,
  commentId: number | null,
  token: string,
) {
  let body = {
    content,
    isSecret,
  };

  console.log(body);

  if (commentId) {
    (body as any).parentId = commentId;
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
