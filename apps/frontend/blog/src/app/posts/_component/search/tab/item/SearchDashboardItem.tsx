"use client";
import * as styles from "./SearchDashboardItem.css";

import { Post as IPost } from "@/app/_model/Post.model";

type Props = {
  data: IPost;
};
export default function SearchDashboardItem({ data }: Props) {
  return <div className={styles.itemContent}></div>;
}
