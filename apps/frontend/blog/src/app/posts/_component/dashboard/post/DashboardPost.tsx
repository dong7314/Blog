import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import * as styles from "./DashboardPost.css";

import { Icon, Text, TextButton } from "@frontend/coreui";
import { Post as IPost } from "@/app/_model/Post.model";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  data: IPost;
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
    <article className={styles.article}>
      <div className={styles.postContainer}>
        <div className={styles.flexCenter}>
          <Image
            src={
              data.thumbnail.trim() !== "" ? data.thumbnail : "/thumbnail.png"
            }
            priority
            alt={data.title}
            width={390}
            height={290}
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
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
                  {data.author.name}
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
                <div className={styles.content}>
                  {data.content.replace(/#/g, "")}
                </div>
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
                    key={`tag-${data.id}-${tag.id}`}
                  >
                    <span style={{ fontWeight: 500, marginRight: "3px" }}>
                      #
                    </span>
                    {tag.name}
                  </Text>
                );
              })}
            </div>
            <div className={styles.flexCenter}>
              <Link href={`/posts/detail/${data.id}#comment-${data.id}`}>
                <div className={styles.comments}>
                  <Icon type="comment" size="l" />
                  <Text className={styles.commentsCounter} color="#595959">
                    {data.comments.length}
                  </Text>
                </div>
              </Link>
              <div className={styles.favorites}>
                <Icon type="favorite_fill" size="xl" />
                <Text className={styles.commentsCounter} color="#F9595F">
                  {data.likes.length}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
