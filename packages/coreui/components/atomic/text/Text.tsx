import React, { ReactNode } from 'react';

import * as styles from './Text.css';

export interface TextProps {
  /** 폰트 색상 설정 */
  color?: string;
  /** 폰트 크기 설정 */
  size?: 'dxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'dxl';
  /** 폰트 굵기 */
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold';
  /** 폰트 내용 */
  children: ReactNode;
}

export const Text = ({
  size = 'm',
  color = '#262626',
  weight = 400,
  children,
  ...props
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
