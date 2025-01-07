"use client";

import Link from "next/link";
import { useState } from "react";
import { composeStyles } from "@vanilla-extract/css";
import { useAnchorNavigationStore } from "../../_store/anchorNavigation";

import * as styles from "./Anchor.css";

import { Text } from "@frontend/coreui";
import { usePathname } from "next/navigation";

export default function Anchor() {
  const pathname = usePathname();
  const anchorNavigationStore = useAnchorNavigationStore();
  const [active, setActive] = useState(0);

  return (
    <div className={styles.anchorContainer}>
      {anchorNavigationStore.navList.map((nav) => {
        return (
          <Link key={nav.id} href={pathname + `#${nav.id}`}>
            <span className={composeStyles(styles.anchor, styles[nav.type])}>
              <Text
                size="s"
                color={active ? "#595959" : "#a5a5a5"}
                weight={active ? 600 : 400}
              >
                {nav.name}
              </Text>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
