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
  /** 클릭 시 동작할 함수 */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  type = "tertiary",
  size = "m",
  disabled = false,
  onClick,
  children,
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
      l: "l",
    })[size] as TextSize;

  const fontColor = disabled ? getDisabledFontColor(type) : getFontColor(type);
  const fontSize = getFontSize(size);
  const buttonStyle = composeStyles(
    styles.base,
    styles.size[size],
    styles.type[type],
    disabled ? styles.disabled[type] : "",
  );

  return (
    <button type="button" onClick={onClick} className={buttonStyle}>
      <Text color={fontColor} size={fontSize}>
        {children}
      </Text>
    </button>
  );
};

export default Button;
