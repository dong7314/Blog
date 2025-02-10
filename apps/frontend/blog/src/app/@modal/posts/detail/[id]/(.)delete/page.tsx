import Confirm from "./_component/Confirm";
import ConfirmModal from "@/app/@modal/_component/confirm/ConfirmModal";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function PostDetailConfirmPage({ params }: Props) {
  const { id } = await params;

  return (
    <ConfirmModal
      id={parseInt(id)}
      title="게시글을 삭제하시겠습니까?"
      activeButton={{
        text: "삭제",
        type: "negative",
      }}
    >
      <Confirm />
    </ConfirmModal>
  );
}
