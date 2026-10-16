"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight, Asterisk, ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Our team" },
  { href: "/insights", label: "Insights" },
] as const;

const serviceMenu = [
  {
    id: "automation",
    label: "Process Automation",
    title: ["Process", "Automation"],
    body: "Give your team their time back. We connect your systems and simplify the everyday, so you can focus on the extraordinary.",
    image: "/clientlogo/ProcessAutomationAssetD1.png",
  },
  {
    id: "marketing",
    label: "Digital Marketing",
    title: ["Digital", "Marketing"],
    body: "Be seen by the right people.",
    image: "/assets/Purple%20billboard%20trio%20with%20preserved%20branding.png",
  },
  {
    id: "staffing",
    label: "Onshore & Offshore Staffing",
    title: ["Onshore & Offshore", "Staffing"],
    body: "Great work starts with great people. Build a capable, connected team with specialist talent, wherever your business needs it.",
  },
  {
    id: "technology",
    label: "IT Solutions",
    title: ["Technology", "& Software"],
    body: "Technology that works for you. Thoughtfully designed websites, connected business systems, and IT solutions built for what comes next.",
  },
] as const;

export function Brand({ logo = false }: { logo?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label={logo ? "We Will Australia home" : "Clyra home"}>
      {logo ? (
        <img src="/logo/WWALogoBlack.png" alt="" />
      ) : (
        <>
          <Asterisk strokeWidth={2.8} />
          <span>
            clyra<span className="brand-period">.</span>
          </span>
        </>
      )}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesMobile, setServicesMobile] = useState(false);
  const [activeService, setActiveService] = useState<(typeof serviceMenu)[number]["id"]>(serviceMenu[0].id);
  const pathname = usePathname();
  const router = useRouter();
  const featured = serviceMenu.find((item) => item.id === activeService) ?? serviceMenu[0];

  useEffect(() => {
    setServicesOpen(false);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [servicesOpen]);

  const go = (href: string) => {
    setOpen(false);
    setServicesOpen(false);
    router.push(href);
  };

  return (
    <header className="site-header">
      <div className="header-inner" onMouseLeave={() => setServicesOpen(false)}>
        <Brand logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) =>
            item.href === "/services" ? (
              <button
                key={item.href}
                type="button"
                className={pathname === item.href ? "nav-link active" : "nav-link"}
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onMouseEnter={() => setServicesOpen(true)}
                onClick={() => setServicesOpen(true)}
              >
                {item.label}
                <ChevronDown aria-hidden="true" />
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "nav-link active" : "nav-link"}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="header-actions">
          <Link href="/contact" className="header-icon" aria-label="Phone">
            <Phone />
          </Link>
          <Link href="/contact" className="header-icon" aria-label="Email">
            <Mail />
          </Link>
          <Link href="/contact" className="header-contact">
            Contact Us
          </Link>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
        {servicesOpen && (
          <div className="services-menu" id="services-menu">
            <div className="services-menu-card">
              <div className="services-menu-list" role="list">
                {serviceMenu.map((item) => (
                  <Link
                    key={item.id}
                    href={`/services?category=${item.id}`}
                    role="listitem"
                    className={item.id === featured.id ? "is-active" : undefined}
                    onMouseEnter={() => setActiveService(item.id)}
                    onFocus={() => setActiveService(item.id)}
                    onClick={(event) => {
                      event.preventDefault();
                      go(`/services?category=${item.id}`);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className={featured.id === "marketing" ? "services-menu-feature is-marketing" : "services-menu-feature"}>
                <span className="services-menu-kicker">Services</span>
                <h2>
                  <span>{featured.title[0]}</span>
                  <span>{featured.title[1]}</span>
                </h2>
                <p>{featured.body}</p>
                <Link
                  href={`/services?category=${featured.id}`}
                  className="services-menu-cta"
                  onClick={(event) => {
                    event.preventDefault();
                    go(`/services?category=${featured.id}`);
                  }}
                >
                  View service
                </Link>
                <div
                  className={
                    "image" in featured
                      ? `services-menu-art is-image${featured.id === "marketing" ? " is-marketing" : ""}`
                      : "services-menu-art"
                  }
                  aria-hidden="true"
                >
                  {"image" in featured ? (
                    <img src={featured.image} alt="" />
                  ) : (
                    <svg viewBox="0 0 360 340">
                      <defs>
                        <linearGradient id="services-art" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="#f0d8ff" stopOpacity="0.95" />
                          <stop offset="1" stopColor="#7a45e8" stopOpacity="0.25" />
                        </linearGradient>
                      </defs>
                      <path fill="url(#services-art)" d="M150 28h150l48 84-48 84H150l-48-84z" opacity="0.9" />
                      <path fill="#c9a6ff" d="M214 78h118l38 66-38 66H214l-38-66z" opacity="0.55" />
                      <path fill="#f3e8ff" d="M248 112h92l30 52-30 52h-92l-30-52z" opacity="0.85" />
                    </svg>
                  )}
                </div>
              </div>
              <button type="button" className="services-menu-close" aria-label="Close services menu" onClick={() => setServicesOpen(false)}>
                <X />
              </button>
            </div>
          </div>
        )}
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item) =>
            item.href === "/services" ? (
              <div className="mobile-services" key={item.href}>
                <button type="button" aria-expanded={servicesMobile} onClick={() => setServicesMobile((current) => !current)}>
                  Services
                  <ChevronDown aria-hidden="true" />
                </button>
                {servicesMobile &&
                  serviceMenu.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services?category=${service.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        go(`/services?category=${service.id}`);
                      }}
                    >
                      {service.label}
                    </Link>
                  ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.href);
                }}
              >
                {item.label}
                <ArrowUpRight />
              </Link>
            ),
          )}
          <Link
            href="/contact"
            onClick={(event) => {
              event.preventDefault();
              go("/contact");
            }}
          >
            Contact us
            <ArrowUpRight />
          </Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <span className="eyebrow">YOUR NEXT CHAPTER</span>
          <h2>
            Let’s move your
            <br />
            business forward<span className="accent-dot">.</span>
          </h2>
        </div>
        <Button size="lg" asChild>
          <Link href="/contact">
            Start a conversation <ArrowUpRight />
          </Link>
        </Button>
      </div>
      <div className="footer-main">
        <div>
          <Brand logo />
          <p>
            Smart strategy. Thoughtful technology.
            <br />
            People who make it happen.
          </p>
        </div>
        <div>
          <span className="footer-label">EXPLORE</span>
          {navigation.slice(1).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <span className="footer-label">WHAT WE DO</span>
          <Link href="/services?category=automation">Process automation</Link>
          <Link href="/services?category=marketing">Digital marketing</Link>
          <Link href="/services?category=offshore">Onshore & offshore staffing</Link>
          <Link href="/services?category=technology">IT Solutions</Link>
        </div>
        <div>
          <span className="footer-label">GET IN TOUCH</span>
          <Link href="/contact">
            Book a consultation <ArrowUpRight size={14} />
          </Link>
          <p>
            Better business starts
            <br />
            with a conversation.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} We Will Australia. All rights reserved.</span>
        <span>Strategy. Technology. People.</span>
      </div>
    </footer>
  );
}

export function ContactCTA() {
  return (
    <section className="contact-band">
      <div className="section-inner">
        <span className="eyebrow">CONNECTED BY DESIGN</span>
        <h2>
          One team. Every service
          <br />
          your business needs to grow.
        </h2>
        <Button size="lg" asChild>
          <Link href="/contact">
            Build something better <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
