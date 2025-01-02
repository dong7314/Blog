"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";

import * as styles from "./HeaderItem.css";

import { Text } from "@frontend/coreui";

type Props = {
  index: number;
  children: ReactNode;
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
};

export default function HeaderItem({
  index,
  children,
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div className={styles.headerItem} onClick={() => setActiveTab(index)}>
      <Text
        size="m"
        color={activeTab === index ? "#262626" : "#a5a5a5"}
        weight={activeTab === index ? 600 : 400}
      >
        {children}
      </Text>
    </div>
  );
}
