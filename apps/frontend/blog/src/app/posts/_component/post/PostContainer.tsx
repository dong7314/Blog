import * as styles from "./PostContainer.css";

import { Text } from "@frontend/coreui";
import { Post as IPost } from "@/app/_model/Post.model";

import PostTags from "./tags/PostTags";
import PostEditor from "./editor/PostEditor";
import PostSeries from "./series/PostSeries";
import ImagePicker from "./imagePicker/ImagePicker";
import PostTitleInput from "./title/PostTitleInput";
import PostDescriptionTextarea from "./description/PostDescriptionTextarea";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type Props = {
  data?: IPost;
};
export default async function PostContainer({ data }: Props) {
  const session = await auth();
  if (data && `${data.author.id}` !== session?.user.id) {
    redirect(`/posts/detail/${data.id}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.postInfo}>
        <div className={styles.postInput}>
          <PostTitleInput title={data?.title} />
        </div>
        <div className={styles.postTextarea}>
          <PostDescriptionTextarea description={data?.description} />
        </div>
        <div className={styles.postInput}>
          <Text size="s" color="#262626" className={styles.postLabel}>
            태그
          </Text>
          <PostTags tags={data?.tags} />
        </div>
        <div className={styles.postInput}>
          <ImagePicker url={data?.thumbnail} />
        </div>
        <div className={styles.postInput}>
          <Text size="s" color="#262626" className={styles.postLabel}>
            시리즈 설정
          </Text>
          <PostSeries seriesId={data?.series?.id} />
        </div>
      </div>
      <PostEditor content={data?.content} />
    </div>
  );
}
