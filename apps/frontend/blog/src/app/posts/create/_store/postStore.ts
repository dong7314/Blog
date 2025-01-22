import { create } from "zustand";

interface PostState {
  title: string;
  description: string;
  content: string;
  tags: string[];
  imgUrl: string;
  seriesId: string;
  setTitle(title: string): void;
  setDescription(description: string): void;
  setContent(content: string): void;
  setTags(tags: string[]): void;
  setImgUrl(imgUrl: string): void;
  setSeriesId(seriesId: string): void;
  reset(): void;
}

export const usePostStore = create<PostState>((set) => ({
  title: "",
  description: "",
  content: "",
  tags: [],
  imgUrl: "",
  seriesId: "",
  setTitle(title: string) {
    set({ title });
  },
  setDescription(description: string) {
    set({ description });
  },
  setContent(content: string) {
    set({ content });
  },
  setTags(tags: string[]) {
    set({ tags });
  },
  setImgUrl(imgUrl: string) {
    set({ imgUrl });
  },
  setSeriesId(seriesId: string) {
    set({ seriesId });
  },
  reset() {
    set({
      title: "",
      description: "",
      content: "",
      tags: [],
      imgUrl: "",
      seriesId: "",
    });
  },
}));

export default usePostStore;
