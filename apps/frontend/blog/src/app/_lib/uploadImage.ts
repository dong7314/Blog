"use server";

import { auth } from "@/auth";

export default async function uploadImage(file: File) {
  const session = await auth();
  const accessToken = session?.user.accessToken;

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api.image/upload`,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  );

  if (!res.ok) {
    throw new Error("이미지 업로드가 실패하였습니다.");
  }

  return res.json();
}
