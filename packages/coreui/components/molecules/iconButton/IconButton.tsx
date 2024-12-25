import React, { ReactNode, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./IconButton.css";

import { Icon } from "../../atom/icon/Icon";
import { IconType } from "../../atom/icon/Icon.type";
import { IconButtonSize } from "./IconButton.type";

export interface IconButtonProps {
  /** 아이콘 버튼 종류 설정 */
  type: IconType;
  /** 아이콘 버튼 사이즈 설정 */
  size?: IconButtonSize;
  /** 아이콘 버튼의 아이콘 색상 설정 */
  color?: string;
  /** 아이콘 버튼의 아이콘 호버 색상 설정 */
  hoverColor?: string;
  /** 아이콘 버튼 비활성화 */
  disabled?: boolean;
  /** 클릭 시 동작할 함수 */
  onClick?: () => void;
}

export const IconButton = ({
  type,
  size = "m",
  color = "#595959",
  hoverColor,
  disabled = false,
  onClick,
}: IconButtonProps) => {
  const [currentColor, setCurrentColor] = useState(color);

  const iconButtonStyle = composeStyles(
    styles.iconButton,
    styles.iconButtonSize[size],
    disabled ? styles.disabled : "",
  );

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  useEffect(() => {
    setCurrentColor(disabled ? "#c9c9c9" : color);
  }, [disabled]);

  return (
    <div
      className={iconButtonStyle}
      onMouseEnter={() => {
        if (!disabled && hoverColor) {
          setCurrentColor(hoverColor);
        }
      }}
      onMouseLeave={() => {
        if (!disabled) {
          setCurrentColor(color);
        }
      }}
      onClick={handleClick}
    >
      <Icon type={type} size={size} color={currentColor}></Icon>
    </div>
  );
};

export default IconButton;
