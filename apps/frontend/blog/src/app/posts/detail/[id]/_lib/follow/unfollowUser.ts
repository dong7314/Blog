import { modifyData } from "@/app/_lib/restful";

export default async function unfollowUser(
  userId: number,
  followId: number,
  token: string,
) {
  const res = await modifyData(
    `api.follow/${userId}/${followId}`,
    "delete",
    ["unfollow", "following", `${userId}`, `${followId}`],
    undefined,
    token,
  );

  if (!res.ok) {
    throw new Error("언팔로우가 실패하였습니다..");
  }

  return res.data;
}
