"use client";

import { useSession, signOut } from "next-auth/react";

import * as styles from "./Toolbar.css";

import { Button, IconButton, SearchBar } from "@frontend/coreui";
import Link from "next/link";

export default function Toolbar() {
  const { data, update } = useSession();

  console.log(data);

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <IconButton type="bell" size="xl" />
      <IconButton type="light" size="xl" />
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
              update();
            }}
          >
            로그아웃
          </Button>
        )}
      </div>
    </div>
  );
}
