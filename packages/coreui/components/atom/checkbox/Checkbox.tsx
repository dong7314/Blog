"use client";

import React, {
  ChangeEventHandler,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./Checkbox.css";

import { Text } from "../text/Text";
import { Icon } from "../icon/Icon";
import { IconSize } from "../icon/Icon.type";
import { CheckboxSize } from "./Checkbox.type";

export interface CheckboxProps {
  /** 체크박스 값 설정 */
  value?: boolean;
  /** 체크박스 사이즈 설정 */
  size?: CheckboxSize;
  /** 체크박스 이름 설정 */
  name?: string;
  /** 체크박스 비활성화 */
  disabled?: boolean;
  /** 체크박스 라벨링 */
  children?: ReactNode;
  /** 클릭 시 동작할 함수 */
  onChange?: (value: boolean) => void;
  /** checkbox에 style 커스텀 설정 */
  className?: string;
}

/** Primary UI component for user interaction */
export const Checkbox = ({
  value = false,
  size = "m",
  name,
  disabled = false,
  children,
  className,
  onChange,
}: CheckboxProps) => {
  const uuid = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentValue, setCurrentValue] = useState<boolean>(value);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurrentValue(e.target.checked);

    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const convertSize = { s: "xs", m: "m", l: "l" };
  const containerStyle = composeStyles(
    styles.checkboxContainer,
    className ? className : "",
  );
  const labelStyle = composeStyles(
    styles.label,
    currentValue ? styles.checked : "",
    disabled ? styles.disabled : "",
  );
  const childrenLabelStyle = composeStyles(
    styles.childrenLabel,
    disabled ? styles.childrenLabelDisabled : "",
  );

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <div className={containerStyle}>
      <div className={composeStyles(styles.checkbox, styles.size[size])}>
        <input
          id={uuid}
          ref={inputRef}
          type="checkbox"
          className={styles.input}
          disabled={disabled}
          name={name}
          checked={currentValue}
          onChange={handleChange}
        />
        <label className={labelStyle} htmlFor={uuid}>
          {currentValue && (
            <div className={styles.iconBox}>
              <Icon
                type="check"
                color="#fff"
                size={convertSize[size] as IconSize}
              />
            </div>
          )}
        </label>
      </div>
      {children && (
        <span
          onClick={() => {
            if (!disabled) {
              inputRef.current!.click();
            }
          }}
          className={childrenLabelStyle}
        >
          <Text
            size={convertSize[size] as IconSize}
            color={disabled ? "#c9c9c9" : "#262626"}
          >
            {children}
          </Text>
        </span>
      )}
    </div>
  );
};

export default Checkbox;
