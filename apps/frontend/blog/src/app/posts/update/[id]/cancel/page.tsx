import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function CancelPage({ params }: Props) {
  const { id } = await params;
  redirect(`/posts/update/${id}`);
  return <></>;
}
