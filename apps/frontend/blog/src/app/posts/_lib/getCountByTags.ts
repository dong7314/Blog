import { fetchData } from "@/app/_lib/restful";

export async function getCountByTags(tags: string) {
  const res = await fetchData(
    "api.post/by-tags/count",
    ["posts", "dashboard", "tags", "count", tags],
    { tags },
  );

  if (!res.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return res.data;
}
