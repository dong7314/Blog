"use client";

import React, { useRef } from "react";
import Select, { components } from "react-select";

import * as styles from "./ReactSelect.css";

import Icon from "../icon/Icon";
import { OptionType, SelectSize } from "./Select.type";
import { composeStyles } from "@vanilla-extract/css";

// 커스텀 DropdownIndicator
const CustomDropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon type={props.isFocused ? "up" : "down"} />
    </components.DropdownIndicator>
  );
};

// 고차 컴포넌트 (HOC)
const withSize =
  (
    CustomOption: any,
    size: SelectSize,
    selectRef: React.RefObject<Select | null>,
  ) =>
  (props: any) => {
    return <CustomOption {...props} size={size} selectRef={selectRef} />;
  };

// 커스텀 Option 컴포넌트
const CustomOption = (props: any) => {
  const { data, innerRef, innerProps, size, selectRef } = props;

  return (
    <span
      ref={innerRef}
      {...innerProps}
      onClick={(e) => {
        innerProps.onClick(e);

        if (selectRef.current) {
          selectRef.current.blur();
        }
      }}
      className={composeStyles(styles.option, styles.size[size as SelectSize])}
    >
      {data.label}
      {props.isSelected && <Icon type="check" />}
    </span>
  );
};

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: "white",
    minHeight: "32px",
    height: "100%",
    transition: "all .2s ease-out",
    outline: "2px solid transparent",
    outlineColor: state.isFocused ? "#66A3FF" : "transparent",
    "&:hover": {
      cursor: "pointer",
      borderColor: "#A5A5A5",
    },
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#c9c9c9",
  }),
};

type Props = {
  id: string;
  name?: string;
  size: SelectSize;
  placeholder?: string;
  options?: OptionType[];
  defaultValue?: OptionType;
  onChange?: Function;
};
export const ReactSelect = ({
  id,
  name,
  size,
  placeholder = "",
  options,
  defaultValue,
  onChange,
}: Props) => {
  const selectRef = useRef(null);

  return (
    <div className={styles.reactSelectContainer}>
      <Select
        ref={selectRef}
        instanceId={id}
        id={id}
        name={name}
        className={styles.reactSelect}
        options={options}
        defaultValue={defaultValue}
        placeholder={placeholder}
        isSearchable={false}
        styles={customStyles}
        noOptionsMessage={() => "옵션이 없습니다."}
        components={{
          IndicatorSeparator: null,
          Option: withSize(CustomOption, size, selectRef),
          DropdownIndicator: CustomDropdownIndicator,
        }}
        onChange={(e: any) => {
          if (onChange) onChange(e.value);
        }}
      />
    </div>
  );
};
