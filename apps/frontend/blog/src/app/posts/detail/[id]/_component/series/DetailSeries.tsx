"use client";
import { useEffect, useState } from "react";

import * as styles from "./DetailSeries.css";

import { Post } from "@/app/_model/Post.model";
import { Icon, Text, TextButton } from "@frontend/coreui";
import { composeStyles } from "@vanilla-extract/css";
import { Series as ISeries } from "@/app/_model/Series.model";
import { addComma } from "@/app/_lib/addComma";
import { useRouter } from "next/navigation";

type Props = {
  postId: number;
  series: ISeries;
};
export default function DetailSeries({ series, postId }: Props) {
  const router = useRouter();
  const [seriesPosts, setSeriesPosts] = useState<Post[]>([]);

  useEffect(() => {
    for (let i = 0; i < series.posts.length; i++) {
      if (series.posts[i].id === postId) {
        const lastCount =
          series.posts.length - i - 1 > 2 ? 2 : series.posts.length - i - 1;
        for (let j = i - (4 - lastCount); j < series.posts.length; j++) {
          if (j >= 0 && seriesPosts.length < 5) {
            setSeriesPosts((prev) => {
              const updateList = [...prev, series.posts[j] as any];
              return updateList;
            });
          }
        }
      }
    }

    return () => {
      setSeriesPosts([]);
    };
  }, []);

  const handleClickSeries = (postId: number) => {
    router.replace(`/posts/detail/${postId}`);
  };

  return (
    <div className={styles.profileSeriesBox}>
      <div className={styles.seriesContainer}>
        <div className={styles.seriesTitle}>
          <Text weight={400} color="#c9c9c9" size="xs">
            D POST 시리즈
          </Text>
          <Text weight={500} size="xl" className={styles.display}>
            {series.title}
            <span className={styles.seriesButton}>
              <Icon type="right" size="l" color="#262626" />
            </span>
          </Text>
        </div>
        <div className={styles.seriesPostContainer}>
          {seriesPosts.map((post) => {
            return (
              <div
                onClick={() => handleClickSeries(post.id)}
                key={`series-id-${post.id}`}
                className={composeStyles(
                  styles.seriesPost,
                  post.id === postId ? styles.active : "",
                )}
              >
                <div className={styles.flex}>
                  <Text color="#595959" className={styles.seriesOrder}>
                    {post.seriesOrder && 0 + 1}.&nbsp;&nbsp;
                  </Text>
                  <TextButton disabled={post.id === postId}>
                    <span style={{ color: "#262626" }}>{post.title}</span>
                  </TextButton>
                </div>
                <div className={styles.flex}>
                  <Text size="s" color="#A5A5A5">
                    <span style={{ letterSpacing: 0.5 }}>
                      {addComma(post.viewCount)}
                    </span>{" "}
                    읽음
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
