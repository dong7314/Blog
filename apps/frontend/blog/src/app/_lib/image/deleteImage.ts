"use server";

import { auth } from "@/auth";

export default async function deleteImage(imageName: string) {
  const session = await auth();
  const accessToken = session?.user.accessToken;

  const res = await fetch(
    `${process.env.NEXT_BASE_URL}/api.image/${imageName}`,
    {
      method: "delete",
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  );

  if (!res.ok) {
    throw new Error("이미지 삭제에 실패하였습니다.");
  }

  return await res.json();
}
