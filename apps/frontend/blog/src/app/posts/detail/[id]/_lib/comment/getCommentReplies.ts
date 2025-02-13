"use server";

import { auth } from "@/auth";
import { fetchData } from "@/app/_lib/restful";
import { revalidateTag } from "next/cache";

export async function getCommentReplies(commentId: number) {
  revalidateTag("replies");
  const session = await auth();

  const res = await fetchData(
    `api.comment/${commentId}/replies`,
    ["comment", `${commentId}`, "replies"],
    {},
    session?.user.accessToken,
  );

  if (!res.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return res.data;
}
