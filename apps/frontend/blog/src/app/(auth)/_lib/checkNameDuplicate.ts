import { fetchData } from "@/app/_lib/restful";

export async function checkNameDuplicate(name: string) {
  const response = await fetchData("api.user/name-check", ["name", "check"], {
    name,
  });

  if (!response.ok) {
    return Promise.reject(new Error("중복된 닉네임 입니다."));
  }

  return response;
}
