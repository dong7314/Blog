"use server";

import { auth } from "@/auth";
import { modifyData } from "@/app/_lib/restful";

export default async function deletePost(postId: string) {
  const session = await auth();

  const res = await modifyData(
    `api.post/${postId}`,
    "delete",
    ["post", "delete"],
    undefined,
    session?.user.accessToken,
  );

  if (!res.ok) {
    throw new Error("게시글 삭제가 실패하였습니다.");
  }

  return { message: "게시글이 성공적으로 삭제되었습니다." };
}
