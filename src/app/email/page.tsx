import { redirect } from "next/navigation";

export default function EmailRedirect() {
  redirect("/email-templates");
}
