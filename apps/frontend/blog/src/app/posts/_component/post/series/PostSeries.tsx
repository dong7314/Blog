"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./PostSeries.css";

import getSeries from "../../../_lib/getSeries";
import createSeries from "../../../_lib/createSeries";
import usePostStore from "../../../_store/postStore";
import { Series as ISeries } from "@/app/_model/Series.model";
import { Button, Icon, Input, Text, TextButton } from "@frontend/coreui";

type Props = {
  seriesId?: number;
};
export default function PostSeries({ seriesId }: Props) {
  const session = useSession();
  const postStore = usePostStore();
  const queryClient = useQueryClient();
  const [seriesTitle, setSeriesTitle] = useState<string>("");
  const [openAddSeries, setOpenAddSeries] = useState<boolean>(false);
  const [selectSeriesId, setSelectSeriesId] = useState<number | null>(null);

  const { data } = useQuery<ISeries[]>({
    queryKey: ["series", "author", `${session.data?.user.id}`],
    queryFn: getSeries,
  });

  const mutation = useMutation({
    mutationFn: () => createSeries(seriesTitle, ""),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["series", "author", `${session.data?.user.id}`],
        })
        .then(() => {
          setSeriesTitle("");
          setOpenAddSeries(false);
        });
    },
    onError: (error: any) => {
      console.error("시리즈 생성 실패:", error);
    },
  });

  const handleOnClick = (id: number) => {
    setSelectSeriesId(id);
    postStore.setSeriesId(id);
  };

  const handleSaveSeries = () => {
    if (seriesTitle.trim() === "") {
      alert("시리즈 타이틀을 입력해주세요.");
      return;
    }
    mutation.mutate();
  };

  useEffect(() => {
    if (seriesId) {
      setSelectSeriesId(seriesId);
      postStore.setSeriesId(seriesId);
    }
  }, [seriesId]);

  return (
    <div className={styles.createSeries}>
      <div className={styles.seriesHeader}>
        <Text size="s" weight={600} color="#3F3F3F">
          시리즈 목록
        </Text>
        <TextButton
          onClick={() => setOpenAddSeries((prev) => !prev)}
          size="s"
          color={openAddSeries ? "#FB3E3E" : "#0066ff"}
        >
          {openAddSeries ? "취소" : "시리즈 추가"}
        </TextButton>
      </div>
      {openAddSeries && (
        <div className={styles.addSeries}>
          <Input
            name="series-title"
            size="s"
            placeholder="추가하실 시리즈 명을 입력해 주세요."
            onChange={(value) => {
              setSeriesTitle(value);
            }}
          />
          <Button
            type="primary"
            className={styles.addSeriesButton}
            onClick={handleSaveSeries}
          >
            저장하기
          </Button>
        </div>
      )}
      {!openAddSeries && data?.length === 0 && (
        <Text className={styles.nonExist} size="s" color="#a5a5a5">
          시리즈가 존재하지 않습니다.
        </Text>
      )}
      {data?.map((series: ISeries) => {
        return (
          <div
            key={series.id}
            className={composeStyles(
              styles.series,
              selectSeriesId === series.id ? styles.checked : "",
            )}
            onClick={() => {
              handleOnClick(series.id);
            }}
          >
            <Text size="s" color="#595959">
              {series.title}
            </Text>
            {postStore.seriesId !== null &&
              postStore.seriesId === series.id && (
                <Icon type="check" color="#0066ff" />
              )}
          </div>
        );
      })}
    </div>
  );
}
