import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function ConfirmPage({ params }: Props) {
  const { id } = await params;
  redirect("/posts/detail/" + id);
  return <></>;
}
