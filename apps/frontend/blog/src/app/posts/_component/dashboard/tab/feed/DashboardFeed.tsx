"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import * as styles from "./DashboardFeed.css";

import { Post as IPost } from "@/app/_model/Post.model";
import { Loading, Text, TextButton } from "@frontend/coreui";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getPostsFeedInfinite } from "@/app/posts/_lib/getPostsFeedInfinite";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";
import DashboardPost from "../../post/DashboardPost";

export default function DashboardFeed() {
  const router = useRouter();
  const session = useSession();

  const handleRedirectLogin = () => {
    router.push("/login");
  };

  if (!session.data) {
    return (
      <>
        <Text color="#595959" className={styles.notLoginDescription}>
          로그인 이후 피드 게시글 목록을 확인하실 수 있습니다.
        </Text>
        <TextButton onClick={handleRedirectLogin} color="#262626">
          로그인 하러 가기
        </TextButton>
      </>
    );
  }

  const queryClient = useQueryClient();
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string, _3: string],
    number
  >({
    queryKey: ["posts", "dashboard", "feed"],
    queryFn: ({ pageParam = 0 }) =>
      getPostsFeedInfinite(pageParam, `${session.data.user.accessToken ?? ""}`),
    getNextPageParam: (lastPage: any, allPages: any) => {
      if (lastPage.length < 6) return null;
      return allPages.length;
    },
    initialPageParam: 0,
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ["posts", "dashboard", "popularity"],
      });
    };
  }, []);

  return (
    <>
      {data?.pages.map((page, index) => {
        return (
          <Fragment key={index}>
            {page.map((post) => {
              return (
                <DashboardPost key={`dashboard-post-${post.id}`} data={post} />
              );
            })}
            {data?.pages.flat().length === 0 && (
              <Text color="#595959">게시글이 존재하지 않습니다.</Text>
            )}
          </Fragment>
        );
      })}
      {isFetching && <Loading />}
      {hasNextPage && <div ref={ref} style={{ height: 10 }}></div>}
    </>
  );
}
