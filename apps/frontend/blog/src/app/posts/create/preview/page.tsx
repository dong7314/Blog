import { redirect } from "next/navigation";

export default function PreviewPage() {
  redirect("/posts/create");
  return <></>;
}
