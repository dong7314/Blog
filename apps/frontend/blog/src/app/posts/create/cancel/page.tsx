import { redirect } from "next/navigation";

export default async function CancelPage() {
  redirect(`/posts/create`);
  return <></>;
}
