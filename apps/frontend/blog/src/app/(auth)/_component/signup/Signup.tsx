"use client";
import { useState } from "react";

import * as styles from "./Signup.css";

import Terms from "./terms/Terms";
import SignupEmail from "./email/SignupEmail";
import SignupNickname from "./nickname/SignupNickname";
import { Button, Input, Text } from "@frontend/coreui";

export default function Signup() {
  const [emailInspected, setEmailInspected] = useState<null | boolean>(null);
  const [nicknameInspected, setNicknameInspected] = useState<null | boolean>(
    null,
  );

  const handleEmailChecked = (value: boolean) => {
    setEmailInspected(value);
  };

  const handleNicknameChecked = (value: boolean) => {
    setNicknameInspected(value);
  };

  return (
    <section className={styles.signupSection}>
      <span className={styles.signupTitle}>
        <Text size="xh" weight="bold">
          회원가입
        </Text>
      </span>
      <form className={styles.signupForm}>
        <div className={styles.signupInput}>
          <SignupEmail inspectChange={handleEmailChecked} />
        </div>
        <div className={styles.signupInput}>
          <SignupNickname inspectChange={handleNicknameChecked} />
        </div>
        <div className={styles.signupInput}>
          <Input
            label="비밀번호"
            size="l"
            type="password"
            name={"password"}
            error={false}
            pattern={
              "^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$"
            }
            placeholder="비밀번호를 입력해 주세요."
          >
            <span>
              비밀번호는 8자 이상으로 영문자, 숫자, 특수기호를 조합하여 입력해
              주세요.
            </span>
          </Input>
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
        <div className={styles.signupButtonBox}>
          <Button
            size="xl"
            type="primary"
            disabled={
              (emailInspected === null ? true : !emailInspected) ||
              (nicknameInspected === null ? true : !nicknameInspected)
            }
            className={styles.signupButton}
          >
            회원가입
          </Button>
        </div>
      </form>
    </section>
  );
}
