import { fetchData } from "@/app/_lib/restful";

type Props = { pageParam?: number };

export async function getPostsRecentlyInfinite({ pageParam = 0 }: Props) {
  const response = await fetchData("api.post/recent", ["posts", "recently"], {
    limit: 6,
    offset: pageParam,
  });

  if (!response.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return await response.json();
}
