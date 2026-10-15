"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceGroups } from "@/lib/catalog";

const helpOptions = [
  ...serviceGroups.filter((group) => group.id !== "offshore" && group.id !== "onshore"),
  { id: "staffing", name: "Onshore & Offshore Staffing" },
];

type InquirySummary = {
  name: string;
  email: string;
  phone: string;
  services: string;
  inquiry: string;
};

export default function ContactPage() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") ?? "";
  const [summary, setSummary] = useState<InquirySummary | null>(null);
  const [selected, setSelected] = useState<string[]>(service ? [service] : []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSummary({
      name: `${data.get("first")} ${data.get("last")}`,
      email: String(data.get("email")),
      phone: String(data.get("phone") ?? ""),
      services: selected.join(", "),
      inquiry: String(data.get("inquiry")),
    });
  }

  function download() {
    if (!summary) return;
    const blob = new Blob(
      [Object.entries(summary).map(([key, value]) => `${key.toUpperCase()}\n${value}`).join("\n\n")],
      { type: "text/plain" },
    );
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "clyra-inquiry.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <section className="page-intro centered">
        <span className="eyebrow">LET’S TALK POSSIBILITIES</span>
        <h1>Book a free consultation.</h1>
        <p>Tell us where you want to go. We’ll explore what it takes to get there.</p>
      </section>
      <div className="section-inner">
        <div className="contact-layout">
          <aside className="contact-aside">
            <h2>
              Your next step
              <br />
              starts here.
            </h2>
            <p>
              Whether you have a clear plan or a challenge to untangle, we’d love to hear about your business.
            </p>
            <div className="contact-detail">
              <h3>A conversation, not a commitment.</h3>
              <p>Share your goals and the services you’re interested in.</p>
            </div>
            <div className="contact-detail">
              <h3>Contact details</h3>
              <p>Clyra’s email, phone number, and social links are awaiting confirmation.</p>
            </div>
          </aside>
          <form className="inquiry-form" onSubmit={submit}>
            <h2>Let’s get to know you.</h2>
            <div className="form-grid">
              <label>
                First name
                <input name="first" placeholder="Your first name" required autoComplete="given-name" />
              </label>
              <label>
                Last name
                <input name="last" placeholder="Your last name" required autoComplete="family-name" />
              </label>
              <label>
                Email address
                <input name="email" type="email" placeholder="you@company.com" required autoComplete="email" />
              </label>
              <label>
                Phone number <span className="text-muted-foreground">(optional)</span>
                <input name="phone" type="tel" placeholder="Your phone number" autoComplete="tel" />
              </label>
            </div>
            <fieldset>
              <legend>What can we help you with?</legend>
              <div className="service-checks">
                {helpOptions.map((group) => (
                  <label key={group.id}>
                    <input
                      type="checkbox"
                      checked={selected.includes(group.name)}
                      onChange={(event) =>
                        setSelected((current) =>
                          event.target.checked
                            ? [...current, group.name]
                            : current.filter((item) => item !== group.name),
                        )
                      }
                    />
                    {group.name}
                  </label>
                ))}
              </div>
              {service && <p className="form-note">Interested in: {service}</p>}
            </fieldset>
            <label>
              Tell us about your business
              <textarea
                name="inquiry"
                rows={5}
                placeholder="Your goals, your challenges, your next big idea…"
                required
              />
            </label>
            <p className="form-note">
              You can review and download your inquiry. Message delivery will be available once Clyra’s contact
              details are confirmed.
            </p>
            <Button size="lg" className="form-submit" type="submit">
              Review inquiry <ArrowUpRight />
            </Button>
            {summary && (
              <section className="inquiry-summary" aria-live="polite">
                <h3 className="flex items-center gap-2">
                  <Check size={18} /> Your inquiry is ready
                </h3>
                <p>
                  <strong>{summary.name}</strong>
                  <br />
                  {summary.email}
                  <br />
                  {summary.services}
                </p>
                <p className="mt-3">{summary.inquiry}</p>
                <p className="form-note">Not sent. Download a copy to keep your details.</p>
                <Button onClick={download} type="button">
                  <Download />
                  Download inquiry
                </Button>
              </section>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
