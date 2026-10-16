"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import ClientStories from "@/components/client-stories";
import { servicePageFor, serviceReasons, type ServiceMedia } from "@/lib/service-pages";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setOpen(true);
      },
      { threshold: 0.28, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, open };
}

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, open } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={open ? `service-reveal is-open ${className ?? ""}` : `service-reveal ${className ?? ""}`}>
      {children}
    </div>
  );
}

function Frame({ image, className }: { image: ServiceMedia; className?: string }) {
  return (
    <figure className={className ? `service-frame ${className}` : "service-frame"}>
      <img src={image.src} alt="" style={{ objectPosition: image.position }} />
    </figure>
  );
}

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const page = servicePageFor(searchParams.get("category"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page.id]);

  return (
    <div className="service-landing" key={page.id}>
      <section
        className={page.heroImage ? "service-hero is-photo" : "service-hero"}
        style={page.heroImage ? { backgroundImage: `url("${page.heroImage}")` } : undefined}
      >
        <div className="service-hero-copy">
          <span className="hero-badge">{page.badge}</span>
          <h1>{page.headline}</h1>
          <p>{page.intro}</p>
          {page.heroImage ? (
            <div className="hero-actions">
              <Link href="/team" className="tunnel-btn">
                Meet Our Team
              </Link>
              <Link href={page.advantageHref} className="tunnel-btn is-secondary">
                Contact Us
              </Link>
            </div>
          ) : null}
        </div>
        {page.heroImage ? null : (
          <Reveal className="service-stage">
            <div className="service-collage">
              <Frame image={page.collage[0]} className="is-lead" />
              <div className="service-collage-stack">
                <Frame image={page.collage[1]} />
                <Frame image={page.collage[2]} />
              </div>
            </div>
          </Reveal>
        )}
        <div className={page.heroImage ? "service-hero-foot" : undefined}>
          <div className="service-rating">
            <div className="service-stars" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, star) => (
                <Star key={star} strokeWidth={0} aria-hidden="true" />
              ))}
            </div>
            <strong>25 + Reviews</strong>
          </div>
          <p className="sample-note">Sample rating · client reviews to be confirmed</p>
        </div>
      </section>

      <div className="service-bands">
        {page.bands.map((band, index) => (
          <article key={band.title} className={index % 2 === 1 ? "service-band is-reverse" : "service-band"}>
            <Reveal>
              <Frame image={band.image} />
            </Reveal>
            <div className="service-band-copy">
              <span className="service-kicker">{band.eyebrow}</span>
              <h2>{band.title}</h2>
              <p>{band.text}</p>
              <Link href={band.href} className="service-band-link">
                {band.cta} <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section className="service-advantage">
        <span className="hero-badge">{page.advantageKicker}</span>
        <h2>{page.advantageTitle}</h2>
        <div className="hero-actions">
          <Link href="/team" className="tunnel-btn">
            Meet Our Team
          </Link>
          <Link href={page.advantageHref} className="tunnel-btn is-secondary">
            Contact Us
          </Link>
        </div>
        <Reveal className="service-stage service-advantage-reveal">
          <Frame image={page.advantageImage} className="is-wide" />
        </Reveal>
      </section>

      <section className="service-why">
        <header className="service-why-copy">
          <span className="hero-badge">Why Choose Us</span>
          <h2>{page.whyTitle}</h2>
          <p>{page.whyText}</p>
        </header>
        <ol className="service-why-grid">
          {serviceReasons.map(([title, text], index) => (
            <li key={title}>
              <span>{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <ClientStories />
    </div>
  );
}
