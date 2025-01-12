import * as styles from "./DetailFavoritesButton.css";

import { Icon, Text } from "@frontend/coreui";

export default function DetailFavoritesButton() {
  const data = 12;

  return (
    <div className={styles.button}>
      <Icon type="favorite" size="h"></Icon>
      <Text size="l" weight={500} color="#3F3F3F">
        {data}
      </Text>
    </div>
  );
}
