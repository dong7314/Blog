import * as styles from "./SocialLogin.css";

import SocialLoginItem from "./item/SocialLoginItem";

export default function SocialLogin() {
  const social = ["kakao", "google", "github"];

  return (
    <div className={styles.socialLoginContainer}>
      {social.map((c) => {
        return <SocialLoginItem item={c} key={c} />;
      })}
    </div>
  );
}
