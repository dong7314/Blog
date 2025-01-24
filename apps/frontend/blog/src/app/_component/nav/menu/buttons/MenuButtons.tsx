"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import * as styles from "./MenuButtons.css";

import { Button } from "@frontend/coreui";
import { useSession } from "next-auth/react";
import CreatPostButton from "./createPost/CreatePostButton";

export default function MenuButtons() {
  // 현재 path 주소
  const path = usePathname();
  const { data } = useSession();

  return (
    <>
      {(path === "/posts" || path.startsWith("/posts/detail")) && data && (
        <Link href={"/posts/create"}>
          <Button type="tertiary">새 글 작성</Button>
        </Link>
      )}
      {path.includes("/posts/create") && (
        <>
          <Link href={"/posts/create/preview"}>
            <Button type="tertiary">미리 보기</Button>
          </Link>
          <CreatPostButton />
        </>
      )}
    </>
  );
}
