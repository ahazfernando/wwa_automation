import HomePage from "@/components/pages/home-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Smart strategy. Real transformation.",
  "Clyra brings strategy, automation, digital marketing, technology and staffing together to move your business forward.",
);

export default function Page() {
  return <HomePage />;
}
