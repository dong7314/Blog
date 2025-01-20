import { Tag } from "@/app/_model/Tag.model";
import DetailTagItem from "./item/DetailTagItem";

type Props = {
  tags: Tag[];
};

export default function DetailTags({ tags }: Props) {
  return (
    <>
      {tags.map((tag: Tag) => {
        return <DetailTagItem key={tag.id} tag={tag.name} />;
      })}
    </>
  );
}
