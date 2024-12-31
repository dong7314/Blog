import * as styles from "./page.css";

import PrePost from "./model/PrePost";
import PostCarousel from "./_component/carousel/PostCarousel";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <PostCarousel />
    </div>
  );
}
