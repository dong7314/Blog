import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./Nav.css";

import Logo from "./logo/Logo";
import Menu from "./menu/Menu";
import Toolbar from "./toolbar/Toolbar";

export default function Nav() {
  return (
    <>
      <div className={styles.nav}>
        <div className={styles.navBox}>
          <div
            className={composeStyles(styles.navDefaultContent, styles.header)}
          >
            <Logo />
            <Toolbar />
          </div>
        </div>
        <div className={styles.navBox}>
          <div
            className={composeStyles(styles.navDefaultContent, styles.bottom)}
          >
            <Menu />
          </div>
        </div>
      </div>
    </>
  );
}
