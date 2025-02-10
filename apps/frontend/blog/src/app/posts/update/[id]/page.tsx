import PostContainer from "../../_component/post/PostContainer";
import { getPost } from "../../detail/[id]/_lib/post/getPost";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function UpdatePostPage({ params }: Props) {
  const { id } = await params;
  const postId = parseInt(id);
  const data = await getPost(postId);

  return <PostContainer data={data} />;
}
