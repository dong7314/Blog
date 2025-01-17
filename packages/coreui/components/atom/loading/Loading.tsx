"use client";

import React, { useId } from "react";

import * as styles from "./Loading.css";

import { LoadingSize } from "./Loading.type";
import Text from "../text/Text";

export interface LoadingProps {
  /** 로딩 사이즈 설정 */
  size?: LoadingSize;
  /** 로딩 메세지 */
  message?: string;
}

/** Primary UI component for user interaction */
export const Loading = ({ size = "m", message }: LoadingProps) => {
  const uuid = useId();
  const sizes = {
    t: "1rem",
    s: "1.5rem",
    m: "2.25rem",
    l: "3rem",
    xl: "3.5rem",
  };

  return (
    <div className={styles.loadingContainer}>
      <svg
        className={styles.loading}
        xmlns="http://www.w3.org/2000/svg"
        width={sizes[size]}
        height={sizes[size]}
        viewBox="0 0 44 44"
        fill="none"
      >
        <ellipse
          cx="22"
          cy="21.9961"
          rx="16.082"
          ry="16.082"
          transform="rotate(-90 22 21.9961)"
          stroke="#0066FF"
          strokeOpacity="0.25"
          strokeWidth="4.5"
        />
        <path
          d="M5.91675 21.8315C5.96143 17.5666 7.69853 13.494 10.7459 10.5098C13.7933 7.52559 17.9014 5.87418 22.1663 5.91885"
          stroke={`url(#paint0_linear_3249_1037_${uuid})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeDasharray="0.1 0.1"
        />
        <defs>
          <linearGradient
            id={`paint0_linear_3249_1037_${uuid}`}
            x1="30.1142"
            y1="8.11629"
            x2="13.8816"
            y2="35.8837"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0066FF" />
            <stop offset="0.755208" stopColor="#0066FF" stopOpacity="0.01" />
            <stop offset="1" stopColor="#0066FF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      {message && (
        <Text className={styles.loadingMessage} size={size}>
          {message}
        </Text>
      )}
    </div>
  );
};

export default Loading;
