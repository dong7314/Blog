import { fetchData } from "@/app/_lib/restful";

type Props = { pageParam?: number };

export async function getPostsPopularityInfinite(
  pageParam = 0,
  period: string,
) {
  const res = await fetchData(
    "api.post/popular",
    ["posts", "dashboard", "popularity", period],
    {
      limit: 6,
      offset: pageParam,
      period: period,
    },
  );

  if (!res.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return res.data;
}
