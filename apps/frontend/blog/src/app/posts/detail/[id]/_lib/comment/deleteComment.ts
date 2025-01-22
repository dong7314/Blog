"use server";

import { modifyData } from "@/app/_lib/restful";

export default async function deleteComment(commentId: string, token?: string) {
  const res = await modifyData(
    `api.comment/comments/${commentId}`,
    "delete",
    ["comment", "delete"],
    undefined,
    token,
  );

  if (!res.ok) {
    throw new Error("댓글 삭제가 실패하였습니다.");
  }

  return { message: "댓글이 성공적으로 삭제되었습니다." };
}
