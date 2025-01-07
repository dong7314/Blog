import * as styles from "./page.css";

import { Input, Text, Textarea } from "@frontend/coreui";
import CreateEditor from "./_component/editor/CreateEditor";
import CreateTags from "./_component/tags/CreateTags";
import ImagePicker from "./_component/imagePicker/ImagePicker";
import CreateTitleInput from "./_component/title/CreateTitleInput";
import CreateDescriptionTextarea from "./_component/description/CreateDescriptionTextarea";

export default function CreatePostPage() {
  return (
    <div className={styles.create}>
      <div className={styles.createInfo}>
        <div className={styles.createInput}>
          <CreateTitleInput />
        </div>
        <div className={styles.createTextarea}>
          <CreateDescriptionTextarea />
        </div>
        <div className={styles.createInput}>
          <Text size="s" color="#262626" className={styles.createLabel}>
            태그
          </Text>
          <CreateTags />
        </div>
        <div className={styles.createInput}>
          <Text size="s" color="#262626" className={styles.createLabel}>
            썸네일
          </Text>
          <ImagePicker />
        </div>
        <div className={styles.createInput}>
          <Text size="s" color="#262626" className={styles.createLabel}>
            시리즈 설정
          </Text>
          <div className={styles.exampleSeries}></div>
        </div>
      </div>
      <CreateEditor />
    </div>
  );
}
