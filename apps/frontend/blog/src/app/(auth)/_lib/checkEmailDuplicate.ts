import { fetchData } from "@/app/_lib/restful";

export async function checkEmailDuplicate(email: string) {
  const response = await fetchData("api.user/email-check", ["email", "check"], {
    email,
  });

  if (!response.ok) {
    return Promise.reject(new Error("중복된 이메일 입니다."));
  }

  return response;
}
