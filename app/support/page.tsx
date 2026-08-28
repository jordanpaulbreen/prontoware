import { redirect } from "next/navigation";

/** "Help centre" / "Talk to support" both point here — the help centre is our support hub. */
export default function SupportPage() {
  redirect("/help");
}
