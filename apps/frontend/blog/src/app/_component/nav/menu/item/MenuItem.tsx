"use client";

import * as styles from "./MenuItem.css";

import Link from "next/link";

import MenuData from "../model/MenuData";

type Props = {
  data: MenuData;
};

export default function MenuItem({ data }: Props) {
  return (
    <li className={styles.menuLi}>
      <Link href={data.link} className={styles.item}>
        {data.menuName}
      </Link>
    </li>
  );
}
