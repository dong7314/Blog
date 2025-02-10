import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
dayjs.extend(relativeTime);
dayjs.locale("ko");

import * as styles from "./page.css";

import { getPost } from "./_lib/post/getPost";
import { addComma } from "@/app/_lib/addComma";
import { Post as IPost } from "@/app/_model/Post.model";
import { Text, TextButton } from "@frontend/coreui";

import Anchor from "./_component/anchor/Anchor";
import DetailTags from "./_component/tags/DetailTags";
import ProfileIcon from "@/app/_component/profile/ProfileIcon";
import DetailSeries from "./_component/series/DetailSeries";
import DetailViewer from "./_component/viewer/DetailViewer";
import DetailProfile from "./_component/profile/DetailProfile";
import DetailFavoritesButton from "./_component/favorites/DetailFavoritesButton";
import DetailCommentsContainer from "./_component/comments/DetailCommentsContainer";
import DeletePostTextButton from "./_component/button/DeletePostButton";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function DetailPage({ params }: Props) {
  const session = await auth();
  const { id } = await params;
  const postId = parseInt(id);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["post", "detail"],
    queryFn: () => getPost(postId),
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
                <ProfileIcon
                  size={24}
                  name={data.author.name}
                  thumbnail={data.author.thumbnail}
                  className={styles.profileIcon}
                />
                <TextButton weight={600}>{data.author.name}</TextButton>
              </span>
              <span className={styles.infoSpan}>
                <Text color="#595959" lineHeight="150%">
                  <span style={{ letterSpacing: 0.4 }}>
                    {convertDate(data.createdDate!)}
                  </span>{" "}
                </Text>
                <Text color="#595959" lineHeight="150%">
                  &nbsp;&nbsp;•&nbsp;&nbsp;
                  <span style={{ letterSpacing: 0.6 }}>
                    {addComma(data.viewCount)}
                  </span>{" "}
                  읽음
                </Text>
              </span>
            </div>
            {session?.user.id === `${data.author.id}` && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "4px",
                  paddingRight: "1px",
                }}
              >
                <Link href={`/posts/update/${postId}`}>
                  <TextButton size="s">수정</TextButton>
                </Link>
                <span>&nbsp;</span>
                <DeletePostTextButton postId={data.id} />
              </div>
            )}
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
              <DetailFavoritesButton favorites={data.likes} postId={postId} />
            </div>
            <DetailProfile author={data.author} />
            {data.series && (
              <DetailSeries series={data.series} postId={postId} />
            )}
            <DetailCommentsContainer postId={postId} />
          </div>
        </div>
      )}
    </HydrationBoundary>
  );
}
