"use client";
import { useEffect, useState } from "react";

import * as styles from "./DetailSeries.css";

import { Post } from "@/app/_model/Post.model";
import { Icon, Text, TextButton } from "@frontend/coreui";
import { composeStyles } from "@vanilla-extract/css";

export default function DetailSeries() {
  const [seriesPosts, setSeriesPosts] = useState<Post[]>([]);
  const postId = 342;
  const data = {
    id: 1,
    title: "시리즈 테스트",
    description: "시리즈 테스트입니다.",
    posts: [
      {
        id: 101,
        title: "왜 멀쩡하던 것도 반영만 했다하면 항상 문제가 터지는가..",
        description: "포스트 업데이트1 입니다.",
        content: "# header ## hihih ### update hi man",
        thumbnail: "https://exmaple.com1",
        seriesOrder: 0,
        viewCount: 1,
        createdDate: "2025-01-11T08:22:02.917Z",
        updatedDate: "2025-01-11T15:44:24.000Z",
      },
      {
        id: 203,
        title:
          "코드만 잘 짜면 된다고? 신입/주니어 개발자가 알아야 할 100가지 필수 꿀팁 - 1",
        description: "포스트 업데이트2 입니다.",
        content: "# header ## hihih ### update hi man",
        thumbnail: "https://exmaple.com1",
        seriesOrder: 1,
        viewCount: 1,
        createdDate: "2025-01-11T08:22:02.917Z",
        updatedDate: "2025-01-11T15:44:24.000Z",
      },
      {
        id: 342,
        title:
          "코드만 잘 짜면 된다고? 신입/주니어 개발자가 알아야 할 100가지 필수 꿀팁 - 2",
        description: "포스트 업데이트3 입니다.",
        content: "# header ## hihih ### update hi man",
        thumbnail: "https://exmaple.com1",
        seriesOrder: 2,
        viewCount: 1,
        createdDate: "2025-01-11T08:22:02.917Z",
        updatedDate: "2025-01-11T15:44:24.000Z",
      },
      {
        id: 411,
        title: "신입 개발자의 꿀팁은 무엇인가?",
        description: "포스트 업데이트4 입니다.",
        content: "# header ## hihih ### update hi man",
        thumbnail: "https://exmaple.com1",
        seriesOrder: 3,
        viewCount: 1,
        createdDate: "2025-01-11T08:22:02.917Z",
        updatedDate: "2025-01-11T15:44:24.000Z",
      },
      {
        id: 556,
        title: "신입 개발자의 리액트 변모 과정 체험하기.",
        description: "포스트 업데이트5 입니다.",
        content: "# header ## hihih ### update hi man",
        thumbnail: "https://exmaple.com1",
        seriesOrder: 4,
        viewCount: 1,
        createdDate: "2025-01-11T08:22:02.917Z",
        updatedDate: "2025-01-11T15:44:24.000Z",
      },
    ],
    createdDate: "2025-01-11T15:42:37.096Z",
    updatedDate: "2025-01-11T15:42:37.096Z",
  };

  useEffect(() => {
    for (let i = 0; i < data.posts.length; i++) {
      if (data.posts[i].id === postId) {
        const lastCount =
          data.posts.length - i - 1 > 2 ? 2 : data.posts.length - i - 1;
        for (let j = i - (4 - lastCount); j < data.posts.length; j++) {
          if (j >= 0 && seriesPosts.length < 5) {
            setSeriesPosts((prev) => {
              const updateList = [...prev, data.posts[j] as any];
              return updateList;
            });
          }
        }
      }
    }
  }, []);

  return (
    <div className={styles.profileSeriesBox}>
      <div className={styles.seriesContainer}>
        <div className={styles.seriesTitle}>
          <Text weight={400} color="#c9c9c9" size="xs">
            D POST 시리즈
          </Text>
          <Text weight={500} size="xl" className={styles.display}>
            {data.title}
            <span className={styles.seriesButton}>
              <Icon type="right" size="l" color="#262626" />
            </span>
          </Text>
        </div>
        <div className={styles.seriesPostContainer}>
          {seriesPosts.map((post) => {
            return (
              <div
                key={`series-id-${post.id}`}
                className={composeStyles(
                  styles.seriesPost,
                  post.id === postId ? styles.active : "",
                )}
              >
                <Text color="#595959" className={styles.seriesOrder}>
                  {post.seriesOrder + 1}.&nbsp;&nbsp;
                </Text>
                <TextButton disabled={post.id === postId}>
                  <span style={{ color: "#262626" }}>{post.title}</span>
                </TextButton>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
