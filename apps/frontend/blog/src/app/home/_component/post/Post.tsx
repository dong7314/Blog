import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import * as styles from "./Post.css";

import { Icon, Text, TextButton } from "@frontend/coreui";
import { Post as IPost } from "@/app/_model/Post.model";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  data: IPost;
};

export default function Post({ data }: Props) {
  const convertDate = (date: Date) => {
    const givenDate = dayjs(date);
    // 1주일 전 기준
    const oneWeekAgo = dayjs().subtract(1, "week");

    if (givenDate.isBefore(oneWeekAgo)) {
      // 1주일을 넘은 경우 날짜 형식으로 반환
      return givenDate.format("YYYY년 MM월 DD일");
    } else {
      // 1주일 이내인 경우 상대 시간 반환
      return givenDate.fromNow();
    }
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.imageContainer}>
        <Image
          src={data.thumbnail.trim() !== "" ? data.thumbnail : "/thumbnail.png"}
          alt={data.title}
          priority
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.imageHover}
        />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <div className={styles.header}>
            <Text className={styles.title} size="l" weight={700}>
              {data.title}
            </Text>
            <span className={styles.favorites}>
              <Icon type="favorite" size="l" />
              <Text
                className={styles.likes}
                size="s"
                weight={500}
                color="#F9595F"
              >
                {data.likes.length}
              </Text>
            </span>
          </div>
          <Text size="s" className={styles.description} color="#595959">
            {data.description ? data.description : data.content}
          </Text>
        </div>
        <div className={styles.details}>
          <Text size="xs" color="#a5a5a5">
            {convertDate(data.createdDate)} • {data.comments.length}개의 댓글
          </Text>
          <div className={styles.author}>
            <span className={styles.by}>by</span>
            <TextButton size="xs" weight={600}>
              {data.author.name}
            </TextButton>
          </div>
        </div>
      </div>
    </div>
  );
}
