import { fetchData } from "@/app/_lib/restful";

export async function checkNameDuplicate(name: string) {
  const res = await fetchData("api.user/name-check", ["name", "check"], {
    name,
  });

  if (!res.ok) {
    return Promise.reject(new Error("중복된 닉네임 입니다."));
  }

  return res.data;
}
