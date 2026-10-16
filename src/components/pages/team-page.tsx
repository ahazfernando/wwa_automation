"use client";

import Link from "next/link";
import { Compass, Code2, Users, ArrowUpRight } from "lucide-react";
import PartnerPeople from "@/components/partner-people";
import { Button } from "@/components/ui/button";

const disciplines = [
  [Compass, "Strategy & growth", "Turning business challenges into focused plans and meaningful customer connections."],
  [Code2, "Technology & execution", "Building connected systems, smarter processes, and better digital experiences."],
  [Users, "People & partnerships", "Bringing the right expertise together and supporting the relationships that make progress possible."],
] as const;

export default function TeamPage() {
  return (
    <>
      <section className="team-hero" aria-label="Our team">
        <img
          className="team-hero-image"
          src="/team/team-hero.jpg"
          width={2048}
          height={1152}
          alt=""
        />
        <div className="team-hero-shade" aria-hidden="true" />
        <div className="team-hero-copy">
          <span className="hero-badge">The People Behind the Progress</span>
          <h1>
            <span className="team-hero-title-line">
              Different minds.
              <ArrowUpRight aria-hidden="true" />
            </span>
            <br />
            One shared ambition.
          </h1>
          <p>
            Strategists, makers, and problem-solvers. We bring complementary expertise and a hands-on mindset to every
            business we work with.
          </p>
          <div className="hero-actions">
            <Link href="/contact?service=Careers" className="tunnel-btn">
              Join the team
            </Link>
            <a href="#disciplines" className="tunnel-btn is-secondary">
              How we work
            </a>
          </div>
        </div>
      </section>

      <div className="section-inner" id="disciplines">
        <section className="about-story">
          <div>
            <span className="eyebrow">THE ROUND TABLE</span>
            <h2>
              People who connect
              <br />
              the dots.
            </h2>
          </div>
          <p>
            Our strength is how we work together. Business understanding, technical expertise, and creative thinking
            come together around your goals.
          </p>
        </section>
        <div className="team-grid">
          {disciplines.map(([Icon, title, text]) => (
            <article className="team-card" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
      <PartnerPeople />
      <div className="section-inner">
        <section className="team-banner">
          <span className="eyebrow">GROW WITH US</span>
          <h2>Good people make great things happen.</h2>
          <p className="mb-6 text-muted-foreground">
            Interested in bringing your expertise to Clyra? Let’s start a conversation.
          </p>
          <Button asChild>
            <Link href="/contact?service=Careers">
              Express your interest <ArrowUpRight />
            </Link>
          </Button>
        </section>
      </div>
    </>
  );
}
