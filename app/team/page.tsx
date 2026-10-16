import TeamPage from "@/components/pages/team-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Our team: the people behind the progress",
  "Get to know the connected disciplines behind Clyra: strategy, technology, marketing and people.",
);

export default function Page() {
  return <TeamPage />;
}
