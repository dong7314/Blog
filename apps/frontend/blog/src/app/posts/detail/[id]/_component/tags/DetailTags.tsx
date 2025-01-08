import DetailTagItem from "./item/DetailTagItem";

type Props = {
  tags: string[];
};

export default function DetailTags({ tags }: Props) {
  return (
    <>
      {tags.map((tag: string) => {
        return <DetailTagItem key={tag} tag={tag} />;
      })}
    </>
  );
}
