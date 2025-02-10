"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import * as styles from "./CancelPostButton.css";

import { Button } from "@frontend/coreui";
import useModalStore from "@/app/_store/modalStore";
import usePostStore from "@/app/posts/_store/postStore";

type Props = {
  id: number;
};
export default function CancelPostButton({ id }: Props) {
  const router = useRouter();
  const postStore = usePostStore();
  const modalStore = useModalStore();

  useEffect(() => {
    modalStore.resetModalAction();
    setTimeout(() => {
      if (modalStore.id === id && modalStore.modalAction === "active") {
        // 나가기 버튼 클릭 시 reset
        postStore.reset();
        // id로 판별하여 뒤로 보낼 routing 구분
        if (id === 999999999) {
          router.replace("/posts");
        } else {
          router.replace(`/posts/detail/${id}`);
        }
      }
    });
  }, [modalStore.modalAction]);

  return (
    <Button type="tertiary" className={styles.buttonMargin}>
      나가기
    </Button>
  );
}
