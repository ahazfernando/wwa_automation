import { Suspense } from "react";
import PageSkeleton from "@/components/page-skeleton";
import ServicesPage from "@/components/pages/services-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Services built around your business",
  "Explore Clyra’s digital marketing, business automation, IT and software, onshore and offshore staffing services.",
);

export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton variant="services" />}>
      <ServicesPage />
    </Suspense>
  );
}
