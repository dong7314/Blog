"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

import * as styles from "./page.css";

import Signup from "@/app/(auth)/_component/signup/Signup";

export default async function SignupPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }

  return (
    <div className={styles.signupBox}>
      <Signup />
    </div>
  );
}
