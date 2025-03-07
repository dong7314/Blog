"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import * as styles from "./DetailTagItem.css";

import { Text } from "@frontend/coreui";

type Props = {
  tag: string;
};
export default function DetailTagItem({ tag }: Props) {
  const router = useRouter();
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleTagClick = (tag: string) => {
    if (tag) {
      router.push(`/posts?tag=${tag}`);
    }
  };

  return (
    <span
      className={styles.detailTag}
      onClick={() => handleTagClick(tag)}
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
