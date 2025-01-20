import { post } from "@/app/_lib/restful";

export default async function followUser(
  userId: number,
  followId: number,
  token: string,
) {
  const res = await post(
    `api.follow/${userId}/${followId}`,
    ["follow", "following", `${userId}`, `${followId}`],
    undefined,
    token,
  );

  if (!res.ok) {
    throw new Error("팔로우가 실패하였습니다..");
  }

  return res.json();
}
