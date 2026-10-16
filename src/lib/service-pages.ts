import { serviceGroups } from "@/lib/catalog";
import { studioImage } from "@/lib/studio";

export type ServiceMedia = {
  src: string;
  position: string;
};

export type ServiceBand = {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  image: ServiceMedia;
};

export type ServicePageContent = {
  id: string;
  badge: string;
  headline: string;
  intro: string;
  heroImage?: string;
  collage: [ServiceMedia, ServiceMedia, ServiceMedia];
  bands: ServiceBand[];
  advantageKicker: string;
  advantageTitle: string;
  advantageHref: string;
  advantageImage: ServiceMedia;
  whyTitle: string;
  whyText: string;
};

const automationArt = "/clientlogo/ProcessAutomationAssetD1.png";
const marketingArt = "/assets/Purple%20billboard%20trio%20with%20preserved%20branding.png";

const itemCopy = {
  "Workflow Automation": "The repeated steps between teams, connected so the work moves without a manual chase.",
  "CRM & Sales Automation": "Leads, follow-ups, and pipeline updates that stay current while the team stays with the customer.",
  "Email & Communication Automation": "The right message, sent at the right moment, without rebuilding it every time.",
  "AI & Chatbot Automation": "Common questions answered immediately, and everything else routed to a person who can help.",
  "Finance & Accounting Automation": "Invoices, reconciliations, and reports that stay current without the month-end scramble.",
  "Search Engine Optimization (SEO)": "Search that reflects how people look for you, and pages built to earn that attention.",
  "Social Media Marketing (SMM)": "A presence that sounds like the brand and shows up where your customers already spend time.",
  "Paid Advertising (PPC / Paid Media)": "Paid media aimed at the campaigns that earn their place, with spend you can explain.",
  "Content Marketing": "Stories, guides, and proof that give people a reason to stay and a reason to enquire.",
  "Email Marketing & Automation": "Sequences that continue the conversation after the first visit, timed to what the person did.",
  "Creative Design & Video Marketing": "Design and film that make the offer clear before anyone reads a paragraph.",
  "Website Design & Conversion Optimization": "A site that is easy to use and obvious about the next step.",
  "Influencer & Affiliate Marketing": "Partners who already have the audience, briefed around the offer you actually sell.",
  "Analytics & Marketing Strategy": "The numbers behind the work, so the next campaign starts from what the last one taught you.",
  "Local & Reputation Marketing": "Local search, reviews, and the details that decide whether someone nearby gets in touch.",
  "Managed IT Services (MSP)": "Day-to-day support and monitoring so the tools your team relies on stay available.",
  "Website & E-commerce Solutions": "Sites and stores built to be clear, fast, and ready for the way you sell.",
  "Cloud Solutions & Microsoft 365": "Mail, files, and collaboration set up so people can work together without the workaround.",
  "Business Process & AI Automation": "Operational work technology can take on, connected to the systems you already use.",
  "Agriculture & IoT Technology": "Sensors, data, and the practical systems around them for operations that happen in the field.",
  "Business Software & Systems Integration": "The tools you already pay for, talking to each other instead of waiting on a spreadsheet.",
  "IT Consulting, Training & Digital Transformation": "Advice, training, and a plan for the change, so the new system is one people actually use.",
  "Lead Generation & Sales Administration": "Research, lists, and the admin around the pipeline, handled by people who treat it as the job.",
  "Data Entry, Reporting & Analysis": "Clean records and reports your team can trust, prepared by specialists who live in the detail.",
  "CAD, Drafting & Design Support": "Drawing and design support that keeps project work moving between reviews.",
  "Medical & Allied Health Administration": "Patient admin, scheduling, and the paperwork around care, handled with care.",
  "Procurement & Supply Chain Administration": "Orders, suppliers, and the tracking that keeps stock and spend visible.",
  Hospitality: "People for the floor, the desk, and the shifts a venue cannot run without.",
  Manufacturing: "Operators and support for production environments that need reliability on site.",
  Engineering: "Technical people placed where the project, the site, or the workshop needs them.",
  Education: "Staff who fit the classroom, the campus, and the way the institution works.",
  Automotive: "People for workshops, dealerships, and the customer-facing side of the trade.",
} satisfies Record<(typeof serviceGroups)[number]["items"][number], string>;

const crops = ["16% 28%", "78% 36%", "42% 72%", "88% 62%", "24% 80%", "60% 18%", "8% 50%", "70% 78%", "50% 44%", "32% 16%"];

function crop(index: number): ServiceMedia {
  return { src: studioImage, position: crops[index % crops.length] ?? "center" };
}

function art(src: string): ServiceMedia {
  return { src, position: "center" };
}

function discuss(title: string): Pick<ServiceBand, "href" | "cta"> {
  return { href: `/contact?service=${encodeURIComponent(title)}`, cta: "Let’s discuss" };
}

function bandsFor(groupId: (typeof serviceGroups)[number]["id"], eyebrow: string, start: number): ServiceBand[] {
  const group = serviceGroups.find((item) => item.id === groupId);
  if (!group) return [];
  return group.items.map((title, index) => ({
    eyebrow,
    title,
    text: itemCopy[title],
    image: crop(start + index),
    ...discuss(title),
  }));
}

export const serviceReasons = [
  ["End-to-End Expertise", "Strategy, technology, and people. Connected from the first conversation to the final delivery."],
  ["Proven Results", "Clear goals and thoughtful execution, with outcomes you can see in the work."],
  ["Tailored Approach", "Your challenges are unique. Your solution should be too."],
  ["Long-Term Partnership", "A team that stays curious, takes ownership, and grows alongside you."],
] as const;

