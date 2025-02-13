"use server";

import { auth } from "@/auth";
import { modifyData } from "@/app/_lib/restful";

export default async function createPost(
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
    `api.post/`,
    "post",
    ["post", "create"],
    body,
    session?.user.accessToken,
  );

  if (!res.ok) {
    throw new Error("포스트 생성이 실패하였습니다.");
  }

  return res.data;
}
