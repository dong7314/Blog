"use server";

import { modifyData } from "@/app/_lib/restful";
import { redirect } from "next/navigation";

export default async function signup(
  name: string,
  email: string,
  password: string,
) {
  let body = {
    name,
    email,
    password,
  };

  const res = await modifyData(`api.user`, "post", ["user", "signup"], body);

  if (!res.ok) {
    throw new Error("회원가입이 실패하였습니다.");
  } else {
    redirect("/signup/verify");
  }
}
