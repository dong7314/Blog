"use client";

import React, {
  useState,
  FocusEventHandler,
  ChangeEventHandler,
  useRef,
  useImperativeHandle,
  forwardRef,
  useId,
  ReactNode,
  useEffect,
} from "react";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./Input.css";

import { Text } from "../text/Text";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { InputType, InputSize, InputRef } from "./Input.type";

export interface InputProps {
  /** 인풋 라벨 설정 */
  label?: string;
  /** 인풋 네임 설정 */
  name?: string;
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
  /** 에러 여부 설정 */
  error?: boolean;
  /** 인풋 미리보기 */
  placeholder?: string;
  /** 인풋풋 값 세팅 */
  value?: string;
  /** 인풋 라운드 효과 설정 */
  rounded?: boolean;
  /** 인풋 에러 발생 시 출력할 문자열 */
  children?: ReactNode;
  /** 인풋 자동완성성 설정 */
  autoComplete?: "on" | "off";
  /** input value 변경 시 동작할 함수 */
  onChange?: (value: string) => void;
  /** input에 style 커스텀 설정 */
  className?: string;
}

/** Primary UI component for user interaction */
export const Input = forwardRef<InputRef, InputProps>(
  (
    {
      type = "text",
      size = "m",
      name,
      label,
      value = "",
      rounded,
      pattern,
      minLength,
      maxLength,
      error = false,
      placeholder,
      autoComplete = "off",
      children,
      onChange,
      className,
    }: InputProps,
    ref,
  ) => {
    const uuid = useId();
    const [currentError, setCurrentError] = useState(error);
    const [inputValue, setInputValue] = useState(value);
    const [focus, setFocus] = useState(false);
    const [inputType, setInputType] = useState(type);
    const inputRef = useRef<HTMLInputElement | null>(null);

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
      (focus || inputValue) && !placeholder ? styles.labelInValue : "",
      placeholder ? styles.hasPlaceholder : styles.withoutPlaceholder,
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
      setInputValue(newValue);
      // 에러 확인
      setCurrentError(e.target.validity.patternMismatch);

      if (onChange) {
        onChange(e.target.value);
      }
    };

    useImperativeHandle(ref, () => ({
      setBlur: () => inputRef.current?.blur(),
      setFocus: () => inputRef.current?.focus,
      getValue: () => inputValue,
      setValue: (newValue: string) => setInputValue(newValue),
      clearValue: () => setInputValue(""),
    }));

    useEffect(() => {
      setCurrentError(error);
    }, [error]);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    return (
      <div className={styles.inputBox}>
        {placeholder && label && (
          <label className={labelStyle} htmlFor={uuid}>
            {label}
          </label>
        )}
        <div className={outlineInputStyle}>
          {!placeholder && label && (
            <label className={labelStyle} htmlFor={uuid}>
              {label}
            </label>
          )}
          <input
            className={inlineInputStyle}
            id={uuid}
            ref={inputRef}
            type={inputType}
            name={name}
            value={inputValue}
            pattern={pattern}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
            onBlur={handleBlur}
            autoComplete={autoComplete}
            onFocus={handleFocus}
            onChange={handleChange}
          />
          {type === "password" && (
            <div className={styles.passwordIconButton}>
              {inputType === "password" && (
                <IconButton
                  onClick={() => {
                    setInputType("text");
                  }}
                  type="secret_open"
                  color="#a5a5a5"
                  hoverColor="#595959"
                />
              )}
              {inputType === "text" && (
                <IconButton
                  onClick={() => {
                    setInputType("password");
                  }}
                  type="secret"
                  color="#a5a5a5"
                  hoverColor="#595959"
                />
              )}
            </div>
          )}
        </div>
        {currentError && children ? (
          <div className={styles.inputError}>
            <Text size="xs" color="#FC6969">
              {children}
            </Text>
          </div>
        ) : undefined}
      </div>
    );
  },
);

export default Input;
