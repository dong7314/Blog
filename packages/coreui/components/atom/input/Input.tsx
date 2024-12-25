import React, { useState, FocusEventHandler, ChangeEventHandler } from "react";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./Input.css";

import { Text } from "../text/Text";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { InputType, InputSize } from "./Input.type";

export interface InputProps {
  /** 인풋 라벨 설정 */
  label?: string;
  /** 인풋 라운드 효과 설정 */
  rounded?: boolean;
  /** 인풋 타입 설정 */
  type?: InputType;
  /** 인풋 사이즈 설정 */
  size?: InputSize;
  /** 인풋 패턴 */
  pattern?: string;
  /** 인풋 최소 글자 수 */
  minLength?: number;
  /** 인풋 최대 글자 수 */
  maxLength?: number;
  /** 패턴 관련하여 에러 발생 시 출력할 문자열 */
  error?: string;
  /** 인풋 미리보기기 */
  placeholder?: string;
  /** 클릭 시 동작할 함수 */
  onChange?: (value: string) => void;
  /** input에 style 커스텀 설정 */
  className?: string;
}

/** Primary UI component for user interaction */
export const Input = ({
  type = "text",
  size = "m",
  label,
  rounded,
  pattern,
  minLength,
  maxLength,
  error,
  placeholder,
  onChange,
  className,
}: InputProps) => {
  const [currentError, setCurrentError] = useState(false);
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [inputType, setInputType] = useState(type);

  const outlineInputStyle = composeStyles(
    styles.outlineInput,
    rounded ? styles.outlineRounded : "",
    focus ? styles.outlineFocus : "",
    currentError ? styles.outlineError : "",
  );
  const labelStyle = composeStyles(
    styles.label,
    focus ? styles.labelFocus : "",
    currentError ? styles.labelError : "",
    focus || value ? styles.labelInValue : "",
  );
  const inlineInputStyle = composeStyles(
    styles.inlineInput,
    styles.size[size],
    className ? className : "",
    rounded ? styles.inlineRounded : "",
    type === "password" ? styles.inlineInputPassword : "",
  );

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocus(true);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocus(false);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // value 값 세팅
    const newValue = e.target.value;
    setValue(newValue);
    // 에러 확인
    setCurrentError(e.target.validity.patternMismatch);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={styles.inputBox}>
      <div className={outlineInputStyle}>
        {label && (
          <label className={labelStyle} htmlFor={label}>
            {!placeholder && label}
          </label>
        )}
        <input
          className={inlineInputStyle}
          id={label}
          type={inputType}
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
        />
      </div>
      {currentError && error ? (
        <div className={styles.inputError}>
          <Text size="xs" color="#FC6969">
            {error}
          </Text>
        </div>
      ) : undefined}
      {type === "password" && (
        <div className={styles.passwordIconButton}>
          {inputType === "password" && (
            <IconButton
              onClick={() => {
                setInputType("text");
              }}
              type="secret"
              color="#a5a5a5"
              hoverColor="#595959"
            />
          )}
          {inputType === "text" && (
            <IconButton
              onClick={() => {
                setInputType("password");
              }}
              type="secret_open"
              color="#a5a5a5"
              hoverColor="#595959"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
