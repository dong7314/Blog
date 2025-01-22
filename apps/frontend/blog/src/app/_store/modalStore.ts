import { create } from "zustand";

export type ModalAction = "cancel" | "active";

interface ModalState {
  id: number | null;
  modalAction: ModalAction | null;
  setModalId(id: number): void;
  setModalAction(action: ModalAction): void;
  resetModalAction(): void;
}

export const useModalStore = create<ModalState>((set) => ({
  id: null,
  modalAction: null,
  setModalId: (id: number) => set({ id }), // 식별 아이디 저장
  setModalAction: (action: ModalAction) => set({ modalAction: action }), // 상태 업데이트
  resetModalAction: () => set({ id: null, modalAction: null }), // 초기화
}));

export default useModalStore;
