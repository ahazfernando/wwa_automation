"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PartnerPeople from "@/components/partner-people";
import { Button } from "@/components/ui/button";

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
            <a href="#partners" className="tunnel-btn is-secondary">
              Meet the team
            </a>
          </div>
        </div>
      </section>

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
