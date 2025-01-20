import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import * as styles from "./page.css";

import { getPost } from "./_lib/getPost";
import { Text, TextButton } from "@frontend/coreui";

import Anchor from "./_component/anchor/Anchor";
import DetailTags from "./_component/tags/DetailTags";
import DetailSeries from "./_component/series/DetailSeries";
import DetailViewer from "./_component/viewer/DetailViewer";
import DetailProfile from "./_component/profile/DetailProfile";
import DetailComments from "./_component/comments/DetailComments";
import DetailFavoritesButton from "./_component/favorites/DetailFavoritesButton";
import { Post as IPost } from "@/app/_model/Post.model";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  params: Promise<{ id: number }>;
};
export default async function DetailPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["post", "detail"],
    queryFn: () => getPost(id),
  });
  const dehydratedState = dehydrate(queryClient);
  // React Query 상태에서 데이터를 직접 추출
  const data: IPost | undefined = queryClient.getQueryData(["post", "detail"]);

  const convertDate = (date: Date) => {
    const givenDate = dayjs(date);
    const oneDayAgo = dayjs().subtract(1, "day");
    return givenDate.isBefore(oneDayAgo)
      ? givenDate.format("YYYY년 MM월 DD일")
      : givenDate.fromNow();
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      {data && (
        <div className={styles.detail}>
          <div className={styles.header}>
            <div className={styles.title}>
              <Text size="xh" weight={700}>
                {data.title}
              </Text>
            </div>
            <div className={styles.info}>
              <span className={styles.infoSpan}>
                <Image
                  src={"/profile.png"}
                  alt={"profile-icon"}
                  width={24}
                  height={24}
                  className={styles.profileIcon}
                />
                <TextButton weight={600}>{data.author.name}</TextButton>
              </span>
              <span className={styles.infoSpan}>
                <Text color="#595959" lineHeight="150%">
                  {convertDate(data.createdDate!)}
                </Text>
                <Text color="#595959" lineHeight="150%">
                  &nbsp;&nbsp;•&nbsp;&nbsp;{data.viewCount} 읽음
                </Text>
              </span>
            </div>
            {data.tags.length > 0 && (
              <div className={styles.tags}>
                <DetailTags tags={data.tags} />
              </div>
            )}
          </div>
          <div className={styles.content}>
            <DetailViewer content={data.content} imgUrl={data.thumbnail} />
            <Anchor />
          </div>
          <div className={styles.subContent}>
            <div className={styles.favorites}>
              <DetailFavoritesButton favorites={data.likes} postId={id} />
            </div>
            <DetailProfile author={data.author} />
            {/* <DetailSeries /> */}
            <DetailComments postId={id} />
          </div>
        </div>
      )}
    </HydrationBoundary>
  );
}
