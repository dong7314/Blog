import { fetchData } from "@/app/_lib/restful";

export async function getPostsPopularity() {
  const response = await fetchData("api.post/popular", ["posts", "popularity"], {
    limit: 10,
    offset: 0,
    period: "month",
  });

  if (!response.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return await response.json();
}
