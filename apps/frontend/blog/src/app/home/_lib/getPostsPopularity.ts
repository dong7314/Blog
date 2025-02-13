"use server";

import { fetchData } from "@/app/_lib/restful";

export async function getPostsPopularity() {
  const res = await fetchData("api.post/popular", ["posts", "popularity"], {
    limit: 10,
    offset: 0,
    period: "year",
  });

  if (!res.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return res.data;
}
