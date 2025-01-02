import * as styles from "./page.css";

import { Text } from "@frontend/coreui";
import PostCarousel from "./_component/carousel/PostCarousel";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <section className={styles.section}>
        <h2 className={styles.title}>
          <Text size="h" weight="bold">
            인기 포스트
          </Text>
        </h2>
        <PostCarousel />
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>
          <Text size="h" weight="bold">
            최신 포스트
          </Text>
        </h2>
        <PostCarousel />
      </section>
    </div>
  );
}
