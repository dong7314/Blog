"use server";

import { fetchData } from "@/app/_lib/restful";
import { revalidateTag } from "next/cache";

export async function getCommentReplies(commentId: number) {
  revalidateTag("replies");

  const response = await fetchData(`api.comment/${commentId}/replies`, [
    "comment",
    `${commentId}`,
    "replies",
  ]);

  console.log(response);

  if (!response.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return await response.json();
}
