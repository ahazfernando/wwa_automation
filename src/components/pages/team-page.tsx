"use client";

import Link from "next/link";
import { Compass, Code2, Users, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { studioImage } from "@/lib/studio";

const disciplines = [
  [Compass, "Strategy & growth", "Turning business challenges into focused plans and meaningful customer connections."],
  [Code2, "Technology & execution", "Building connected systems, smarter processes, and better digital experiences."],
  [Users, "People & partnerships", "Bringing the right expertise together and supporting the relationships that make progress possible."],
] as const;

export default function TeamPage() {
  return (
    <>
      <section className="page-intro">
        <span className="eyebrow">THE PEOPLE BEHIND THE PROGRESS</span>
        <h1>
          Different minds.
          <br />
          One shared ambition.
        </h1>
        <p>
          Strategists, makers, and problem-solvers. We bring complementary expertise and a hands-on mindset to every
          business we work with.
        </p>
      </section>
      <img
        src={studioImage}
        width={1536}
        height={1024}
        className="about-cover"
        alt="A collaborative studio ready for a team conversation"
      />
      <div className="section-inner">
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
            come together around your goals. Team member profiles will be added when the Clyra team details are
            confirmed.
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
