"use client";

import { useState } from "react";

const partners = [
  {
    image: "/people/MaleImageD1%201.png",
    name: "Michael Thompson",
    role: "Healthcare",
    bio: "Built regional health operations that needed recruitment, systems, and brand working as one. A long-term partner across every Clyra practice.",
  },
  {
    image: "/people/MaleImageD2%201.png",
    name: "James Whitfield",
    role: "Property",
    bio: "Scaled a property group by connecting people, processes, and digital channels. Strategy and staffing that stay close to the work.",
  },
  {
    image: "/people/MaleImageD3%201.png",
    name: "Daniel Costa",
    role: "Hospitality",
    bio: "Grew hospitality brands with sharper marketing and the systems behind the guest experience. One partner from brief to delivery.",
  },
  {
    image: "/people/FeMaleImageD4%201.png",
    name: "Amelia Hart",
    role: "Brand & Marketing",
    bio: "Brought brand, content, and performance into one rhythm. Clear creative direction backed by the technology to measure what matters.",
  },
] as const;

export default function PartnerPeople() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="partners" className="partners" aria-label="Industry partners">
      <div className="partners-orbit" aria-hidden="true" />
      <header className="partners-heading">
        <span className="partners-badge">Industry Partners</span>
        <h2>
          <span className="partners-heading-lead">Partnered with most of the</span>
          <span className="partners-heading-accent">top people at each industry</span>
        </h2>
      </header>

      <div className="partners-carousel">
        <div className="partners-viewport">
          <div className="partners-track">
            {partners.map((person) => {
              const isOpen = active === person.name;
              return (
                <article
                  key={person.name}
                  className={`partner-card${isOpen ? " is-open" : ""}`}
                  onMouseEnter={() => setActive(person.name)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(person.name)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                >
                  <div className="partner-face">
                    <div className="partner-glow" aria-hidden="true" />
                    <div className="partner-photo">
                      <img src={person.image} alt="" />
                    </div>
                    <div className="partner-shade" aria-hidden="true" />
                    <div className="partner-meta">
                      <strong>{person.name}</strong>
                      <span>{person.role}</span>
                    </div>
                  </div>
                  <div className="partner-back">
                    <div className="partner-back-top">
                      <strong>{person.name}</strong>
                      <span>{person.role}</span>
                    </div>
                    <p>{person.bio}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
