"use server";

import { modifyData } from "@/app/_lib/restful";

export default async (postId: number, token: string) => {
  const res = await modifyData(
    `api.like/${postId}`,
    "post",
    ["post", "detail", `${postId}`, "like"],
    undefined,
    token,
  );

  if (!res.ok) {
    throw new Error("좋아요 토글 요청이 실패하였습니다.");
  }

  return res.json();
};
