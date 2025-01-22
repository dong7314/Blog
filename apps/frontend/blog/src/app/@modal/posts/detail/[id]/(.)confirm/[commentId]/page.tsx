import Confirm from "./_component/Confirm";
import ConfirmModal from "../../../../../_component/confirm/ConfirmModal";

type Props = {
  params: Promise<{ id: string; commentId: string }>;
};
export default async function PostDetailConfirmPage({ params }: Props) {
  const { id, commentId } = await params;

  return (
    <ConfirmModal
      id={parseInt(commentId)}
      title="댓글을 삭제하시겠습니까?"
      activeButton={{
        text: "삭제",
        type: "negative",
      }}
    >
      <Confirm />
    </ConfirmModal>
  );
}
