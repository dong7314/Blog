"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

import * as styles from "./page.css";

import Login from "../_component/login/Login";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }

  return (
    <div className={styles.loginBox}>
      <Login />
    </div>
  );
}
