"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

import { Modal } from "@frontend/coreui";

type Props = { width: string; height: string; children: ReactNode };

export default function LoginModal({ width, height, children }: Props) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Modal width={width} height={height} back={handleBack}>
      {children}
    </Modal>
  );
}