"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@frontend/coreui";

export default function MenuButtons() {
  // 현재 path 주소
  const path = usePathname();

  return (
    <>
      {path === "/posts" && (
        <Link href={"posts/create"}>
          <Button type="tertiary">새 글 작성</Button>
        </Link>
      )}
    </>
  );
}
