"use client";

import * as styles from "./Confirm.css";

import { Text } from "@frontend/coreui";

export default function Confirm() {
  return (
    <div>
      <Text className={styles.confirmText}>
        수정을 취소하시게 되면 변경된 내용은 사라집니다.
      </Text>
      <Text className={styles.confirmText}>
        취소를 원하시면 나가기 버튼을 눌러주세요.
      </Text>
    </div>
  );
}
