import * as styles from "./Signup.css";

import { Button, Checkbox, Input, Text } from "@frontend/coreui";
import Terms from "./terms/Terms";

export default function Signup() {
  return (
    <section className={styles.signupSection}>
      <span className={styles.signupTitle}>
        <Text size="xh" weight="bold">
          회원가입
        </Text>
      </span>
      <form className={styles.signupForm}>
        <div className={styles.signupInput}>
          <Text className={styles.signupInputLabel} size="s">
            이메일
          </Text>
          <Input
            size="l"
            type="text"
            name={"email"}
            placeholder="이메일을 입력해 주세요."
            error={"유효한 이메일 주소를 입력해 주세요."}
            pattern={"[a-zA-Z0-9.]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"}
          />
        </div>
        <div className={styles.signupInput}>
          <Text className={styles.signupInputLabel} size="s">
            닉네임
          </Text>
          <Input
            size="l"
            type="text"
            name={"nickname"}
            label={"닉네임"}
            placeholder="사용하실 닉네임을 입력해 주세요."
          />
        </div>
        <div className={styles.signupInput}>
          <Text className={styles.signupInputLabel} size="s">
            비밀번호
          </Text>
          <Input
            size="l"
            type="password"
            name={"password"}
            error={
              "비밀번호는 8자 이상으로 영문자, 숫자, 특수기호를 조합하여 입력해 주세요."
            }
            pattern={
              "^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$"
            }
            placeholder="비밀번호를 입력해 주세요."
          />
          <div style={{ marginTop: "4px" }}>
            <Input
              size="l"
              type="password"
              name={"password"}
              placeholder="비밀번호를 다시 한번 입력해 주세요."
            />
          </div>
        </div>
        <Terms />
        <div className={styles.signupButton}>
          <Button size="xl" type="primary">
            회원가입
          </Button>
        </div>
      </form>
    </section>
  );
}
