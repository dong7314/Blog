import Preview from "./_component/Preview";
import PreviewModal from "./_component/modal/PreviewModal";

export default function PostCreatePreviewModalPage() {
  return (
    <PreviewModal width="800px" height="600px">
      <Preview />
    </PreviewModal>
  );
}
