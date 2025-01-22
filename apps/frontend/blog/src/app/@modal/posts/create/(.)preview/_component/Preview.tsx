"use client";

import Viewer from "@/app/_component/editor/Viewer";
import { usePostStore } from "@/app/posts/create/_store/postStore";

export default function Preview() {
  const postStore = usePostStore();

  return <Viewer content={postStore.content}></Viewer>;
}
