"use client";

import React, { ReactNode, useEffect, useId, useState } from "react";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./Select.css";

import { ReactSelect } from "./ReactSelect";
import { OptionType, SelectSize } from "./Select.type";

export interface SelectProps {
  /** select 타입 설정 */
  name?: string;
  /** select 사이즈 설정 */
  size?: SelectSize;
  /** select 미리 보기 */
  placeholder?: string;
  /** select 옵션 설정 */
  options?: OptionType[];
  /** 옵션 초기 설정 */
  defaultValue?: OptionType;
  /** select value 변경 시 동작할 함수 */
  onChange?: (value: any) => void;
}

/** Primary UI component for user interaction */
export const Select = ({
  name,
  size = "m",
  placeholder,
  options,
  defaultValue,
  onChange,
}: SelectProps) => {
  const uuid = useId();

  const containerStyles = composeStyles(
    styles.selectContainer,
    styles.size[size],
  );

  return (
    <div className={containerStyles}>
      <ReactSelect
        id={uuid}
        name={name}
        size={size}
        placeholder={placeholder}
        options={options}
        defaultValue={defaultValue}
        onChange={onChange}
      ></ReactSelect>
    </div>
  );
};

export default Select;
