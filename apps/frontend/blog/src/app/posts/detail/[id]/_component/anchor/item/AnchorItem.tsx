"use client";

import { useEffect, useState } from "react";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./AnchorItem.css";

import { Text } from "@frontend/coreui";
import {
  AnchorNavigation,
  useAnchorNavigationStore,
} from "../../../_store/anchorNavigation";

type Props = {
  data: AnchorNavigation;
  index: number;
  active: number;
};

export default function AnchorItem({ data, index, active }: Props) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const anchorNavigationStore = useAnchorNavigationStore();

  const itemStyle = composeStyles(
    styles.anchorItem,
    (styles as any)[data.type],
    index === active ? styles.active : "",
  );

  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById(data.id);
      if (element) {
        anchorNavigationStore.setNavPositionList(
          Math.floor(element.offsetTop) - 2,
        );
      }
    });
  }, []);

  return (
    <span
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
      className={itemStyle}
    >
      <Text
        size="s"
        color={isHover || index === active ? "#262626" : "#a5a5a5"}
        weight={isHover || index === active ? 600 : 300}
      >
        {data.name}
      </Text>
    </span>
  );
}
