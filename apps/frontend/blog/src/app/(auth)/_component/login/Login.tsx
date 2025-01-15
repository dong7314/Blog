"use client";

import Link from "next/link";
import Form from "next/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";

import * as styles from "./Login.css";

import onSubmit from "../../_lib/login";
import LogoImage from "../../../../../public/Logo.png";
import SocialLogin from "./social/SocialLogin";
import { Button, Input, Text, TextButton } from "@frontend/coreui";

type Props = {
  modal?: boolean;
};
export default function Login({ modal = false }: Props) {
  const router = useRouter();
  const { update } = useSession();
  const [state, formAction] = useActionState(onSubmit, { message: "" });
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.message === null) {
      router.back();
      update();
    }
  }, [state.message, router]);

  return (
    <section className={styles.loginSection}>
      <div className={styles.emailLogin}>
        {modal ? (
          <Image
            className={styles.loginLogo}
            src={LogoImage}
            alt="DPOST"
            height={55}
            priority
          />
        ) : (
          <span className={styles.loginLogo}>
            <Text size="xh" weight="bold">
              로그인
            </Text>
          </span>
        )}
        <Form className={styles.loginForm} action={formAction}>
          <div className={styles.loginInput}>
            <Input
              size="l"
              type="text"
              name={"email"}
              label={"이메일 주소"}
              pattern={"[a-zA-Z0-9.]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"}
            >
              <span>유효한 이메일 주소를 입력해 주세요.</span>
            </Input>
          </div>
          <div className={styles.loginInput}>
            <Input
              size="l"
              type="password"
              name={"password"}
              label={"비밀번호"}
              pattern={
                "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$"
              }
            >
              <span>
                비밀번호는 8자 이상으로 영문자, 숫자, 특수기호를 조합하여 입력해
                주세요.
              </span>
            </Input>
          </div>
          <div className={styles.loginButton}>
            <Button
              size="xl"
              type="primary"
              feature="submit"
              disabled={pending}
            >
              로그인
            </Button>
            {state.message !== "" && state.message !== null && (
              <Text size="xs" color="#FC6969" className={styles.loginError}>
                {state.message}
              </Text>
            )}
          </div>
        </Form>
        <div className={styles.loginTextButton}>
          <Link href="/signup">
            <TextButton size="xs" color="#595959">
              회원가입
            </TextButton>
          </Link>
          <span className={styles.seperator}>|</span>
          <Link href="/find-password">
            <TextButton size="xs" color="#595959">
              비밀번호 찾기
            </TextButton>
          </Link>
        </div>
      </div>
      <div className={styles.socialLogin}>
        <span className={styles.loginSeperatorBox}>
          <span className={styles.loginSeperator}>
            <Text color="#595959" size="dxs">
              간편 로그인
            </Text>
          </span>
        </span>
        <SocialLogin />
      </div>
    </section>
  );
}
