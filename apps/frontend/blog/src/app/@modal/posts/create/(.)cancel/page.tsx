import ConfirmModal from "@/app/@modal/_component/confirm/ConfirmModal";
import Confirm from "./_component/Confirm";

export default async function PostCreateCancelConfirmPage() {
  return (
    <ConfirmModal
      id={999999999}
      title="작성을 취소하시겠습니까?"
      activeButton={{
        text: "나가기",
        type: "negative",
      }}
    >
      <Confirm />
    </ConfirmModal>
  );
}
