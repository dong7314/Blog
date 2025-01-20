"use server";

import { post } from "@/app/_lib/restful";

export default async (postId: number, token: string) => {
  const res = await post(
    `api.like/${postId}`,
    ["post", "detail", `${postId}`, "like"],
    undefined,
    token,
  );

  if (!res.ok) {
    throw new Error("좋아요 토글 요청이 실패하였습니다.");
  }

  return res.json();
};
