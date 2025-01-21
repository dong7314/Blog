import { auth } from "@/auth";
import { fetchData } from "@/app/_lib/restful";

export async function getPost(id: number) {
  const response = await fetchData(`api.post/${id}`, ["post", "detail"]);

  if (!response.ok) {
    throw new Error("데이터를 가져오는데 실패하였습니다.");
  }

  return await response.json();
}
