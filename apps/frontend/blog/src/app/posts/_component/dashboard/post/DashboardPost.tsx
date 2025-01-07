import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import * as styles from "./DashboardPost.css";

import { Icon, Text, TextButton } from "@frontend/coreui";
import PrePost from "@/app/home/model/Post";
import Link from "next/link";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  data: PrePost;
};

export default function DashboardPost({ data }: Props) {
  const convertDate = (date: Date) => {
    const givenDate = dayjs(date);
    const oneDayAgo = dayjs().subtract(1, "day");
    return givenDate.isBefore(oneDayAgo)
      ? givenDate.format("YYYY년 MM월 DD일")
      : givenDate.fromNow();
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.flexCenter}>
        <Image
          src={data.thumbnail}
          alt={data.title}
          width={380}
          height={290}
          className={styles.image}
        />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <div className={styles.author}>
            <div className={styles.profile}>
              <Image
                src={"/profile.png"}
                alt={"profile-icon"}
                width={28}
                height={28}
                className={styles.profileIcon}
              />
              <TextButton weight={600} size="l">
                {data.author}
              </TextButton>
            </div>
            <Text size="s" color="#a5a5a5">
              {convertDate(data.createdDate)}
            </Text>
          </div>
          <Link href={`/posts/detail/${data.id}`} className={styles.postLink}>
            <div className={styles.title}>
              <Text weight={600} size="dxl">
                {data.title}
              </Text>
            </div>
            <Text color="#595959">
              <div className={styles.content}>{data.content}</div>
            </Text>
          </Link>
        </div>
        <div className={styles.details}>
          <div className={styles.tags}>
            {data.tags.map((tag) => {
              return (
                <Text
                  className={styles.tag}
                  color="#7F7F7F"
                  key={`${data.id}-${tag}`}
                >
                  <span style={{ fontWeight: 500, marginRight: "3px" }}>#</span>
                  {tag}
                </Text>
              );
            })}
          </div>
          <div className={styles.flexCenter}>
            <div className={styles.comments}>
              <Icon type="comment" size="l" />
              <Text className={styles.commentsCounter} color="#595959">
                {data.comment}
              </Text>
            </div>
            <div className={styles.favorites}>
              <Icon type="favorite" size="xl" />
              <Text className={styles.commentsCounter} color="#F9595F">
                {data.likes}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
