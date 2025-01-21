import { fetchData } from "@/app/_lib/restful";

export async function getCommentReplies(commentId: number) {
  const response = await fetchData(`api.comment/${commentId}/replies`, [
    "comments",
    "detail",
    `${commentId}`,
  ]);

  if (!response.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return await response.json();
}
