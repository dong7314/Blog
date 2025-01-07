import { create } from "zustand";

export interface AnchorNavigation {
  id: string;
  name: string;
  type: "h1" | "h2" | "h3";
}

interface AnchorNavigationState {
  navList: AnchorNavigation[];
  navSet: Set<string>;
  navPositionList: number[];
  reset(): void;
  addNavList(nav: AnchorNavigation): void;
  setNavPositionList(position: number): void;
}

export const useAnchorNavigationStore = create<AnchorNavigationState>(
  (set, get) => ({
    navList: [],
    navSet: new Set(),
    navPositionList: [],
    reset() {
      set({
        navList: [],
        navSet: new Set(),
      });
    },
    addNavList(nav: AnchorNavigation) {
      const { navSet, navList } = get();
      if (!navSet.has(nav.id)) {
        const updateNavSet = new Set(navSet).add(nav.id);
        set({
          navList: [...navList, nav],
          navSet: updateNavSet,
        });
      }
    },
    setNavPositionList(position: number) {
      const { navPositionList } = get();
      if (!navPositionList.includes(position)) {
        const updateList = [...navPositionList, position].sort((a, b) => a - b);
        set({
          navPositionList: updateList,
        });
      }
    },
  }),
);
