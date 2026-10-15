/** Frames extracted from public/homesection/3D_animation_of_tunnel_journey_20261014090309.mp4 (24fps, 240 frames). */

export const FRAME_COUNT = 240;
export const IDLE_FRAME_COUNT = 60;
export const PRELOAD_COUNT = 40;

export type TunnelAlign = "left" | "center" | "right";

export type TunnelStage = {
  id: string;
  from: number;
  to: number;
  align: TunnelAlign;
  still: number;
  holdStart?: boolean;
  holdEnd?: boolean;
  kicker?: string;
  badge?: string;
  progress?: string;
  lines: readonly string[];
  body: string;
  cta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export const tunnelStages: readonly TunnelStage[] = [
  {
    id: "hero",
    from: 1,
    to: 42,
    align: "left",
    still: 16,
    holdStart: true,
    badge: "We Will Australia",
    lines: ["Transforming Businesses", "Through Smart Executional Strategy"],
    body: "We help businesses turn bold ideas into measurable results through focused, well-executed strategy.",
    cta: { href: "/contact", label: "Let's talk" },
    secondaryCta: { href: "/services", label: "Explore services" },
  },
  {
    id: "intro",
    from: 42,
    to: 78,
    align: "center",
    still: 60,
    lines: [
      "We help ambitious companies turn ideas into action combining strategy, automation, and technology to deliver results that actually move the needle.",
    ],
    body: "",
  },
  {
    id: "automation",
    from: 78,
    to: 118,
    align: "right",
    still: 98,
    kicker: "01 / WHAT WE DO",
    progress: "Automation",
    lines: ["Process", "Automation"],
    body: "Give your team their time back. We connect your systems and simplify the everyday, so you can focus on the extraordinary.",
    cta: { href: "/services?category=automation", label: "How it can Help you" },
  },
  {
    id: "marketing",
    from: 118,
    to: 158,
    align: "left",
    still: 140,
    kicker: "02 / WHAT WE DO",
    progress: "Marketing",
    lines: ["Digital", "Marketing"],
    body: "Be seen by the right people. From your first impression to your next conversion, we turn your brand’s potential into meaningful growth.",
    cta: { href: "/services?category=marketing", label: "How it can Help you" },
  },
  {
    id: "staffing",
    from: 158,
    to: 198,
    align: "right",
    still: 172,
    kicker: "03 / WHAT WE DO",
    progress: "Staffing",
    lines: ["Onshore & Offshore", "Staffing"],
    body: "Great work starts with great people. Build a capable, connected team with specialist talent, wherever your business needs it.",
    cta: { href: "/services?category=offshore", label: "How it can Help you" },
  },
  {
    id: "software",
    from: 198,
    to: 240,
    align: "left",
    still: 228,
    holdEnd: true,
    kicker: "04 / WHAT WE DO",
    progress: "Software",
    lines: ["Software", "Development"],
    body: "Technology that works for you. Thoughtfully designed websites, connected business systems, and IT solutions built for what comes next.",
    cta: { href: "/services?category=technology", label: "How it can Help you" },
  },
];

export function framePath(index: number, mobile: boolean) {
  const frame = String(Math.min(FRAME_COUNT, Math.max(1, Math.round(index)))).padStart(4, "0");
  return `${mobile ? "/frames-mobile" : "/frames"}/f_${frame}.webp`;
}

export function frameFromProgress(progress: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  return 1 + clamped * (FRAME_COUNT - 1);
}

/** Scroll progress where a section is fully settled. The hero rests at the top of the page. */
export function sectionSnapProgress(index: number) {
  if (index <= 0) return 0;
  const stage = tunnelStages[index];
  if (!stage) return 1;
  return (stage.still - 1) / (FRAME_COUNT - 1);
}

/**
 * Where scroll should rest after a gesture inside the sequence.
 * A downward or upward move that passes the commit point finishes on the
 * next full section; a short move returns to the section already in view.
 * Returns null when the position should be left alone, including the runway
 * that lets the page leave the sequence.
 */
export function sectionSettleProgress(progress: number, direction: -1 | 0 | 1) {
  if (!Number.isFinite(progress) || progress < -0.02 || progress > 1.02) return null;

  const points = tunnelStages.map((_, index) => sectionSnapProgress(index));
  const last = points[points.length - 1] ?? 1;
  const clamped = Math.min(1, Math.max(0, progress));

  if (clamped >= last + 0.02) return direction < 0 ? last : null;

  let prevIndex = 0;
  for (let index = 0; index < points.length; index += 1) {
    if (points[index] <= clamped + 0.0001) prevIndex = index;
  }
  const nextIndex = Math.min(points.length - 1, prevIndex + 1);
  const prev = points[prevIndex] ?? 0;
  const next = points[nextIndex] ?? prev;
  if (nextIndex === prevIndex) return Math.abs(prev - clamped) < 0.012 ? null : prev;

  const span = next - prev;
  const traveled = span > 0 ? (clamped - prev) / span : 0;
  const commit = 0.34;
  let target = prev;
  if (direction > 0) target = traveled >= commit ? next : prev;
  else if (direction < 0) target = traveled <= 1 - commit ? prev : next;
  else target = traveled >= 0.5 ? next : prev;

  return Math.abs(target - clamped) < 0.012 ? null : target;
}

export function sectionIndexForFrame(frame: number) {
  let index = 0;
  for (let i = 0; i < tunnelStages.length; i += 1) {
    if (frame >= tunnelStages[i].from) index = i;
  }
  return index;
}

function smoothstep(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

export function stageMotion(frame: number, stage: TunnelStage) {
  const span = Math.max(1, stage.to - stage.from);
  const fade = Math.min(18, span * 0.4);
  const start = stage.holdStart ? stage.from : stage.from - fade;
  const end = stage.holdEnd ? stage.to : stage.to + fade;

  if (frame <= start || frame >= end) return { opacity: 0, shift: frame < start ? 16 : -10 };

  let opacity = 1;
  if (!stage.holdStart && frame < stage.from + fade) {
    opacity = Math.min(opacity, smoothstep((frame - start) / (fade * 2)));
  }
  if (!stage.holdEnd && frame > stage.to - fade) {
    opacity = Math.min(opacity, smoothstep((end - frame) / (fade * 2)));
  }

  if (opacity >= 1) return { opacity: 1, shift: 0 };
  const shift = frame < (stage.from + stage.to) / 2 ? 16 * (1 - opacity) : -10 * (1 - opacity);
  return { opacity, shift };
}

/** Intro statement grows from the center as the scroll sequence moves through it. */
export function statementScale(frame: number, stage: TunnelStage) {
  if (stage.id !== "intro") return 1;
  const span = Math.max(1, stage.to - stage.from);
  const progress = Math.min(1, Math.max(0, (frame - stage.from) / span));
  return 0.84 + 0.2 * smoothstep(Math.min(1, progress / 0.86));
}

export function idleFrame(now: number) {
  const duration = 3200;
  const cycle = (now % (duration * 2)) / duration;
  const ping = cycle <= 1 ? cycle : 2 - cycle;
  return 1 + ping * (IDLE_FRAME_COUNT - 1);
}
