import get from "@/app/_lib/restful";

type Props = { pageParam?: number };
export async function getPostsPopularity() {
  const response = await get("api.post/popular", ["posts", "popularity"], {
    limit: 10,
    offset: 0,
    period: "month",
  });

  if (!response.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return await response.json();
}

export async function getPostsPopularityInfinite(
  pageParam = 0,
  period: string,
) {
  const response = await get(
    "api.post/popular",
    ["posts", "dashboard", "popularity"],
    {
      limit: 6,
      offset: pageParam,
      period: period,
    },
  );

  if (!response.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return await response.json();
}
