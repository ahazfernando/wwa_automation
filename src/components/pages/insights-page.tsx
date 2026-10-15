"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ArrowUpRight, Workflow, ChartNoAxesCombined, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { studioImage } from "@/lib/studio";

const articles = [
  {
    title: "5 signs your business needs process automation",
    category: "AUTOMATION",
    time: "4 MIN READ",
    intro:
      "Repetitive tasks, disconnected systems, and growing workloads can all point to a better way of working.",
    paragraphs: [
      "When your team spends more time moving information than using it, it’s worth looking at the process behind the task. Manual copying, repeated follow-ups, and inconsistent data are useful signals.",
      "Start with one repeatable workflow. Map its steps, identify the handoffs, and measure how much time it takes. Clear rules and reliable inputs make a process a good candidate for automation.",
      "Automation should support people, not add complexity. Keep a human review where decisions require judgment, and establish clear ownership before rolling out a new workflow.",
    ],
  },
  {
    title: "SEO vs. paid ads: where should you start?",
    category: "DIGITAL MARKETING",
    time: "3 MIN READ",
    intro: "Two paths to visibility. The right starting point depends on your goals, timing, and audience.",
    paragraphs: [
      "Paid advertising can help test an offer and reach a specific audience quickly. Organic search focuses on long-term visibility through relevant content, technical quality, and a useful website experience.",
      "Before choosing a channel, define your audience and what success looks like. A clear offer and a conversion-ready destination matter as much as the source of your traffic.",
      "The two approaches can work together. Insights from paid campaigns can inform content priorities, while useful organic content can strengthen your broader marketing strategy.",
    ],
  },
  {
    title: "Turn website visitors into meaningful connections",
    category: "WEBSITES & GROWTH",
    time: "3 MIN READ",
    intro: "Better conversions begin with clarity, trust, and a next step that feels natural.",
    paragraphs: [
      "Visitors need to understand what you offer, who it’s for, and why it matters. A focused message is more useful than a page trying to explain everything at once.",
      "Remove friction from your next step. Keep inquiry forms purposeful, make important information easy to find, and ensure the experience works well on a phone.",
      "Use analytics to understand where visitors stop. Test one meaningful change at a time and compare outcomes, rather than chasing a redesign without a clear goal.",
    ],
  },
];

export default function InsightsPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest");
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const article = active === null ? undefined : articles[active];

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const filtered = articles
    .map((item, index) => ({ ...item, index }))
    .filter((item) => `${item.title} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
  if (sort === "oldest") filtered.reverse();

  return (
    <>
      <section className="page-intro">
        <span className="eyebrow">IDEAS WORTH PUTTING TO WORK</span>
        <h1>
          A fresh perspective.
          <br />A smarter next step.
        </h1>
        <p>
          Thoughts on better processes, stronger connections, and the technology that brings them together.
        </p>
      </section>
      <div className="section-inner">
        <div className="insights-tools">
          <label className="search-box">
            <Search size={17} />
            <input
              aria-label="Search insights"
              placeholder="Search insights"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <select aria-label="Sort insights" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="latest">Latest first</option>
            <option value="oldest">Oldest first</option>
          </select>
          {query && (
            <Button variant="ghost" onClick={() => setQuery("")}>
              Clear
            </Button>
          )}
        </div>
        <div className="article-grid">
          {filtered.map((item) => (
            <article key={item.title} className="article-card">
              <div className="article-image">
                {item.index === 2 ? (
                  <img src={studioImage} width={1536} height={1024} alt="A collaborative business workspace" loading="lazy" />
                ) : item.index === 0 ? (
                  <Workflow />
                ) : (
                  <ChartNoAxesCombined />
                )}
              </div>
              <div className="article-body">
                <span className="eyebrow">
                  {item.category} · {item.time}
                </span>
                <h2>{item.title}</h2>
                <p>{item.intro}</p>
                <Button variant="link" onClick={() => setActive(item.index)}>
                  Read insight <ArrowUpRight />
                </Button>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <p className="empty-results">No insights match your search.</p>}
      </div>
      {article && (
        <div className="dialog-overlay" onClick={() => setActive(null)}>
          <section
            className="article-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-title"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === "Tab") {
                event.preventDefault();
                closeRef.current?.focus();
              }
            }}
          >
            <Button
              ref={closeRef}
              size="icon"
              variant="ghost"
              className="dialog-close"
              aria-label="Close article"
              onClick={() => setActive(null)}
            >
              <X />
            </Button>
            <span className="eyebrow">
              {article.category} · {article.time}
            </span>
            <h2 id="article-title">{article.title}</h2>
            {article.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        </div>
      )}
    </>
  );
}
