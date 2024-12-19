import React, { ReactNode } from 'react';

import * as styles from './Text.css';

import { TextSize, TextWeight } from './Text.type';

export interface TextProps {
  /** 폰트 색상 설정 */
  color?: string;
  /** 폰트 크기 설정 */
  size?: TextSize;
  /** 폰트 굵기 */
  weight?: TextWeight;
  /** 폰트 내용 */
  children: ReactNode;
}

export const Text = ({
  size = 'm',
  color = '#262626',
  weight = 400,
  children,
}: TextProps) => {
  
  return (
    <div
      className={styles.fontSize[size]}
      style={{ color, fontWeight: weight }}
    >
      {children}
    </div>
  );
};

export default Text;