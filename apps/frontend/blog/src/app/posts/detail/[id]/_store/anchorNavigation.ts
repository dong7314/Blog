import { create } from "zustand";

interface AnchorNavigation {
  id: string;
  name: string;
  type: "h1" | "h2" | "h3";
}

interface AnchorNavigationState {
  navList: AnchorNavigation[];
  navSet: Set<string>;
  reset(): void;
  addNavList(nav: AnchorNavigation): void;
}

export const useAnchorNavigationStore = create<AnchorNavigationState>(
  (set, get) => ({
    navList: [],
    navSet: new Set(),
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
  }),
);
