import { fetchData } from "@/app/_lib/restful";

export async function getFollowers(id: number) {
  const res = await fetchData(`api.follow/followers/${id}`, [
    "follow",
    "followers",
    `${id}`,
  ]);

  if (!res.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return await res.data;
}
