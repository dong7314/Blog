"use client";

import { useQuery } from "@tanstack/react-query";

import * as styles from "./PostsPopularity.css";

import { Loading } from "@frontend/coreui";
import PostCarousel from "../carousel/PostCarousel";
import { Post as IPost } from "@/app/_model/Post.model";
import { getPostsPopularity } from "../../_lib/getPostsPopularity";

export default function PostsPopularity() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", "popularity"],
    queryFn: getPostsPopularity,
  });

  if (isLoading)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );

  return <PostCarousel posts={posts as IPost[]} />;
}
