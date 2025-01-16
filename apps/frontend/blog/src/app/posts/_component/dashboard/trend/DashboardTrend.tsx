"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getPostsPopularityInfinite } from "@/app/_lib/getPostsPopularity";

import { Post as IPost } from "@/app/_model/Post.model";
import { Fragment } from "react";
import DashboardPost from "../post/DashboardPost";

export default function DashboardTrend() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string, _3: string],
    number
  >({
    queryKey: ["posts", "dashboard", "popularity"],
    queryFn: getPostsPopularityInfinite,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return null;
      return allPages.flat().length;
    },
    initialPageParam: 0,
  });

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
          </Fragment>
        );
      })}
    </>
  );
}
