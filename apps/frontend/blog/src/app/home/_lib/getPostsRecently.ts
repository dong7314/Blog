import { get } from "@/app/_lib/restful";

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
