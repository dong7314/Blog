"use client";

import React, { ReactNode } from "react";

import * as styles from "./Text.css";

import { TextSize, TextWeight } from "./Text.type";
import { composeStyles } from "@vanilla-extract/css";

export interface TextProps {
  /** 폰트 색상 설정 */
  color?: string;
  /** 폰트 크기 설정 */
  size?: TextSize;
  /** 폰트 커스텀 크기 설정 */
  customSize?: string;
  /** 폰트 굵기 */
  weight?: TextWeight;
  /** 폰트 라인 높이 */
  lineHeight?: string;
  /** 폰트 내용 */
  children: ReactNode;
  /** text에 style 커스텀 설정 */
  className?: string;
}

export const Text = ({
  size = "m",
  color = "#262626",
  weight = 400,
  children,
  customSize,
  lineHeight,
  className,
}: TextProps) => {
  const textStyle = composeStyles(
    styles.fontSize[size],
    className ? className : "",
  );

  return (
    <div
      className={textStyle}
      style={{
        color,
        fontWeight: weight,
        lineHeight,
        fontSize: customSize ?? "",
      }}
    >
      {children}
    </div>
  );
};

export default Text;
