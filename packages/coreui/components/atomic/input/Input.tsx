import React, {
  FocusEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./Input.css";

import { InputType, InputSize } from "./Input.type";
import Text from "../text/Text";

export interface InputProps {
  /** 인풋 라벨 설정 */
  label?: string;
  /** 인풋 타입 설정 */
  type?: InputType;
  /** 인풋 사이즈 설정 */
  size?: InputSize;
  /** 인풋 비활성화 */
  disabled?: boolean;
  /** 클릭 시 동작할 함수 */
  onChange?: () => void;
}

/** Primary UI component for user interaction */
export const Input = ({
  type = "text",
  size = "m",
  label,
  disabled = false,
  onChange,
}: InputProps) => {
  const inputStyle = composeStyles(styles.inlineInput, styles.size[size]);

  const focusing: FocusEventHandler<HTMLInputElement> = (e) => {
    console.log(e);
  };

  const bluring: FocusEventHandler<HTMLInputElement> = (e) => {
    console.log(e);
  };

  return (
    <div className={styles.outlineInput}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          <Text>{label}</Text>
        </label>
      )}
      <input
        onFocus={focusing}
        onBlur={bluring}
        className={inputStyle}
        type={type}
        onChange={onChange}
        id={label}
      />
    </div>
  );
};

export default Input;
