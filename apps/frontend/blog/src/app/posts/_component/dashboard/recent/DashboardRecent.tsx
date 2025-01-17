"use client";

import { useInView } from "react-intersection-observer";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getPostsRecentlyInfinite } from "@/app/_lib/getPostsRecently";

import { Post as IPost } from "@/app/_model/Post.model";
import { Fragment, useEffect } from "react";
import DashboardPost from "../post/DashboardPost";
import { Loading, Text } from "@frontend/coreui";

export default function DashboardRecent() {
  const queryClient = useQueryClient();
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string, _3: string],
    number
  >({
    queryKey: ["posts", "dashboard", "recently"],
    queryFn: getPostsRecentlyInfinite,
    getNextPageParam: (lastPage, allPages) => {
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
        queryKey: ["posts", "dashboard", "recently"],
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
            {page.length === 0 && (
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
