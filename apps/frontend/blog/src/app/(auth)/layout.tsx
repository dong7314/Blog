import { ReactNode } from "react";

import * as styles from "./layout.css";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return <div className={styles.authPage}>
    <div className={styles.authLayout}>
      {children}
    </div>
  </div>;
}
