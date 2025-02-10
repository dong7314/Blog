import { redirect } from "next/navigation";

export default async function ConfirmPage() {
  redirect("/posts");
  return <></>;
}
