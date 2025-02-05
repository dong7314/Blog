"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

import { Modal } from "@frontend/coreui";

type Props = { width: string; height: string; children: ReactNode };

export default function PrivacyModal({ width, height, children }: Props) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Modal
      title="개인정보 수집 동의"
      width={width}
      height={height}
      back={handleBack}
    >
      {children}
    </Modal>
  );
}
