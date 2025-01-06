import * as styles from "./page.css";

import { Input, Text, Textarea } from "@frontend/coreui";
import CreateEditor from "./createEditor/CreateEditor";
import CreateTags from "./createTags/CreateTags";
import ImagePicker from "./imagePicker/ImagePicker";

export default function CreatePostPage() {
  return (
    <div className={styles.create}>
      <div className={styles.createInfo}>
        <div className={styles.createInput}>
          <Input
            label="제목"
            placeholder="게시될 포스트의 제목을 입력해 주세요."
          />
        </div>
        <div className={styles.createTextarea}>
          <Textarea
            label="게시글 설명"
            resize="none"
            maxLength={150}
            placeholder="게시될 포스트의 설명을 작성해 주세요."
          />
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
          <ImagePicker />
        </div>
      </div>
      <CreateEditor />
    </div>
  );
}
