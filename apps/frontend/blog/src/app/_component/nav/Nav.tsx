import * as styles from "./Nav.css";

import Logo from "./logo/Logo";
import Menu from "./menu/Menu";

export default function Nav() {
  return (
    <div className={styles.nav}>
      <Logo />
      <Menu />
    </div>
  );
}
