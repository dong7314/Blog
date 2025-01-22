"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./Button.css";

import { Text } from "../text/Text";
import { Icon } from "../icon/Icon";
import { TextSize } from "../text/Text.type";
import { ButtonType, ButtonSize } from "./Button.type";

export interface ButtonProps {
  /** 버튼 타입 설정 */
  type?: ButtonType;
  /** 버튼 사이즈 설정 */
  size?: ButtonSize;
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 버튼 텍스트 */
  children: ReactNode;
  /** 라운디 버튼 텍스트 */
  rounded?: boolean;
  /** 버튼 기능 */
  feature?: "button" | "reset" | "submit";
  /** 클릭 시 동작할 함수 */
  onClick?: () => void;
  /** 버튼에 style 커스텀 설정 */
  className?: string;
}

/** Primary UI component for user interaction */
export const Button = ({
  type = "tertiary",
  size = "m",
  disabled = false,
  rounded = false,
  feature = "button",
  onClick,
  children,
  className,
}: ButtonProps) => {
  /** Text 컴포넌트에 적용할 폰트 색상을 결정 */
  const getFontColor = (type: ButtonType) =>
    ({
      primary: "#fff",
      negative: "#fff",
      secondary: "#0066ff",
      tertiary: "#595959",
    })[type];

  const getDisabledFontColor = (type: ButtonType) =>
    ({
      primary: "#fff",
      negative: "#fff",
      secondary: "#99C2FF",
      tertiary: "#E6E6E6",
    })[type];

  /** Text 컴포넌트에 적용할 폰트 사이즈를 결정 */
  const getFontSize = (size: ButtonSize): TextSize =>
    ({
      t: "xs",
      s: "s",
      m: "s",
      l: "s",
      xl: "m",
    })[size] as TextSize;

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const fontColor = disabled ? getDisabledFontColor(type) : getFontColor(type);
  const fontSize = getFontSize(size);
  const buttonStyle = composeStyles(
    styles.base,
    styles.size[size],
    styles.type[type],
    rounded ? styles.rounded[size] : "",
    disabled ? styles.disabled[type] : "",
    className ?? "",
  );

  return (
    <button type={feature} onClick={handleClick} className={buttonStyle}>
      <Text color={fontColor} size={fontSize} weight={500}>
        {children}
      </Text>
    </button>
  );
};

export default Button;
