"use server";

import { fetchData } from "@/app/_lib/restful";

export async function getPostsRecently() {
  const res = await fetchData("api.post/recent", ["posts", "recently"], {
    limit: 10,
    offset: 0,
  });

  if (!res.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return res.data;
}
