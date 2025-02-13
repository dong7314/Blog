"use server";

import { modifyData } from "@/app/_lib/restful";

export default async function updateComment(
  content: string,
  isSecret: boolean,
  commentId: number | null,
  token: string,
) {
  let body = {
    content,
    isSecret,
  };

  if (commentId) {
    (body as any).parentId = commentId;
  }

  const res = await modifyData(
    `api.comment/comments/${commentId}`,
    "put",
    ["comment", "update", `${commentId}`],
    body,
    token,
  );

  if (!res.ok) {
    throw new Error("댓글 수정정이 실패하였습니다.");
  }

  return res.data;
}
