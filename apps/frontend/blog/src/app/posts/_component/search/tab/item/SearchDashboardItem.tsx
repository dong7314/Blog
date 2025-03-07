"use client";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import * as styles from "./SearchDashboardItem.css";

import { Icon, Text, TextButton } from "@frontend/coreui";
import { Post as IPost } from "@/app/_model/Post.model";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  data: IPost;
};
export default function SearchDashboardItem({ data }: Props) {
  const router = useRouter();

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

  const moveDetailPage = (id: number) => {
    router.push(`/posts/detail/${id}`);
  };

  return (
    <div className={styles.itemContent} onClick={() => moveDetailPage(data.id)}>
      <Text weight={600} size="xl" className={styles.title}>
        {data.title}
      </Text>
      <div className={styles.itemCenter}>
        <Image
          src={data.thumbnail.trim() !== "" ? data.thumbnail : "/thumbnail.png"}
          priority
          alt={data.title}
          width={200}
          height={135}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className={styles.image}
        />
        <Text className={styles.itemCenterText} size="s">
          {data.description || data.content}
        </Text>
      </div>
      <div className={styles.itemFooter}>
        <div className={styles.flex}>
          <Text size="xs" color="#a5a5a5">
            {convertDate(data.createdDate)} • {data.comments.length}개의 댓글
            •&nbsp;
          </Text>
          <Icon type="favorite_fill" size="xs"></Icon>
          <Text size="xs" color="#f9595f">
            &nbsp;{data.likes.length}
          </Text>
        </div>
        <div className={styles.flex}>
          <Text size="xs">by&nbsp;&nbsp;</Text>
          <TextButton size="xs" weight={600}>
            {data.author.name}
          </TextButton>
        </div>
      </div>
    </div>
  );
}
