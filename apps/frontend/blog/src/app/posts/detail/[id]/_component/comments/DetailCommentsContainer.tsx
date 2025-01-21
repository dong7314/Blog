import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";

import * as styles from "./DetailComments.css";

import { getComments } from "../../_lib/comment/getComments";
import DetailComments from "./DetailComments";

type Props = {
  postId: number;
};
export default async function DetailCommentsContainer({ postId }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["post", "detail", `${postId}`, "comments"],
    queryFn: () => getComments(postId),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={styles.detailCommentsContainer} id={`comment-${postId}`}>
        <DetailComments postId={postId} />
      </div>
    </HydrationBoundary>
  );
}
