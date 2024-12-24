import React, { ReactNode, useEffect, useState } from "react";
import DOMPurify from "dompurify";

import * as styles from "./Icon.css";

import { icons } from "./Icon.content";
import { IconSize, IconType } from "./Icon.type";

export interface IconProps {
  /** 아이콘 종류 설정 */
  type: IconType;
  /** 아이콘 사이즈 설정 */
  size?: IconSize;
  /** 아이콘 색상 설정 */
  color?: string;
  /** 아이콘 호버 색상 설정 */
  hoverColor?: string;
}

export const Icon = ({
  type,
  size = "m",
  color = "#595959",
  hoverColor,
}: IconProps) => {
  const [strokeColor, setStrokeColor] = useState(color);
  const IconComponent = icons[type];
  const sizes = { xs: "12", s: "14", m: "16", l: "18", xl: "20" };

  if (!IconComponent) {
    return null;
  }

  useEffect(() => {
    setStrokeColor(color);
  }, [color]);

  return (
    <div
      className={styles.icon}
      onMouseEnter={() => {
        if (hoverColor) {
          setStrokeColor(hoverColor); // hover 시 색상 변경
        }
      }}
      onMouseLeave={() => {
        setStrokeColor(color); // hover 끝나면 원래 색상으로 되돌리기
      }}
    >
      {React.cloneElement(IconComponent, {
        width: sizes[size],
        height: sizes[size],
        children: React.Children.map(IconComponent.props.children, (child) => {
          if (React.isValidElement(child) && child.type === "path") {
            return React.cloneElement(child, {
              stroke: strokeColor,
              style: { transition: "all .2s ease-out" },
            } as any);
          }
          return child;
        }),
      })}
    </div>
  );
};

export default Icon;
