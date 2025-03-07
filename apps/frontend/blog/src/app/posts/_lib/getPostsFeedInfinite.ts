import { fetchData } from "@/app/_lib/restful";

type Props = { pageParam?: number };

export async function getPostsFeedInfinite(pageParam = 0, token: string) {
  const res = await fetchData(
    "api.post/followed",
    ["posts", "dashboard", "followed"],
    {
      limit: 6,
      offset: pageParam,
    },
    token,
  );

  if (!res.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return res.data;
}
