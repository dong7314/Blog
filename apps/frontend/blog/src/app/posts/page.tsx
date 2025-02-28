import * as styles from "./page.css";

import Dashboard from "./_component/dashboard/Dashboard";
import SearchDashboard from "./_component/search/SearchDashboard";

type Props = {
  searchParams: {
    search?: string;
    tag?: string;
    tab?: string;
  };
};
export default async function PostPage({ searchParams }: Props) {
  const { search, tag, tab } = await searchParams;

  return (
    <div className={styles.posts}>
      {(search || tag) && (
        <SearchDashboard search={search || ""} tag={tag || ""} />
      )}
      {!(search || tag) && <Dashboard />}
    </div>
  );
}
