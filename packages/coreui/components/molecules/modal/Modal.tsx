import React, { ReactNode, useEffect, useState } from "react";

import * as styles from "./Modal.css";

import IconButton from "../iconButton/IconButton";
import { composeStyles } from "@vanilla-extract/css";

export interface ModalProps {
  /** 모달 너비 */
  width: string;
  /** 모달 높이 */
  height: string;
  /** 모달 내부 컨텐츠 */
  children: ReactNode;
  /** 백드롭 및 닫기 버튼 클릭 시 동작할 함수 */
  back?: () => void;
}

export const Modal = ({ width, height, children, back }: ModalProps) => {
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
    <div className={modalContainerStyle} onClick={handleBackFn}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modal}
        style={{ width, height }}
      >
        <div className={styles.modalHeader}>
          <IconButton onClick={handleBackFn} type="close" size="l" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
