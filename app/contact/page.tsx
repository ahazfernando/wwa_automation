import { Suspense } from "react";
import ContactPage from "@/components/pages/contact-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact us: start a conversation",
  "Plan your next step with Clyra. Tell us about your business and explore strategy, automation, marketing, technology and staffing.",
);

export default function Page() {
  return (
    <Suspense>
      <ContactPage />
    </Suspense>
  );
}
