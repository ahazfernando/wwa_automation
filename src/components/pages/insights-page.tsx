"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { studioImage } from "@/lib/studio";

type Article = {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  intro: string;
  paragraphs: string[];
  image?: string;
  featured?: boolean;
  breaking?: boolean;
};

const categories = ["All", "Automation", "Marketing", "Staffing", "Technology", "Growth"] as const;

const articles: Article[] = [
  {
    id: "automation-signs",
    title: "5 signs your business needs process automation",
    category: "Automation",
    date: "October 12, 2026",
    time: "4 MIN READ",
    intro:
      "Repetitive tasks, disconnected systems, and growing workloads can all point to a better way of working.",
    paragraphs: [
      "When your team spends more time moving information than using it, it’s worth looking at the process behind the task. Manual copying, repeated follow-ups, and inconsistent data are useful signals.",
      "Start with one repeatable workflow. Map its steps, identify the handoffs, and measure how much time it takes. Clear rules and reliable inputs make a process a good candidate for automation.",
      "Automation should support people, not add complexity. Keep a human review where decisions require judgment, and establish clear ownership before rolling out a new workflow.",
    ],
    image: "/assets/PROCESSAUTOMATION.png",
    breaking: true,
  },
  {
    id: "seo-paid",
    title: "SEO vs. paid ads: where should you start?",
    category: "Marketing",
    date: "October 8, 2026",
    time: "3 MIN READ",
    intro: "Two paths to visibility. The right starting point depends on your goals, timing, and audience.",
    paragraphs: [
      "Paid advertising can help test an offer and reach a specific audience quickly. Organic search focuses on long-term visibility through relevant content, technical quality, and a useful website experience.",
      "Before choosing a channel, define your audience and what success looks like. A clear offer and a conversion-ready destination matter as much as the source of your traffic.",
      "The two approaches can work together. Insights from paid campaigns can inform content priorities, while useful organic content can strengthen your broader marketing strategy.",
    ],
    image: "/assets/Purple%20billboard%20trio%20with%20preserved%20branding.png",
  },
  {
    id: "visitors-connections",
    title: "Turn website visitors into meaningful connections",
    category: "Growth",
    date: "October 4, 2026",
    time: "3 MIN READ",
    intro: "Better conversions begin with clarity, trust, and a next step that feels natural.",
    paragraphs: [
      "Visitors need to understand what you offer, who it’s for, and why it matters. A focused message is more useful than a page trying to explain everything at once.",
      "Remove friction from your next step. Keep inquiry forms purposeful, make important information easy to find, and ensure the experience works well on a phone.",
      "Use analytics to understand where visitors stop. Test one meaningful change at a time and compare outcomes, rather than chasing a redesign without a clear goal.",
    ],
    image: studioImage,
    featured: true,
  },
  {
    id: "staffing-hybrid",
    title: "Building teams that work onshore and offshore",
    category: "Staffing",
    date: "September 28, 2026",
    time: "4 MIN READ",
    intro: "Great work starts with great people — wherever your business needs them.",
    paragraphs: [
      "Hybrid teams succeed when roles are clear, communication is intentional, and onboarding is treated as part of delivery — not an afterthought.",
      "Start with the outcomes you need, then design the mix of onshore leadership and offshore capability around those outcomes.",
      "Culture travels through rhythm: shared standups, documented decisions, and a single source of truth for priorities.",
    ],
    image: "/assets/Purple%20checklist%20scroll%20and%20donut%20chart%201.png",
  },
  {
    id: "it-connected",
    title: "Connected systems for businesses that want to move faster",
    category: "Technology",
    date: "September 22, 2026",
    time: "5 MIN READ",
    intro: "Technology should feel invisible when it works — and obvious when it doesn’t.",
    paragraphs: [
      "Most businesses don’t need more tools. They need the right tools talking to each other, with clear ownership and simple recovery paths when something breaks.",
      "Start by mapping the journeys that matter: sales, service, finance, and delivery. Then connect the systems that sit underneath those journeys.",
      "A good IT partner reduces noise. Fewer logins, fewer handoffs, and more time spent on work that actually moves the business.",
    ],
    image: "/assets/MarketingAssets.png",
  },
  {
    id: "content-that-converts",
    title: "Content that earns attention — and keeps it",
    category: "Marketing",
    date: "September 16, 2026",
    time: "3 MIN READ",
    intro: "Useful beats clever. Consistency beats campaigns that disappear after a week.",
    paragraphs: [
      "Audience-first content answers a real question before it asks for anything in return.",
      "Pair every piece with a clear next step: a service page, a conversation, or a practical download.",
      "Measure what people finish, not only what they click. Completion is a better signal of trust.",
    ],
    image: "/assets/industry-hospitality.jpg",
  },
  {
    id: "ops-clarity",
    title: "Operational clarity before you automate anything",
    category: "Automation",
    date: "September 10, 2026",
    time: "4 MIN READ",
    intro: "Automating a messy process usually creates a faster mess.",
    paragraphs: [
      "Map the current state with the people who live it. Note exceptions, approvals, and the moments where judgment still matters.",
      "Simplify first. Remove duplicate steps, unclear owners, and tools that exist only because “we’ve always done it this way.”",
      "Then automate the stable core. Keep humans in the loop where outcomes need care.",
    ],
    image: "/assets/industry-manufacturing.jpg",
  },
  {
    id: "local-reputation",
    title: "Local visibility still wins for Australian brands",
    category: "Marketing",
    date: "September 3, 2026",
    time: "3 MIN READ",
    intro: "Search, reviews, and a trustworthy website remain the quiet engines of local growth.",
    paragraphs: [
      "People still look nearby when they need a reliable partner. Make sure your business shows up clearly when they do.",
      "Reviews are social proof and product feedback. Respond consistently and treat patterns as improvement opportunities.",
      "A fast, mobile-friendly site turns that attention into inquiries instead of bounce.",
    ],
    image: "/assets/industry-education.jpg",
  },
  {
    id: "talent-onboarding",
    title: "Onboarding that makes new hires productive in weeks, not months",
    category: "Staffing",
    date: "August 27, 2026",
    time: "4 MIN READ",
    intro: "A strong first month is a retention strategy disguised as process design.",
    paragraphs: [
      "Give every role a 30-day plan: tools, people, priorities, and the first piece of work that creates real value.",
      "Pair new hires with a named buddy and a shared checklist so nothing important lives only in someone’s head.",
      "Measure time-to-first-contribution. It’s one of the clearest signals that onboarding is working.",
    ],
    image: "/assets/industry-automotive.jpg",
  },
  {
    id: "secure-basics",
    title: "The security basics every growing business should lock in",
    category: "Technology",
    date: "August 20, 2026",
    time: "5 MIN READ",
    intro: "Most incidents start with something ordinary: access, updates, or a shared password.",
    paragraphs: [
      "Identity, MFA, and least-privilege access prevent more pain than most “advanced” tools.",
      "Patching and backups are unglamorous — and non-negotiable. Test restores, not only backup success messages.",
      "Train people on phishing with real examples from your industry. Awareness is part of the stack.",
    ],
    image: "/assets/e6a13f776fd8c4dbf29e5f47b96633f8.jpg",
  },
  {
    id: "franchise-marketing",
    title: "Social media marketing for franchises that need consistency",
    category: "Marketing",
    date: "August 14, 2026",
    time: "4 MIN READ",
    intro: "Brand guidelines matter. Local voice matters more when it’s still on-brand.",
    paragraphs: [
      "Central templates plus local storytelling give franchises speed without chaos.",
      "Agree on what every location must say — and what they’re free to adapt for their community.",
      "Shared reporting keeps the network honest about what’s working across markets.",
    ],
    image: "/assets/industry-engineering.jpg",
  },
  {
    id: "growth-systems",
    title: "Growth systems beat one-off campaigns",
    category: "Growth",
    date: "August 7, 2026",
    time: "3 MIN READ",
    intro: "When marketing, sales, and delivery share the same rhythm, results compound.",
    paragraphs: [
      "Define the handoff from interest to inquiry to delivery before you spend more on acquisition.",
      "Use one pipeline view so teams stop arguing about whose numbers are “real.”",
      "Iterate weekly on the bottleneck, not monthly on the whole funnel.",
    ],
    image: studioImage,
  },
];

