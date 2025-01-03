import * as styles from "./page.css";

import Editor from "@/app/_component/editor/Editor";
import { Input } from "@frontend/coreui";

export default function CreatePostPage() {
  return (
    <div className={styles.create}>
      <Input />
      <Editor />
    </div>
  );
}
