"use client";

import { useSession, signOut } from "next-auth/react";

import * as styles from "./Toolbar.css";

import { Button, IconButton, SearchBar } from "@frontend/coreui";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Toolbar() {
  const router = useRouter();
  const { data } = useSession();

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <div className={styles.iconButton}>
        <IconButton type="bell" size="xl" />
      </div>
      <div className={styles.iconButton}>
        <IconButton type="light" size="xl" />
      </div>
      <div className={styles.loginButton}>
        {!data && (
          <Link href="/login">
            <Button size="l">회원가입/로그인</Button>
          </Link>
        )}
        {data && (
          <Button
            onClick={() => {
              signOut({ redirect: false });
              router.replace("/home");
            }}
          >
            로그아웃
          </Button>
        )}
      </div>
    </div>
  );
}
