import React, {
  FocusEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./Input.css";

import { InputType, InputSize } from "./Input.type";

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
  onChange?: (value: string) => void;
}

/** Primary UI component for user interaction */
export const Input = ({
  type = "text",
  size = "m",
  label,
  disabled = false,
  onChange,
}: InputProps) => {
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);

  const inputStyle = composeStyles(styles.inlineInput, styles.size[size]);

  const focusing: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocus(true);
  };

  const bluring: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocus(false);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div
      className={composeStyles(
        styles.outlineInput,
        focus ? styles.outlineFocus : "",
      )}
    >
      {label && (
        <label
          className={composeStyles(
            styles.label,
            focus ? styles.labelFocus : "",
            focus || value ? styles.labelInValue : "",
          )}
          htmlFor={label}
        >
          {label}
        </label>
      )}
      <input
        onFocus={focusing}
        onBlur={bluring}
        className={inputStyle}
        type={type}
        onChange={handleChange}
        id={label}
      />
    </div>
  );
};

export default Input;
