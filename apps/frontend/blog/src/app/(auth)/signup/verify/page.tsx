import Link from "next/link";
import * as styles from "./page.css";

import { Button, Text } from "@frontend/coreui";

export default function SignupVerifyPage() {
  return (
    <div className={styles.verifyBox}>
      <Text size="xh" weight="bold" className={styles.title}>
        회원가입 성공
      </Text>
      <Text className={styles.alert}>
        정상적으로 회원가입이 되었습니다.
        <br />
        이메일 인증 후 로그인을 시도해 주세요.
      </Text>
      <div className={styles.buttonBox}>
        <Link href="/login" className={styles.link}>
          <Button size="xl" type="primary" className={styles.button}>
            로그인
          </Button>
        </Link>
      </div>
    </div>
  );
}
