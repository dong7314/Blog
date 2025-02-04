"use client";

import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Input } from "@frontend/coreui";
import { checkEmailDuplicate } from "@/app/(auth)/_lib/checkEmailDuplicate";

type Props = {
  inspectChange: Function;
};
export default function SignupEmail({ inspectChange }: Props) {
  const [checked, setChecked] = useState<boolean | null>(null);
  const [patternChecked, setPatternChecked] = useState<boolean | null>(null);
  const timeoutDelay = useRef<NodeJS.Timeout | null>(null);

  const mutation = useMutation({
    mutationFn: checkEmailDuplicate,
    onSuccess: (response) => {
      setChecked(true);
      inspectChange(true);
    },
    onError: (error: any) => {
      setChecked(false);
    },
  });

  const checkEmailPattern = (value: string) => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(value)) {
      setPatternChecked(false);
    } else {
      setPatternChecked(true);
    }
    return emailPattern.test(value);
  };

  const handleEmailChange = (value: string) => {
    // 이메일 입력 값 변경시 checked 값 초기화
    setChecked(null);
    inspectChange(false);
    // 패턴 검사 진행
    const pattern = checkEmailPattern(value);
    // 딜레이 조절
    if (timeoutDelay.current) {
      clearTimeout(timeoutDelay.current);
    }

    timeoutDelay.current = setTimeout(() => {
      if (pattern) {
        mutation.mutate(value);
      }
    }, 500);
  };

  return (
    <Input
      label="이메일"
      size="l"
      type="text"
      name={"email"}
      placeholder="이메일을 입력해 주세요."
      error={
        (checked !== null && !checked) ||
        (patternChecked !== null && !patternChecked)
      }
      pattern={"[a-zA-Z0-9.]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"}
      onChange={handleEmailChange}
    >
      {checked !== null && !checked && (
        <span>중복된 이메일 입니다. 다른 이메일을 입력해 주세요.</span>
      )}
      {patternChecked !== null && !patternChecked && (
        <span>유효한 이메일 주소를 입력해 주세요.</span>
      )}
    </Input>
  );
}
