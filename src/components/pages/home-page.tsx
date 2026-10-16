"use client";

import ClientLogos from "@/components/client-logos";
import ClientStories from "@/components/client-stories";
import TunnelSequence from "@/components/tunnel-sequence";
import { ContactCTA } from "@/components/site-shell";
import { advantages } from "@/lib/catalog";

export default function HomePage() {
  return (
    <div className="home-page">
      <TunnelSequence />
      <ClientStories />
      <ClientLogos />
      <ContactCTA />
      <section className="values-section" aria-label="The Clyra Difference">
        <div className="values-inner">
          <div className="values-head">
            <div>
              <span className="stories-badge">The Clyra Difference</span>
              <h2>
                More than a service.
                <br />
                A partner in your progress.
              </h2>
            </div>
            <p>
              Different expertise. Shared ambition.
              <br />
              Every part of your business, working better together.
            </p>
          </div>
          <div className="values-grid">
            {advantages.map(([title, text], index) => (
              <div className="value-item" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
