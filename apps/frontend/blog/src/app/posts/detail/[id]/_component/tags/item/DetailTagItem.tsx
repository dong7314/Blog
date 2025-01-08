"use client";

import { useState } from "react";
import * as styles from "./DetailTagItem.css";

import { Text } from "@frontend/coreui";

type Props = {
  tag: string;
};

export default function DetailTagItem({ tag }: Props) {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <span
      className={styles.detailTag}
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
    >
      <Text color={isHover ? "#262626" : "#595959"} weight={500}>
        # {tag}
      </Text>
    </span>
  );
}
