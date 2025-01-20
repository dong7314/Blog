"use server";

import { signIn } from "@/auth";

export default async (
  prevState: { message: string | null },
  formData: FormData,
) => {
  if (!formData.get("email")) {
    return { message: "이메일을 정확히 입력해 주세요." };
  }

  if (!formData.get("password")) {
    return { message: "비밀번호을 정확히 입력해 주세요." };
  }

  try {
    await signIn("credentials", {
      username: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return { message: null };
  } catch (err) {
    return { message: "이메일과 비밀번호가 일치하지 않습니다." };
  }
};
