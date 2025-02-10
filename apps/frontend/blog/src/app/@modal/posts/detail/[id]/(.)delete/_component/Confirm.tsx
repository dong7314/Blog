"use client";

import * as styles from "./Confirm.css";

import { Text } from "@frontend/coreui";

export default function Confirm() {
  return (
    <div>
      <Text className={styles.confirmText}>
        게시글을 삭제하신 후에는 정보를 복구할 수 없습니다.
      </Text>
      <Text className={styles.confirmText}>
        게시글 삭제를 원하시면 버튼을 눌러주세요.
      </Text>
    </div>
  );
}
