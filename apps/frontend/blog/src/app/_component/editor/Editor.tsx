"use client";

import dynamic from "next/dynamic";

const ToastUiEditor = dynamic(
  () => import("@/app/_component/editor/toast/ToastUiEditor"),
  {
    ssr: false,
  },
);

export default function Editor() {
  return (
    <>
      <ToastUiEditor />
    </>
  );
}
