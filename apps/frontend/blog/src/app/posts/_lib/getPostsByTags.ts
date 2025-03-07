import { fetchData } from "@/app/_lib/restful";

export async function getPostsByTagsInfinite(pageParam = 0, tags: string) {
  const res = await fetchData(
    "api.post/by-tags",
    ["posts", "dashboard", "tags", tags],
    {
      limit: 12,
      offset: pageParam,
      tags,
    },
  );

  if (!res.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return res.data;
}
