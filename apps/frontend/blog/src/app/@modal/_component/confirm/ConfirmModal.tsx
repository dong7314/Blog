"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import * as styles from "./ConfirmModal.css";

import { Button, Modal } from "@frontend/coreui";
import useModalStore, { ModalAction } from "@/app/_store/modalStore";

interface ActiveButton {
  text: string;
  type: "primary" | "negative";
}
type Props = {
  id: number;
  title: string;
  children: ReactNode;
  activeButton: ActiveButton;
};
export default function ConfirmModal({
  id,
  title,
  children,
  activeButton,
}: Props) {
  const router = useRouter();
  const modalStore = useModalStore();

  const handleBack = () => {
    router.back();
  };

  const handleClickButton = (type: ModalAction) => {
    modalStore.setModalAction(type);
    handleBack();
  };

  useEffect(() => {
    modalStore.setModalId(id);
  }, []);

  return (
    <Modal title={title} width="350px" height="150px" back={handleBack}>
      <div className={styles.confirm}>
        {children}
        <div className={styles.confirmButtonBox}>
          <Button
            className={styles.confirmButton}
            onClick={() => handleClickButton("cancel")}
          >
            취소
          </Button>
          <Button
            className={styles.confirmButton}
            type={activeButton.type}
            onClick={() => handleClickButton("active")}
          >
            {activeButton.text}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
