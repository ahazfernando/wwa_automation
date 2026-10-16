import AboutPage from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About us: ambition meets execution",
  "Meet Clyra: a connected team bringing strategy, people and technology together to turn business challenges into opportunities.",
);

export default function Page() {
  return <AboutPage />;
}
