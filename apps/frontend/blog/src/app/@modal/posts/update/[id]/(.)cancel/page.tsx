import ConfirmModal from "@/app/@modal/_component/confirm/ConfirmModal";
import Confirm from "./_component/Confirm";

type Props = {
  params: Promise<{ id: string; commentId: string }>;
};
export default async function PostUpdateCancelConfirmPage({ params }: Props) {
  const { id } = await params;

  return (
    <ConfirmModal
      id={parseInt(id)}
      title="수정을 취소하시겠습니까?"
      activeButton={{
        text: "나가기",
        type: "negative",
      }}
    >
      <Confirm />
    </ConfirmModal>
  );
}
