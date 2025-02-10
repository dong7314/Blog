"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import * as styles from "./MenuButtons.css";

import { Button } from "@frontend/coreui";
import { useSession } from "next-auth/react";
import CreatPostButton from "./createPost/CreatePostButton";
import UpdatePostButton from "./updatePost/UpdatePostButton";
import CancelPostButton from "./cancelPost/CancelPostButton";

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
          <Link href={`/posts/create/cancel`}>
            <CancelPostButton id={999999999} />
          </Link>
          <Link href={"/posts/create/preview"}>
            <Button type="secondary">미리보기</Button>
          </Link>
          <CreatPostButton />
        </>
      )}
      {path.includes("/posts/update") && (
        <>
          <Link href={`${path}/cancel`}>
            <CancelPostButton id={parseInt(path.split("/")[3])} />
          </Link>
          <Link href={`${path}/preview`}>
            <Button type="secondary">미리보기</Button>
          </Link>
          <UpdatePostButton id={parseInt(path.split("/")[3])} />
        </>
      )}
    </>
  );
}
