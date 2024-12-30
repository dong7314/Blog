import * as styles from "./page.css";

import Signup from "@/app/_component/signup/Signup";

export default function SignupPage() {
  return (
    <div className={styles.signupBox}>
      <Signup />
    </div>
  );
}
