import * as styles from "./DetailComments.css";

import { Text } from "@frontend/coreui";
import DetailCommentTextarea from "./textarea/DetailCommentTextarea";

export default function DetailComments() {
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
        replies: [],
        createdDate: "2025-01-13T07:15:48.986Z",
        updatedDate: "2025-01-13T07:15:48.986Z",
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
                createdDate: "2025-01-10T06:40:00.092Z",
                updatedDate: "2025-01-10T06:40:00.092Z",
              },
            ],
            createdDate: "2025-01-10T06:11:01.707Z",
            updatedDate: "2025-01-10T06:11:01.707Z",
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
            createdDate: "2025-01-10T06:42:51.930Z",
            updatedDate: "2025-01-10T06:42:51.930Z",
          },
        ],
        createdDate: "2025-01-10T05:37:07.492Z",
        updatedDate: "2025-01-10T06:53:57.000Z",
      },
    ],
    count: 5,
  };

  return (
    <div className={styles.detailCommentsContainer}>
      <Text size="xl" weight={500} className={styles.detailCommentsCount}>
        {data.count}개의 댓글
      </Text>
      <DetailCommentTextarea />
    </div>
  );
}
