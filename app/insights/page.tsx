import InsightsPage from "@/components/pages/insights-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Insights: ideas for better business",
  "Practical perspectives on process automation, digital marketing and building a better connected business from Clyra.",
);

export default function Page() {
  return <InsightsPage />;
}
