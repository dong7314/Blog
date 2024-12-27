"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

import * as styles from "./SearchBar.css";

import Input from "../../atom/input/Input";
import IconButton from "../iconButton/IconButton";
import { InputRef } from "../../atom/input/Input.type";

export interface SearchBarProps {
  /** input 창에서 엔터 및 검색 아이콘을 클릭할 때 동작할 함수 */
  onSearch?: (value: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const inputRef = useRef<InputRef>(null);

  const handleSearch = () => {
    inputRef.current?.setBlur();
    if (onSearch) {
      onSearch(inputRef.current?.getValue()!);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      // focus 아웃 처리
      handleSearch();
    }
  };

  return (
    <div className={styles.searchBar} onKeyDown={handleKeyDown}>
      <Input
        ref={inputRef}
        size="m"
        rounded={true}
        placeholder="검색어를 입력하세요."
        className={styles.overrideInput}
      />
      <div className={styles.iconButton}>
        <IconButton onClick={handleSearch} type="search" size="l" />
      </div>
    </div>
  );
};

export default SearchBar;
