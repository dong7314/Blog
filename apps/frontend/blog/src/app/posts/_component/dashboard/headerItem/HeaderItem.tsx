"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";

import * as styles from "./HeaderItem.css";

import { Text } from "@frontend/coreui";
import { composeStyles } from "@vanilla-extract/css";

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
    <div
      className={composeStyles(
        styles.headerItem,
        activeTab === index ? styles.active : "",
      )}
      onClick={() => setActiveTab(index)}
    >
      <Text
        size="s"
        color={activeTab === index ? "#595959" : "#a5a5a5"}
        weight={activeTab === index ? 600 : 400}
      >
        {children}
      </Text>
    </div>
  );
}
