import { fetchData } from "@/app/_lib/restful";

type Props = { pageParam?: number };

export async function getPostsFeedInfinite(pageParam = 0, token: string) {
  const response = await fetchData(
    "api.post/followed",
    ["posts", "followed"],
    {
      limit: 6,
      offset: pageParam,
    },
    token,
  );

  if (!response.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return await response.json();
}
