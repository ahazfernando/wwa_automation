"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Workflow, ChartNoAxesCombined, Monitor, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactCTA } from "@/components/site-shell";
import { serviceGroups } from "@/lib/catalog";

const icons = [Workflow, ChartNoAxesCombined, Monitor, Users, MapPin];

const staffingGroups = serviceGroups.filter((group) => group.id === "offshore" || group.id === "onshore");
const serviceTabs = [
  ...serviceGroups.filter((group) => group.id !== "offshore" && group.id !== "onshore"),
  { id: "staffing", short: "Onshore & offshore staffing" },
];

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("category");
  const staffing = requested === "staffing" || requested === "offshore" || requested === "onshore";
  const category = serviceGroups.some((group) => group.id === requested) ? requested : "automation";
  const selected = serviceGroups.find((group) => group.id === category) ?? serviceGroups[0];
  const index = serviceGroups.findIndex((group) => group.id === selected.id);
  const Icon = icons[index] ?? Workflow;

  return (
    <>
      <section className="page-intro centered">
        <span className="eyebrow">CONNECTED EXPERTISE</span>
        <h1>
          Services that move
          <br />
          your business forward.
        </h1>
        <p>
          From smarter operations to stronger connections, find the expertise you need to turn your next challenge
          into your next opportunity.
        </p>
      </section>
      <section className="catalog-section">
        <div className="section-inner">
          <nav className="category-tabs" aria-label="Service categories">
            {serviceTabs.map((group) => (
              <Button key={group.id} variant={(staffing ? group.id === "staffing" : group.id === category) ? "default" : "outline"} asChild>
                <Link
                  href={`/services?category=${group.id}`}
                  aria-current={(staffing ? group.id === "staffing" : group.id === category) ? "page" : undefined}
                >
                  {group.short}
                </Link>
              </Button>
            ))}
          </nav>
          {staffing ? (
            <>
              <div className="catalog-title">
                <h2>Onshore & Offshore Staffing</h2>
                <p>Great work starts with great people. Build a capable, connected team with specialist talent, wherever your business needs it.</p>
              </div>
              {staffingGroups.map((group) => {
                const GroupIcon = icons[serviceGroups.findIndex((item) => item.id === group.id)] ?? Users;
                return (
                  <div key={group.id}>
                    <h3 className="staffing-group-title">{group.name}</h3>
                    <div className="service-grid">
                      {group.items.map((item) => (
                        <article className="service-card" key={item}>
                          <GroupIcon />
                          <h3>{item}</h3>
                          <Button variant="link" asChild>
                            <Link href={`/contact?service=${encodeURIComponent(item)}`}>
                              Let’s discuss <ArrowUpRight />
                            </Link>
                          </Button>
                        </article>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="catalog-title">
                <h2>{selected.name}</h2>
                <p>{selected.description}</p>
              </div>
              <div className="service-grid">
                {selected.items.map((item) => (
                  <article className="service-card" key={item}>
                    <Icon />
                    <h3>{item}</h3>
                    <Button variant="link" asChild>
                      <Link href={`/contact?service=${encodeURIComponent(item)}`}>
                        Let’s discuss <ArrowUpRight />
                      </Link>
                    </Button>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
