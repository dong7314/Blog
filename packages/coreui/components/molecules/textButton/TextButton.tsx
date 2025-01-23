"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { composeStyles, style } from "@vanilla-extract/css";

import * as styles from "./TextButton.css";

import { Text } from "../../../components/atom/text/Text";
import { TextButtonSize, TextButtonWeight } from "./TextButton.type";

export interface TextButtonProps {
  /** 텍스트 버튼 사이즈 설정 */
  size?: TextButtonSize;
  /** 텍스트 버튼의 폰트 색상 설정 */
  color?: string;
  /** 텍스트 버튼의 폰트 굴기 설정 */
  weight?: TextButtonWeight;
  /** 텍스트 버튼 비활성화 */
  disabled?: boolean;
  /** 텍스트 버튼 내용용 */
  children: ReactNode;
  /** 클릭 시 동작할 함수 */
  onClick?: () => void;
}

export const TextButton = ({
  size = "m",
  color = "#262626",
  weight = 400,
  disabled = false,
  children,
  onClick,
}: TextButtonProps) => {
  const [isHover, setIsHover] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);

  const textButtonStyle = composeStyles(
    styles.textButton,
    disabled ? styles.disabled : "",
  );

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  useEffect(() => {
    setCurrentColor(disabled ? "#c9c9c9" : color);
  }, [disabled]);

  return (
    <div
      className={textButtonStyle}
      style={{
        borderColor: isHover && !disabled ? currentColor : "transparent",
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Text color={currentColor} size={size} weight={weight}>
        {children}
      </Text>
    </div>
  );
};

export default TextButton;
