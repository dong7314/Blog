import * as styles from "./DetailComments.css";

import { Text } from "@frontend/coreui";
import { Comment } from "@/app/_model/Comment.model";
import DetailComment from "./comment/DetailComment";
import DetailCommentTextarea from "./textarea/DetailCommentTextarea";

type Props = {
  postId: number;
};
export default function DetailComments({ postId }: Props) {
  const data = {
    comments: [
      {
        id: 8,
        content: "비밀 댓글 없는 댓글입니다 ㅎㅎ",
        isSecret: false,
        author: {
          id: 1,
          name: "admin",
          description: "",
          email: "eaea7314@naver.com",
          thumbnail: "",
        },
        replies: [] as Comment[],
        createdDate: new Date("2025-01-13T07:15:48.986Z"),
        updatedDate: new Date("2025-01-14T07:15:48.986Z"),
      },
      {
        id: 1,
        content: "비밀 댓글입니다.",
        isSecret: true,
        author: {
          id: 1,
          name: "admin",
          description: "",
          email: "eaea7314@naver.com",
          thumbnail: "",
        },
        replies: [
          {
            id: 5,
            content: "좋은 글의 대댓글2 입니다.",
            isSecret: false,
            author: {
              id: 1,
              name: "admin",
              description: "",
              email: "eaea7314@naver.com",
              thumbnail: "",
            },
            replies: [
              {
                id: 6,
                content: "좋은 글의 대댓글의 대댓글 입니다.",
                isSecret: false,
                createdDate: new Date("2025-01-10T06:40:00.092Z"),
                updatedDate: new Date("2025-01-10T06:40:00.092Z"),
              },
            ],
            createdDate: new Date("2025-01-10T06:11:01.707Z"),
            updatedDate: new Date("2025-01-10T06:11:01.707Z"),
          },
          {
            id: 7,
            content: "비밀 댓글입니다.",
            isSecret: true,
            author: {
              id: 1,
              name: "admin",
              description: "",
              email: "eaea7314@naver.com",
              thumbnail: "",
            },
            replies: [],
            createdDate: new Date("2025-01-10T06:42:51.930Z"),
            updatedDate: new Date("2025-01-10T06:42:51.930Z"),
          },
        ],
        createdDate: new Date("2025-01-10T05:37:07.492Z"),
        updatedDate: new Date("2025-01-10T05:39:07.492Z"),
      },
    ] as Comment[],
    count: 5,
  };

  return (
    <div className={styles.detailCommentsContainer} id={`comment-${postId}`}>
      <Text size="xl" weight={500} className={styles.detailCommentsCount}>
        {data.count}개의 댓글
      </Text>
      <DetailCommentTextarea type={"comment"} />
      {data.comments.map((comment: Comment) => {
        return (
          <DetailComment key={`comment-id-${comment.id}`} comment={comment} />
        );
      })}
    </div>
  );
}
