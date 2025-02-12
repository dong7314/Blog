"use client";

import React, { ReactNode, useEffect, useState } from "react";

import * as styles from "./Modal.css";

import IconButton from "../iconButton/IconButton";
import { composeStyles } from "@vanilla-extract/css";
import Text from "../../atom/text/Text";

export interface ModalProps {
  title?: string;
  /** 모달 너비 */
  width: string;
  /** 모달 높이 */
  height: string;
  /** 모달 내부 컨텐츠 */
  children: ReactNode;
  /** 백드롭 및 닫기 버튼 클릭 시 동작할 함수 */
  back?: () => void;
}

export const Modal = ({
  title = "",
  width,
  height,
  children,
  back,
}: ModalProps) => {
  const [isMouseDownInside, setIsMouseDownInside] = useState(false);
  const [modalContainerStyle, setModalContainerStyle] = useState(
    styles.modalContainer,
  );

  const handleBackFn = () => {
    if (back) {
      back();
    }
  };

  useEffect(() => {
    setModalContainerStyle(
      composeStyles(styles.modalContainer, styles.modalContainerOpen),
    );
  }, []);

  return (
    <div
      className={modalContainerStyle}
      onMouseDown={() => setIsMouseDownInside(false)}
      onMouseUp={() => {
        if (!isMouseDownInside) {
          handleBackFn();
        }
      }}
    >
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsMouseDownInside(true);
        }}
        className={styles.modal}
        style={{ width, height }}
      >
        <div className={styles.modalHeader}>
          <Text size="xl" weight={700} className={styles.modalTitle}>
            {title}
          </Text>
          <IconButton onClick={handleBackFn} type="close" size="l" />
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
