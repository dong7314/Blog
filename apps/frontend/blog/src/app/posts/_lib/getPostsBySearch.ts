import { fetchData } from "@/app/_lib/restful";

export async function getPostsBySearchInfinite(pageParam = 0, keyword: string) {
  const res = await fetchData(
    "api.post/search",
    ["posts", "dashboard", "search", keyword],
    {
      limit: 12,
      offset: pageParam,
      keyword,
    },
  );

  if (!res.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return res.data;
}
