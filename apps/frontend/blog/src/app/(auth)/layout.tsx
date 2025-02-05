import Link from "next/link";
import { ReactNode } from "react";

import * as styles from "./layout.css";
import { Icon, Text } from "@frontend/coreui";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={styles.authPage}>
      <Link href="/home">
        <div className={styles.backButton}>
          <Icon type="arrow_left" size="xl" color="#262626" />
          <Text weight={500} className={styles.backButtonText}>
            뒤로가기
          </Text>
        </div>
      </Link>
      <div className={styles.authLayout}>{children}</div>
    </div>
  );
}
