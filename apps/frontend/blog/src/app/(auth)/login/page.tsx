import * as styles from "./page.css";

import Login from "../_component/login/Login";

export default function LoginPage() {
  return (
    <div className={styles.loginBox}>
      <Login />
    </div>
  );
}
