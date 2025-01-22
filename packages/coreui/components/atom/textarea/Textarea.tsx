"use client";

import React, {
  ChangeEventHandler,
  FocusEventHandler,
  ReactNode,
  useEffect,
  useId,
  useState,
} from "react";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./Textarea.css";

import { TextareaResize } from "./Textarea.type";
import Text from "../text/Text";

export interface TextareaProps {
  /** 텍스트에리어 라벨 설정 */
  label?: string;
  /** 텍스트에리어 네임 설정 */
  name?: string;
  /** 텍스트에리어 리사이즈 설정 */
  resize?: TextareaResize;
  /** 텍스트에리어 최대 글자 수 */
  maxLength?: number;
  /** 텍스트에리어 에러 발생 여부 */
  error?: true;
  /** 텍스트에리어 미리보기 */
  placeholder?: string;
  /** 패턴 관련하여 에러 발생 시 출력할 문자열 */
  children?: ReactNode;
  /** 텍스트에리어 값 세팅 */
  value?: string;
  /** textarea value 변경 시 동작할 함수 */
  onChange?: (value: string) => void;
  /** textarea에 style 커스텀 설정 */
  className?: string;
}

/** Primary UI component for user interaction */
export const Textarea = ({
  label,
  name,
  value = "",
  resize = "both",
  maxLength,
  error,
  placeholder,
  children,
  onChange,
  className,
}: TextareaProps) => {
  const uuid = useId();
  const [textareaValue, setTextareaValue] = useState(value);
  const [focus, setFocus] = useState(false);
  const [currentError, setCurrentError] = useState(error);

  const outlineInputStyle = composeStyles(
    styles.outlineTextarea,
    focus ? styles.outlineFocus : "",
    currentError ? styles.outlineError : "",
  );
  const labelStyle = composeStyles(
    styles.label,
    focus ? styles.labelFocus : "",
    currentError ? styles.labelError : "",
    (focus || textareaValue) && !placeholder ? styles.labelInValue : "",
    placeholder ? styles.hasPlaceholder : styles.withoutPlaceholder,
  );
  const textareaStyle = composeStyles(
    styles.inlineTextarea,
    className ? className : "",
  );

  const handleFocus: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    setFocus(true);
  };

  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    setFocus(false);
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    // value 값 세팅
    const newValue = e.target.value;
    setTextareaValue(newValue);

    if (onChange) {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    setTextareaValue(value);
  }, [value]);

  useEffect(() => {
    setCurrentError(error);
  }, [error]);

  return (
    <div className={styles.textareaBox}>
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
        <textarea
          style={{ resize }}
          id={uuid}
          name={name}
          className={textareaStyle}
          placeholder={placeholder}
          maxLength={maxLength}
          value={textareaValue}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
        ></textarea>
      </div>
      {(currentError || maxLength) && (
        <div className={styles.textareaInfo}>
          <div className={styles.textareaError}>
            {currentError && children ? (
              <Text
                className={styles.textareaErrorText}
                size="xs"
                color="#FC6969"
              >
                {children}
              </Text>
            ) : undefined}
          </div>
          {maxLength && (
            <div className={styles.maxLength}>
              <Text size="xs" color="#595959">
                {textareaValue.length}/{maxLength}
              </Text>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Textarea;
