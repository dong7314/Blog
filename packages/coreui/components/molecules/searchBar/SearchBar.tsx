import React, { ReactNode, useEffect, useState } from "react";

import * as styles from "./SearchBar.css";

import Input from "../../atom/input/Input";
import IconButton from "../iconButton/IconButton";

export interface SearchBarProps {
  /** 클릭 시 동작할 함수 */
  onClick?: () => void;
}

export const SearchBar = ({ onClick }: SearchBarProps) => {
  return (
    <div className={styles.searchBar}>
      <Input
        rounded={true}
        size="m"
        placeholder="검색어를 입력하세요."
        className={styles.overrideInput}
      />
      <div className={styles.iconButton}>
        <IconButton type="search" size="l" />
      </div>
    </div>
  );
};

export default SearchBar;
