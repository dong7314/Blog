"use server";

import { auth } from "@/auth";
import { fetchData } from "@/app/_lib/restful";

export default async function getSeries() {
  const session = await auth();

  const response = await fetchData(
    `api.series/author/${session?.user.id}`,
    ["series", "author", `${session?.user.id}`],
    {},
    session?.user.accessToken,
  );

  if (!response.ok) {
    throw new Error("시리즈를 가져오는데 실패하였습니다.");
  }

  return await response.json();
}