"use client";

import dynamic from "next/dynamic";

const ToastUiViewer = dynamic(
  () => import("@/app/_component/editor/toast/ToastUiViewer"),
  {
    ssr: false,
  },
);

type Props = {
  content: string;
};

export default function Viewer({ content }: Props) {
  return (
    <>
      <ToastUiViewer content={content} />
    </>
  );
}
