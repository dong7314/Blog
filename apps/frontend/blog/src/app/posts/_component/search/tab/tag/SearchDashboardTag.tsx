"use client";
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";

import * as styles from "./SearchDashboardTag.css";

import { Text } from "@frontend/coreui";
import { Post as IPost } from "@/app/_model/Post.model";
import SearchDashboardItem from "../item/SearchDashboardItem";
import { getCountByTags } from "@/app/posts/_lib/getCountByTags";
import { getPostsByTagsInfinite } from "@/app/posts/_lib/getPostsByTags";

type Props = {
  keyword: string;
};
export default function SearchDashboardTag({ keyword }: Props) {
  const queryClient = useQueryClient();
  const { data: count } = useQuery({
    queryKey: ["posts", "dashboard", "tags", "count", keyword],
    queryFn: () => getCountByTags(keyword),
  });
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string, _3: string, _4: string],
    number
  >({
    queryKey: ["posts", "dashboard", "tags", keyword],
    queryFn: ({ pageParam = 0 }) => getPostsByTagsInfinite(pageParam, keyword),
    getNextPageParam: (lastPage: any, allPages: any) => {
      if (lastPage.length < 12) return null;
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
        queryKey: ["posts", "dashboard", "tags"],
        exact: false,
      });
    };
  }, []);

  return (
    <div className={styles.wordContainer}>
      <div className={styles.countContainer}>
        <Text color="#3f3f3f">
          총 <span className={styles.count}>{count}</span>개의 게시글
        </Text>
      </div>
      <div className={styles.postItemContainer}>
        {data?.pages.map((page: any, index: number) => {
          return (
            <Fragment key={index}>
              {page.map((post: IPost) => {
                return <SearchDashboardItem key={post.id} data={post} />;
              })}
              {data?.pages.flat().length === 0 && (
                <Text color="#595959">검색된 게시글이 존재하지 않습니다.</Text>
              )}
            </Fragment>
          );
        })}
      </div>
      {hasNextPage && <div ref={ref} style={{ height: 10 }}></div>}
    </div>
  );
}
