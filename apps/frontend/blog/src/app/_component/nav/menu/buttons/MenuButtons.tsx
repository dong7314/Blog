"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import * as styles from "./MenuButtons.css";

import { Button } from "@frontend/coreui";

export default function MenuButtons() {
  // 현재 path 주소
  const path = usePathname();

  return (
    <>
      {path === "/posts" && (
        <Link href={"/posts/create"}>
          <Button type="tertiary">새 글 작성</Button>
        </Link>
      )}
      {path.includes("/posts/create") && (
        <>
          <Link href={"/posts/create/preview"}>
            <Button type="tertiary">미리 보기</Button>
          </Link>
          <Link href={"/posts/save"} className={styles.buttonMargin}>
            <Button type="primary">출간 하기</Button>
          </Link>
        </>
      )}
    </>
  );
}
