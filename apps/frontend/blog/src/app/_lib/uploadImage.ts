"use server";

import { auth } from "@/auth";
import { modifyData } from "@/app/_lib/restful";

export default async function uploadImage(file: File) {
  const session = await auth();

  const formData = new FormData();
  formData.append("file", file);

  const res = await modifyData(
    `api.image/upload`,
    "post",
    ["image", "upload"],
    formData,
    session?.user.accessToken,
  );

  if (!res.ok) {
    throw new Error("이미지 업로드가 실패하였습니다.");
  }

  return res.json();
}
