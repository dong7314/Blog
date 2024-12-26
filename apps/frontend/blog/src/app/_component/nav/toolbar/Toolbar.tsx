"use client";

import * as styles from "./Toolbar.css";

import { Button, IconButton, SearchBar } from "@frontend/coreui";
import Link from "next/link";

export default function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <SearchBar />
      <IconButton type="bell" size="h" />
      <IconButton type="light" size="h" />
      <Link href="/login">
        <Button size="l">회원가입/로그인</Button>
      </Link>
    </div>
  );
}
