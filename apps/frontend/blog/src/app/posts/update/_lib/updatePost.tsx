"use server";

import { auth } from "@/auth";
import { modifyData } from "@/app/_lib/restful";

export default async function updatePost(
  postId: number,
  title: string,
  description: string,
  content: string,
  tags: string[],
  thumbnail: string,
  seriesId: number | null,
) {
  const session = await auth();

  let body = {
    title,
    description,
    content,
    tags,
    thumbnail,
  };

  if (seriesId) {
    (body as any)["seriesId"] = seriesId;
  }

  const res = await modifyData(
    `api.post/${postId}`,
    "put",
    ["post", "update", `${postId}`],
    body,
    session?.user.accessToken,
  );

  if (!res.ok) {
    throw new Error("포스트 수정이 실패하였습니다.");
  }

  return res.data;
}
