"use server";

import { auth } from "@/auth";
import { fetchData } from "@/app/_lib/restful";
import { revalidateTag } from "next/cache";

export async function getComments(postId: number) {
  // comments 데이터 재 캐싱 진행..
  revalidateTag("comments");
  const session = await auth();

  const res = await fetchData(
    `api.comment/${postId}/comments`,
    ["post", "detail", `${postId}`, "comments"],
    {},
    session?.user.accessToken,
  );

  if (!res.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return res.data;
}