const overview: ServicePageContent = {
  id: "overview",
  badge: "Our Goal",
  headline: "Services That Run Your Entire Business to Peak",
  intro: "From the first brief to the people who deliver it, every service is built to work with the others. Strategy, technology, and talent, connected around the way your business actually runs.",
  collage: [crop(0), art(automationArt), art(marketingArt)],
  bands: [
    {
      eyebrow: "Services",
      title: "Process Automation",
      text: "Give your team their time back. We connect your systems and simplify the everyday, so you can focus on the work that needs a person.",
      href: "/services?category=automation",
      cta: "View service",
      image: art(automationArt),
    },
    {
      eyebrow: "Services",
      title: "Digital Marketing",
      text: "Be seen by the right people. From the first impression to the next conversion, we turn attention into growth you can measure.",
      href: "/services?category=marketing",
      cta: "View service",
      image: art(marketingArt),
    },
    {
      eyebrow: "Services",
      title: "Onshore & Offshore Staffing",
      text: "Great work starts with great people. Build a capable, connected team with specialist talent, wherever your business needs it.",
      href: "/services?category=staffing",
      cta: "View service",
      image: crop(2),
    },
    {
      eyebrow: "Services",
      title: "IT Solutions",
      text: "Thoughtfully designed websites, connected business systems, and IT support built for what comes next.",
      href: "/services?category=technology",
      cta: "View service",
      image: crop(5),
    },
  ],
  advantageKicker: "The Clyra Advantage",
  advantageTitle: "The Connected Advantage Only We Deliver in the Market",
  advantageHref: "/contact",
  advantageImage: crop(4),
  whyTitle: "Services That Drive Your Business Goals Forward",
  whyText: "Different expertise. One team. Every part of the work stays pointed at the outcome you hired us for.",
};

const pages: Record<string, ServicePageContent> = {
  automation: {
    id: "automation",
    badge: "Process Automation",
    headline: "Services That Run Your Operations to Peak",
    intro: "Give your team their time back. We connect your systems and simplify the everyday, so the work that repeats no longer depends on someone remembering it.",
    heroImage: "/assets/e6a13f776fd8c4dbf29e5f47b96633f8.jpg",
    collage: [art(automationArt), crop(1), crop(6)],
    bands: bandsFor("automation", "Process Automation", 1),
    advantageKicker: "Process Automation",
    advantageTitle: "The Automation Advantage Only We Deliver in the Market",
    advantageHref: "/contact?service=Process%20Automation",
    advantageImage: crop(3),
    whyTitle: "Automation That Drives Your Business Goals Forward",
    whyText: "Less repetitive work. More room for the decisions, relationships, and ideas that still need your team.",
  },
  marketing: {
    id: "marketing",
    badge: "Digital Marketing",
    headline: "Services That Put Your Brand in Front of the Right People",
    intro: "Be seen by the right people. From the first impression to the next conversion, we turn your brand’s potential into meaningful growth.",
    collage: [art(marketingArt), crop(2), crop(7)],
    bands: bandsFor("marketing", "Digital Marketing", 0),
    advantageKicker: "Digital Marketing",
    advantageTitle: "The Marketing Advantage Only We Deliver in the Market",
    advantageHref: "/contact?service=Digital%20Marketing",
    advantageImage: crop(8),
    whyTitle: "Marketing That Drives Your Business Goals Forward",
    whyText: "Attention is only useful when it reaches the right people and gives them a clear next step.",
  },
  staffing: {
    id: "staffing",
    badge: "Onshore & Offshore Staffing",
    headline: "Services That Put the Right People Where the Work Is",
    intro: "Great work starts with great people. Build a capable, connected team with specialist talent, wherever your business needs it.",
    collage: [crop(2), crop(8), crop(0)],
    bands: [
      ...bandsFor("offshore", "Offshore Staffing", 2),
      ...bandsFor("onshore", "Onshore Staffing", 7),
    ],
    advantageKicker: "Staffing",
    advantageTitle: "The Staffing Advantage Only We Deliver in the Market",
    advantageHref: "/contact?service=Onshore%20%26%20Offshore%20Staffing",
    advantageImage: crop(6),
    whyTitle: "People Who Drive Your Business Goals Forward",
    whyText: "Specialist support that feels like part of your team, on site or alongside it.",
  },
  technology: {
    id: "technology",
    badge: "IT Solutions",
    headline: "Services That Make Technology Work for the Business",
    intro: "Technology that works for you. Thoughtfully designed websites, connected business systems, and IT solutions built for what comes next.",
    collage: [crop(5), crop(9), crop(1)],
    bands: bandsFor("technology", "IT Solutions", 3),
    advantageKicker: "IT Solutions",
    advantageTitle: "The Technology Advantage Only We Deliver in the Market",
    advantageHref: "/contact?service=IT%20Solutions",
    advantageImage: crop(0),
    whyTitle: "Technology That Drives Your Business Goals Forward",
    whyText: "Connected systems, better experiences, and a team that stays with the work after the launch.",
  },
};

export function servicePageFor(category: string | null): ServicePageContent {
  if (!category) return overview;
  if (category === "offshore" || category === "onshore" || category === "staffing") return pages["staffing"] ?? overview;
  return pages[category] ?? overview;
}
