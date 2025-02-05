"use client";
import { useState } from "react";

import * as styles from "./Signup.css";

import signup from "../../_lib/signup";
import SignupTerms from "./terms/SignupTerms";
import SignupEmail from "./email/SignupEmail";
import SignupNickname from "./nickname/SignupNickname";
import SignupPassword from "./password/SignupPassword";
import { Button, Text } from "@frontend/coreui";

export default function Signup() {
  const [inspections, setInspections] = useState({
    email: null,
    nickname: null,
    password: null,
    terms: null,
  });

  const [body, setBody] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChecked =
    (field: "email" | "nickname" | "password" | "terms") =>
    (value: boolean) => {
      setInspections((prev) => ({ ...prev, [field]: value }));
    };

  const handleValue =
    (field: "email" | "name" | "password") => (value: boolean) => {
      setBody((prev) => ({ ...prev, [field]: value }));
    };

  const isButtonDisabled =
    !inspections.email ||
    !inspections.nickname ||
    !inspections.password ||
    !inspections.terms;

  const handleSignup = () => {
    if (!isButtonDisabled) {
      signup(body.name, body.email, body.password);
    }
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
          <SignupEmail
            inspectChange={handleChecked("email")}
            valueChange={handleValue("email")}
          />
        </div>
        <div className={styles.signupInput}>
          <SignupNickname
            inspectChange={handleChecked("nickname")}
            valueChange={handleValue("name")}
          />
        </div>
        <div className={styles.signupInput}>
          <SignupPassword
            inspectChange={handleChecked("password")}
            valueChange={handleValue("password")}
          />
        </div>
        <SignupTerms inspectChange={handleChecked("terms")} />
        <div className={styles.signupButtonBox}>
          <Button
            size="xl"
            type="primary"
            disabled={isButtonDisabled}
            className={styles.signupButton}
            onClick={handleSignup}
          >
            회원가입
          </Button>
        </div>
      </form>
    </section>
  );
}