function categoryKey(category: string) {
  return category.toUpperCase();
}

export default function InsightsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const article = articles.find((item) => item.id === activeId);

  useEffect(() => {
    if (!activeId) return;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeId]);

  const filtered = articles.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const haystack = `${item.title} ${item.category} ${item.intro}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const featured = filtered.find((item) => item.featured) ?? filtered[0];
  const freshList = filtered.filter((item) => item.id !== featured?.id).slice(0, 5);
  const stacked = filtered.filter((item) => item.id !== featured?.id).slice(0, 2);
  const popular = filtered.filter((item) => item.id !== featured?.id).slice(2, 6);
  const breaking = filtered.filter((item) => item.image).slice(0, 4);
  const more = filtered.filter((item) => item.image).slice(4, 8);

  const open = (id: string) => setActiveId(id);

  return (
    <div className="insights-page">
      <section className="insights-masthead">
        <div className="section-inner">
          <span className="eyebrow">IDEAS WORTH PUTTING TO WORK</span>
          <h1>Insights</h1>
          <p>Practical perspectives on automation, marketing, staffing, and the systems that connect them.</p>
        </div>
      </section>

      <div className="insights-cats" role="tablist" aria-label="Insight categories">
        <div className="section-inner insights-cats-row">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              className={activeCategory === category ? "is-active" : undefined}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
          <label className="insights-search">
            <Search size={15} aria-hidden="true" />
            <input
              aria-label="Search insights"
              placeholder="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
      </div>

      {featured && (
        <div className="insights-ticker">
          <div className="section-inner">
            <span>Exclusive</span>
            <p>
              {featured.title} — {featured.date}
            </p>
          </div>
        </div>
      )}

      <div className="section-inner insights-body">
        {filtered.length === 0 ? (
          <p className="empty-results">No insights match your search.</p>
        ) : (
          <>
            <section className="insights-fresh" aria-labelledby="fresh-heading">
              <div className="insights-fresh-list">
                <h2 id="fresh-heading">Fresh stories</h2>
                <ul>
                  {freshList.map((item) => (
                    <li key={item.id}>
                      <button type="button" onClick={() => open(item.id)}>
                        <span className="insights-tag">{categoryKey(item.category)}</span>
                        <strong>{item.title}</strong>
                        <time>{item.date}</time>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {featured && (
                <button type="button" className="insights-feature" onClick={() => open(featured.id)}>
                  {featured.image && <img src={featured.image} alt="" />}
                  <div className="insights-feature-copy">
                    <span className="insights-tag">{categoryKey(featured.category)}</span>
                    <h3>{featured.title}</h3>
                    <p>{featured.intro}</p>
                  </div>
                </button>
              )}

              <div className="insights-stack">
                {stacked.map((item) => (
                  <button key={item.id} type="button" className="insights-stack-item" onClick={() => open(item.id)}>
                    {item.image && <img src={item.image} alt="" />}
                    <span className="insights-tag">{categoryKey(item.category)}</span>
                    <strong>{item.title}</strong>
                    <p>{item.intro}</p>
                  </button>
                ))}
              </div>

              <aside className="insights-popular" aria-labelledby="popular-heading">
                <h2 id="popular-heading">Popular</h2>
                <ol>
                  {popular.map((item) => (
                    <li key={item.id}>
                      <button type="button" onClick={() => open(item.id)}>
                        <span className="insights-tag">{categoryKey(item.category)}</span>
                        <strong>{item.title}</strong>
                        <time>{item.date}</time>
                      </button>
                    </li>
                  ))}
                </ol>
              </aside>
            </section>

            <section className="insights-breaking" aria-labelledby="breaking-heading">
              <div className="insights-breaking-head">
                <h2 id="breaking-heading">
                  <span>Breaking</span>
                </h2>
              </div>
              <div className="insights-breaking-grid">
                {breaking.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={item.breaking || index === 0 ? "insights-cover is-break" : "insights-cover"}
                    onClick={() => open(item.id)}
                  >
                    {item.image && <img src={item.image} alt="" />}
                    <span className="insights-tag">{categoryKey(item.category)}</span>
                    <strong>{item.title}</strong>
                  </button>
                ))}
              </div>
            </section>

            <section className="insights-more" aria-label="More insights">
              {more.map((item) => (
                <button key={item.id} type="button" className="insights-more-item" onClick={() => open(item.id)}>
                  <div>
                    <span className="insights-tag">{categoryKey(item.category)}</span>
                    <strong>{item.title}</strong>
                    <time>{item.date}</time>
                  </div>
                  {item.image && <img src={item.image} alt="" />}
                </button>
              ))}
            </section>
          </>
        )}
      </div>

      {article && (
        <div className="dialog-overlay" onClick={() => setActiveId(null)}>
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
              onClick={() => setActiveId(null)}
            >
              <X />
            </Button>
            <span className="eyebrow">
              {categoryKey(article.category)} · {article.time}
            </span>
            <h2 id="article-title">{article.title}</h2>
            {article.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
