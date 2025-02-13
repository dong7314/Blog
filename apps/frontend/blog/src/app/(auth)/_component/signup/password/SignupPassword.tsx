"use client";

import { useState } from "react";

import { Input } from "@frontend/coreui";

type Props = {
  valueChange: Function;
  inspectChange: Function;
};
export default function SignupPassword({ valueChange, inspectChange }: Props) {
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [patternChecked, setPatternChecked] = useState<boolean | null>(null);

  const handlePasswordChange = (value: string) => {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/i;

    if (!passwordPattern.test(value)) {
      setPatternChecked(false);
    } else {
      setPatternChecked(true);
    }

    setPassword(value);
    valueChange(value);
  };

  const handleRepeatPasswordChange = (value: string) => {
    setRepeatPassword(value);
    inspectChange(patternChecked && password === value);
  };

  return (
    <>
      <Input
        label="비밀번호"
        size="l"
        type="password"
        name={"password"}
        error={false}
        pattern={
          "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$"
        }
        placeholder="비밀번호를 입력해 주세요."
        onChange={handlePasswordChange}
      >
        <span>
          비밀번호는 8~20자로 영문자, 숫자, 특수기호를 조합하여 입력해 주세요.
        </span>
      </Input>
      <div style={{ marginTop: "4px" }}>
        <Input
          size="l"
          type="password"
          name={"password"}
          placeholder="비밀번호를 다시 한번 입력해 주세요."
          error={password !== repeatPassword}
          onChange={handleRepeatPasswordChange}
        >
          <span>비밀번호가 일치하지 않습니다.</span>
        </Input>
      </div>
    </>
  );
}
