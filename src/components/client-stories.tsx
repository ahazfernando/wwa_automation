"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    image: "/clientimages/MaleImageD1.png",
    quote:
      "We Will Australia transformed our recruitment and streamlined our systems. True partnership across all services.",
    name: "Michael Thompson",
    role: "CEO, Regional Health Solutions",
  },
  {
    image: "/clientimages/FemaleImageD1.png",
    quote:
      "Our brand finally reaches the right people. The marketing and technology work together, and the results are easy to see.",
    name: "Amelia Hart",
    role: "Director, Northshore Hospitality",
  },
  {
    image: "/clientimages/2%202.png",
    quote:
      "They connected our systems and gave the team time back. One partner for strategy, software, and the people to run it.",
    name: "Daniel Costa",
    role: "Founder, Harbour Property Group",
  },
] as const;

export default function ClientStories() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const max = Math.max(0, track.scrollWidth - viewport.clientWidth);
    setMaxOffset(max);
    setOffset((current) => Math.min(current, max));
  }, []);

  useEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [measure]);

  const go = (direction: number) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(".story-card");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    const step = card.getBoundingClientRect().width + gap;
    setOffset((current) => Math.max(0, Math.min(maxOffset, current + direction * step)));
  };

  const atStart = offset <= 1;
  const atEnd = offset >= maxOffset - 1;

  return (
    <section className="stories" aria-roledescription="carousel" aria-label="Success stories from our clients">
      <div className="stories-intro">
        <span className="stories-badge">More to Expect</span>
        <h2>
          Success Stories
          <br />
          From Our Clients
        </h2>
        <p>Partnerships across recruitment, brand, and the systems behind the work.</p>
        <div className="stories-rating">
          <div className="stories-stars" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }, (_, star) => (
              <Star key={star} strokeWidth={0} aria-hidden="true" />
            ))}
          </div>
          <strong>25 + Reviews</strong>
        </div>
        <div className="stories-nav">
          <button type="button" aria-label="Previous stories" onClick={() => go(-1)} disabled={atStart}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" aria-label="Next stories" onClick={() => go(1)} disabled={atEnd}>
            <ChevronRight size={18} />
          </button>
        </div>
        <p className="sample-note">Sample stories · client testimonials to be confirmed</p>
      </div>
      <div className="stories-viewport" ref={viewportRef}>
        <div className="stories-track" ref={trackRef} style={{ transform: `translateX(-${offset}px)` }}>
          {testimonials.map((item) => (
            <article className="story-card" key={item.name}>
              <div className="story-copy">
                <div className="story-stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star key={star} strokeWidth={0} aria-hidden="true" />
                  ))}
                </div>
                <p>{item.quote}</p>
                <div className="story-person">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
              <div className="story-mark" aria-hidden="true">
                <svg viewBox="0 0 140 160">
                  <path d="M18 28c22 4 28 36 18 68-7 22 0 38 18 44 20 7 34-12 42-34 9-24 16-58 32-72-24 10-34 38-40 64-7 28-18 36-30 32-14-5-16-24-10-46 8-30 2-64-30-56z" />
                </svg>
              </div>
              <div className="story-photo">
                <img src={item.image} alt="" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
