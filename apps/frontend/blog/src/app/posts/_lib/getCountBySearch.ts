import { fetchData } from "@/app/_lib/restful";

export async function getCountBySearch(keyword: string) {
  const res = await fetchData(
    "api.post/search/count",
    ["posts", "dashboard", "search", "count", keyword],
    { keyword },
  );

  if (!res.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return res.data;
}
