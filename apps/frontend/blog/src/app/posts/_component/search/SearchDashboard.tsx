"use client";

import * as styles from "./SearchDashboard.css";

import { Text } from "@frontend/coreui";
import SearchDashboardTag from "./tab/tag/SearchDashboardTag";
import SearchDashboardWord from "./tab/word/SearchDashboardWord";

type Props = {
  tag: string;
  search: string;
};
export default function SearchDashboard({ search, tag }: Props) {
  return (
    <>
      <h2 className={styles.h2}>
        <span className={styles.content}>
          <Text size="h" weight={600} customSize="1.75rem">
            "{search || tag}"
          </Text>
          <Text customSize="1.625rem">
            &nbsp;{search && "단어"}
            {tag && "태그"}에 대한 검색 결과입니다.
          </Text>
        </span>
      </h2>
      <div className={styles.container}>
        {tag && <SearchDashboardTag keyword={tag} />}
        {search && <SearchDashboardWord keyword={search} />}
      </div>
    </>
  );
}
