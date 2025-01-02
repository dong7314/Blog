import * as styles from "./page.css";

import Dashboard from "./_component/dashboard/Dashboard";

export default function PostPage() {
  return (
    <div className={styles.posts}>
      <Dashboard />
    </div>
  );
}
