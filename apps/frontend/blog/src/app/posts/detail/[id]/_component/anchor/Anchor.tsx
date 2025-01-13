"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { composeStyles } from "@vanilla-extract/css";
import { useAnchorNavigationStore } from "../../_store/anchorNavigation";

import * as styles from "./Anchor.css";

import AnchorItem from "./item/AnchorItem";

export default function Anchor() {
  const pathname = usePathname();
  const anchorNavigationStore = useAnchorNavigationStore();
  const [active, setActive] = useState<number>(-1);

  const binarySearch = (arr: number[], target: number) => {
    let low = 0;
    let high = arr.length - 1;

    if (target < arr[0]) {
      return -1;
    }

    if (target > arr[high]) {
      return high;
    }

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      if (
        target >= arr[mid] &&
        (mid === arr.length - 1 || target < arr[mid + 1])
      ) {
        return mid;
      } else if (target < arr[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    return -1; // 여기에 도달하지 않음 (모든 경우 처리됨)
  };

  useEffect(() => {
    const container = document.querySelector("#main")!;

    const checkActiveItem = () => {
      const NPList = anchorNavigationStore.navPositionList;
      const scrollTop = container.scrollTop;

      const activeIndex = binarySearch(NPList, scrollTop);
      setActive(activeIndex);
    };

    container.addEventListener("scroll", checkActiveItem);

    return () => {
      container.removeEventListener("scroll", checkActiveItem);
    };
  }, [anchorNavigationStore.navPositionList]);

  return (
    <div className={styles.anchorContainer}>
      {anchorNavigationStore.navList.map((nav: any, index: number) => {
        return (
          <Link key={nav.id} href={pathname + `#${nav.id}`}>
            <AnchorItem data={nav} index={index} active={active} />
          </Link>
        );
      })}
    </div>
  );
}
