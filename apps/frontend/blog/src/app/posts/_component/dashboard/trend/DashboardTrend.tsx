"use client";

import { useInView } from "react-intersection-observer";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getPostsPopularityInfinite } from "@/app/_lib/getPostsPopularity";

import { Post as IPost } from "@/app/_model/Post.model";
import { Fragment, useEffect } from "react";
import DashboardPost from "../post/DashboardPost";
import { Period } from "../Dashboard";
import { Loading, Text } from "@frontend/coreui";

type Props = {
  period: Period;
};
export default function DashboardTrend({ period }: Props) {
  const queryClient = useQueryClient();
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string, _3: string, _4: string],
    number
  >({
    queryKey: ["posts", "dashboard", "popularity", period],
    queryFn: ({ pageParam = 0 }) =>
      getPostsPopularityInfinite(pageParam, period),
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
      {data?.pages.map((page: any, index: number) => {
        return (
          <Fragment key={index}>
            {page.map((post: IPost) => {
              return (
                <DashboardPost key={`dashboard-post-${post.id}`} data={post} />
              );
            })}
            {page.length === 0 && (
              <Text color="#595959" size="s">
                게시글이 존재하지 않습니다.
              </Text>
            )}
          </Fragment>
        );
      })}
      {isFetching && <Loading size="l" />}
      {hasNextPage && <div ref={ref} style={{ height: 10 }}></div>}
    </>
  );
}
