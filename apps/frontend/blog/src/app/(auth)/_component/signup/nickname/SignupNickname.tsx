"use client";

import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Input } from "@frontend/coreui";
import { checkNameDuplicate } from "@/app/(auth)/_lib/checkNameDuplicate";

type Props = {
  inspectChange: Function;
};
export default function SignupNickname({ inspectChange }: Props) {
  const [checked, setChecked] = useState<boolean | null>(null);
  const [patternChecked, setPatternChecked] = useState<boolean | null>(null);
  const timeoutDelay = useRef<NodeJS.Timeout | null>(null);

  const mutation = useMutation({
    mutationFn: checkNameDuplicate,
    onSuccess: (response) => {
      setChecked(true);
      inspectChange(true);
    },
    onError: (error: any) => {
      setChecked(false);
    },
  });

  const checkNicknamePattern = (value: string) => {
    const nicknamePattern =
      /^(?!\s)[a-zA-Z가-힣.,\-_](?: [a-zA-Z가-힣.,\-_]|[a-zA-Z가-힣.,\-_]){1,9}$/;
    if (!nicknamePattern.test(value)) {
      setPatternChecked(false);
    } else {
      setPatternChecked(true);
    }
    return nicknamePattern.test(value);
  };

  const handleNicknameChange = (value: string) => {
    // 이름 입력 값 변경시 checked 값 초기화
    setChecked(null);
    inspectChange(false);
    // 패턴 검사 진행
    const pattern = checkNicknamePattern(value);
    console.log(pattern);
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
      label="닉네임"
      size="l"
      type="text"
      name={"nickname"}
      placeholder="사용하실 닉네임을 입력해 주세요."
      error={
        (checked !== null && !checked) ||
        (patternChecked !== null && !patternChecked)
      }
      pattern="^(?!\s)[a-zA-Z가-힣.,\-_](?: [a-zA-Z가-힣.,\-_]|[a-zA-Z가-힣.,\-_]){1,9}$"
      onChange={handleNicknameChange}
    >
      {checked !== null && !checked && (
        <span>중복된 닉네임 입니다. 다른 닉네임을 입력해 주세요.</span>
      )}
      {patternChecked !== null && !patternChecked && (
        <span>
          2~10 글자로 띄워쓰기, 특수기호(.)(_)(-)를 사용할 수 있습니다.
        </span>
      )}
    </Input>
  );
}
