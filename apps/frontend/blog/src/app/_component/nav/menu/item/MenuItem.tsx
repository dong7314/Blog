"use client";

import * as styles from "./MenuItem.css";

import Link from "next/link";

import MenuData from "../model/MenuData";
import { usePathname } from "next/navigation";
import { composeStyles } from "@vanilla-extract/css";

type Props = {
  data: MenuData;
};

export default function MenuItem({ data }: Props) {
  // 현재 path 주소
  const path = usePathname();
  // 패스 주소에 따른 스타일 변경 진행
  const itemStyle = composeStyles(
    styles.item,
    path.startsWith(data.link) ? styles.active : "",
  );
  return (
    <li className={styles.menuLi}>
      <Link href={data.link} className={itemStyle}>
        {data.menuName}
      </Link>
    </li>
  );
}
