import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import PostCarousel from "../carousel/PostCarousel";
import { Post as IPost } from "@/app/_model/Post.model";
import { getPostsRecently } from "../../_lib/getPostsRecently";

export default async function PostsRecently() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", "recently"],
    queryFn: getPostsRecently,
  });
  const dehydratedState = dehydrate(queryClient);
  // React Query 상태에서 데이터를 직접 추출
  const extractedData = queryClient.getQueryData(["posts", "recently"]);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <PostCarousel posts={extractedData as IPost[]} />
      </HydrationBoundary>
    </>
  );
}
