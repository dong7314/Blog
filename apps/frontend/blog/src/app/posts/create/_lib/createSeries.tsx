"use server";

import { modifyData } from "@/app/_lib/restful";
import { auth } from "@/auth";

export default async function createSeries(title: string, description: string) {
  const session = await auth();

  let body = {
    title,
    description,
  };

  const res = await modifyData(
    `api.series/`,
    "post",
    ["series", "create"],
    body,
    session?.user.accessToken,
  );

  if (!res.ok) {
    throw new Error("시리즈 생성이 실패하였습니다.");
  }

  return res.json();
}
