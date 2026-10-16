"use client";

import Link from "next/link";
import { Activity, BarChart3, LayoutGrid, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import ClientLogos from "@/components/client-logos";

const industries = [
  {
    name: "Hospitality",
    text: "Guest experience, staffing, and the operations behind every memorable stay.",
    image: "/assets/industry-hospitality.jpg",
  },
  {
    name: "Manufacturing",
    text: "Production lines, supply chains, and systems that keep output moving.",
    image: "/assets/industry-manufacturing.jpg",
  },
  {
    name: "Engineering",
    text: "Precision work, project delivery, and the tools teams rely on daily.",
    image: "/assets/25%202.png",
  },
  {
    name: "Education",
    text: "Learning environments, administration, and connected campus operations.",
    image: "/assets/industry-education.jpg",
  },
  {
    name: "Automotive",
    text: "Dealerships, service networks, and the systems behind every journey.",
    image: "/assets/industry-automotive.jpg",
  },
] as const;

const differences = [
  {
    title: "End-to-End Expertise",
    text: "Strategy, technology, and people. Connected from the first conversation to the final delivery.",
    Icon: BarChart3,
  },
  {
    title: "Proven Results",
    text: "Clear goals and thoughtful execution, with outcomes you can see in the work.",
    Icon: LayoutGrid,
  },
  {
    title: "Tailored Approach",
    text: "Your challenges are unique. Your solution should be too.",
    Icon: TrendingUp,
  },
  {
    title: "Long-Term Partnership",
    text: "A team that stays curious, takes ownership, and grows alongside you.",
    Icon: Activity,
  },
] as const;

function useExpand<T extends HTMLElement>() {
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, open };
}

function Expand({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const { ref, open } = useExpand<HTMLElement>();
  return (
    <section id={id} ref={ref} className={open ? `about-expand is-open ${className ?? ""}` : `about-expand ${className ?? ""}`}>
      {children}
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero" aria-label="About Clyra">
        <video
          className="about-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/assets/1a83a13d9849c82d0eecdd8ff5c82086_720w.mp4" type="video/mp4" />
        </video>
        <div className="about-hero-shade" aria-hidden="true" />
        <div className="about-hero-copy">
          <span className="hero-badge">Global Excellence</span>
          <h1>
            We Turn Business
            <br />
            Challenges Into Opportunities
          </h1>
          <p>
            Great ideas deserve great execution. We bring the right expertise together to help your business work
            smarter, connect better, and move forward.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="tunnel-btn">
              Transform your Business
            </Link>
            <a href="#industries" className="tunnel-btn is-secondary">
              Industry Expertise
            </a>
          </div>
        </div>
      </section>

      <ClientLogos intro={false} />

      <Expand id="industries" className="about-industries">
        <div className="about-expand-frame">
          <header className="industries-head">
            <span className="industries-kicker">Industries</span>
            <div className="industries-head-row">
              <h2>
                Industries we serve,
                <br />
                expertise that travels.
              </h2>
              <div className="industries-head-aside">
                <p>
                  Different sectors. The same need for people, process, and technology to work as one, so every
                  team moves with clarity and confidence.
                </p>
                <Link href="/contact" className="industries-head-cta">
                  Talk to us
                </Link>
              </div>
            </div>
          </header>
          <ul className="industry-cards">
            {industries.map((industry) => (
              <li
                className={industry.name === "Engineering" ? "industry-card is-engineering" : "industry-card"}
                key={industry.name}
              >
                <div className="industry-card-copy">
                  <h3>{industry.name}</h3>
                  <p>{industry.text}</p>
                </div>
                <img src={industry.image} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </Expand>

      <Expand className="about-purpose">
        <div className="about-expand-frame">
          <header className="purpose-head">
            <span className="purpose-kicker">Purpose</span>
            <h2>
              The reason we show up,
              <br />
              and the future we build toward.
            </h2>
          </header>

          <div className="purpose-stack">
            <article className="purpose-band">
              <div className="purpose-band-media">
                <img
                  src="/homesection/mission-melbourne.jpg"
                  alt=""
                  width={2048}
                  height={1152}
                />
              </div>
              <div className="purpose-band-copy">
                <span className="purpose-index" aria-hidden="true">
                  01
                </span>
                <h3>Our Mission</h3>
                <p>
                  To help ambitious businesses turn their goals into action through clear strategy, thoughtful
                  technology, and people who care about the outcome.
                </p>
                <Link href="/contact" className="purpose-band-cta">
                  Start a conversation
                </Link>
              </div>
            </article>

            <article className="purpose-band is-reverse">
              <div className="purpose-band-media">
                <img
                  src="/homesection/vision-stream.jpg"
                  alt=""
                  width={2048}
                  height={1152}
                />
              </div>
              <div className="purpose-band-copy">
                <span className="purpose-index" aria-hidden="true">
                  02
                </span>
                <h3>Our Vision</h3>
                <p>
                  A future where people, processes, and technology work together, giving every business the confidence
                  and capability to grow.
                </p>
                <Link href="/services" className="purpose-band-cta">
                  Explore our services
                </Link>
              </div>
            </article>
          </div>
        </div>
      </Expand>

      <section className="about-difference" aria-label="What makes us different">
        <div className="difference-inner">
          <header className="difference-head">
            <div>
              <span className="difference-kicker">What makes us different</span>
              <h2>
                Four ways the
                <br />
                <span>work stays connected.</span>
              </h2>
            </div>
            <div className="difference-head-aside">
              <p>
                From the first brief to the long relationship, these are the principles that keep strategy, technology,
                and people moving as one.
              </p>
              <Link href="/contact" className="difference-cta">
                Talk to us
              </Link>
            </div>
          </header>
          <ol className="difference-rail">
            {differences.map(({ title, text, Icon }) => (
              <li key={title}>
                <span className="difference-icon" aria-hidden="true">
                  <Icon strokeWidth={1.8} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
