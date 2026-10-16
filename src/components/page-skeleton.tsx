import { Skeleton } from "@/components/ui/skeleton";

type PageSkeletonVariant = "home" | "hero" | "services" | "catalog" | "contact";

function IntroSkeleton({ centered = false }: { centered?: boolean }) {
  return (
    <div className={centered ? "page-skeleton-intro is-centered" : "page-skeleton-intro"}>
      <Skeleton className="page-skeleton-badge" />
      <Skeleton className="page-skeleton-title" />
      <Skeleton className="page-skeleton-title is-short" />
      <Skeleton className="page-skeleton-text" />
      <Skeleton className="page-skeleton-text is-narrow" />
    </div>
  );
}

function BandSkeleton({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={reverse ? "page-skeleton-band is-reverse" : "page-skeleton-band"}>
      <Skeleton className="page-skeleton-media" />
      <div className="page-skeleton-copy">
        <Skeleton className="page-skeleton-badge" />
        <Skeleton className="page-skeleton-heading" />
        <Skeleton className="page-skeleton-text" />
        <Skeleton className="page-skeleton-text is-narrow" />
        <Skeleton className="page-skeleton-link" />
      </div>
    </div>
  );
}

function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="page-skeleton-grid">
      {Array.from({ length: count }, (_, index) => (
        <div className="page-skeleton-card" key={index}>
          <Skeleton className="page-skeleton-card-media" />
          <Skeleton className="page-skeleton-heading is-sm" />
          <Skeleton className="page-skeleton-text" />
          <Skeleton className="page-skeleton-text is-narrow" />
        </div>
      ))}
    </div>
  );
}

export default function PageSkeleton({ variant = "catalog" }: { variant?: PageSkeletonVariant }) {
  if (variant === "home") {
    return (
      <div className="page-skeleton" aria-busy="true" aria-live="polite" aria-label="Loading page">
        <div className="page-skeleton-home-hero">
          <div className="page-skeleton-copy">
            <Skeleton className="page-skeleton-badge" />
            <Skeleton className="page-skeleton-title" />
            <Skeleton className="page-skeleton-title is-short" />
            <Skeleton className="page-skeleton-text" />
            <div className="page-skeleton-actions">
              <Skeleton className="page-skeleton-button" />
              <Skeleton className="page-skeleton-button is-ghost" />
            </div>
          </div>
        </div>
        <div className="page-skeleton-section">
          <div className="page-skeleton-stories">
            <div className="page-skeleton-copy">
              <Skeleton className="page-skeleton-badge" />
              <Skeleton className="page-skeleton-heading" />
              <Skeleton className="page-skeleton-text is-narrow" />
            </div>
            <div className="page-skeleton-story-row">
              <Skeleton className="page-skeleton-story" />
              <Skeleton className="page-skeleton-story" />
            </div>
          </div>
        </div>
        <div className="page-skeleton-section">
          <Skeleton className="page-skeleton-marquee" />
        </div>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className="page-skeleton" aria-busy="true" aria-live="polite" aria-label="Loading page">
        <Skeleton className="page-skeleton-cover" />
        <div className="page-skeleton-section">
          <IntroSkeleton />
          <Skeleton className="page-skeleton-marquee" />
          <CardGridSkeleton count={4} />
        </div>
      </div>
    );
  }

  if (variant === "services") {
    return (
      <div className="page-skeleton" aria-busy="true" aria-live="polite" aria-label="Loading page">
        <IntroSkeleton centered />
        <div className="page-skeleton-section">
          <div className="page-skeleton-collage">
            <Skeleton className="page-skeleton-collage-lead" />
            <div className="page-skeleton-collage-stack">
              <Skeleton className="page-skeleton-media" />
              <Skeleton className="page-skeleton-media" />
            </div>
          </div>
          <BandSkeleton />
          <BandSkeleton reverse />
          <BandSkeleton />
        </div>
      </div>
    );
  }

  if (variant === "contact") {
    return (
      <div className="page-skeleton" aria-busy="true" aria-live="polite" aria-label="Loading page">
        <IntroSkeleton centered />
        <div className="page-skeleton-section">
          <div className="page-skeleton-contact">
            <div className="page-skeleton-copy">
              <Skeleton className="page-skeleton-heading" />
              <Skeleton className="page-skeleton-text" />
              <Skeleton className="page-skeleton-text is-narrow" />
              <Skeleton className="page-skeleton-text" />
            </div>
            <div className="page-skeleton-form">
              <Skeleton className="page-skeleton-heading is-sm" />
              <div className="page-skeleton-form-grid">
                <Skeleton className="page-skeleton-field" />
                <Skeleton className="page-skeleton-field" />
                <Skeleton className="page-skeleton-field" />
                <Skeleton className="page-skeleton-field" />
              </div>
              <Skeleton className="page-skeleton-field is-tall" />
              <Skeleton className="page-skeleton-button is-wide" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-skeleton" aria-busy="true" aria-live="polite" aria-label="Loading page">
      <IntroSkeleton />
      <div className="page-skeleton-section">
        <CardGridSkeleton />
      </div>
    </div>
  );
}
