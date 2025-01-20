import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import PostCarousel from "../carousel/PostCarousel";
import { Post as IPost } from "@/app/_model/Post.model";
import { getPostsPopularity } from "../../_lib/getPostsPopularity";

export default async function PostsPopularity() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", "popularity"],
    queryFn: getPostsPopularity,
  });
  const dehydratedState = dehydrate(queryClient);
  // React Query 상태에서 데이터를 직접 추출
  const extractedData = queryClient.getQueryData(["posts", "popularity"]);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <PostCarousel posts={extractedData as IPost[]} />
      </HydrationBoundary>
    </>
  );
}
