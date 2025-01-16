import get from "@/app/_lib/restful";

type Props = { pageParam?: number };
export async function getPostsRecently() {
  const response = await get("api.post/recent", ["posts", "recently"], {
    limit: 10,
    offset: 0,
  });

  if (!response.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return await response.json();
}

export async function getPostsRecentlyInfinite({ pageParam = 0 }: Props) {
  const response = await get("api.post/recent", ["posts", "recently"], {
    limit: 10,
    offset: pageParam,
  });

  if (!response.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return await response.json();
}
