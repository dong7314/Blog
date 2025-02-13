"use client";

import { useQuery } from "@tanstack/react-query";

import * as styles from "./PostsRecently.css";

import { Loading } from "@frontend/coreui";
import PostCarousel from "../carousel/PostCarousel";
import { Post as IPost } from "@/app/_model/Post.model";
import { getPostsRecently } from "../../_lib/getPostsRecently";

export default function PostsRecently() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", "recently"],
    queryFn: getPostsRecently,
  });

  if (isLoading)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );

  return <PostCarousel posts={posts as IPost[]} />;
}
