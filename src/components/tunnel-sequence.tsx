"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  FRAME_COUNT,
  frameFromProgress,
  framePath,
  idleFrame,
  sectionSettleProgress,
  sectionSnapProgress,
  stageMotion,
  statementScale,
  tunnelStages,
  type TunnelStage,
} from "@/lib/tunnel-frames";

const serviceStages = tunnelStages.filter((stage) => stage.progress);

function StageCopy({ stage, heading }: { stage: TunnelStage; heading: "h1" | "h2" }) {
  const Title = heading;
  const statement = stage.id === "intro";
  const hero = stage.id === "hero";
  return (
    <div className={`tunnel-copy is-${stage.align}${statement ? " is-statement" : ""}${hero ? " is-hero" : ""}`}>
      {hero && stage.badge ? <span className="hero-badge">{stage.badge}</span> : null}
      {stage.kicker && <span className="tunnel-kicker">{stage.kicker}</span>}
      <Title className="tunnel-title">
        {statement
          ? stage.lines.join(" ")
          : stage.lines.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
      </Title>
      {stage.body ? <p>{stage.body}</p> : null}
      {hero ? (
        <div className="hero-actions">
          {stage.cta && (
            <Link className="tunnel-btn" href={stage.cta.href}>
              {stage.cta.label} <ArrowUpRight size={16} />
            </Link>
          )}
          {stage.secondaryCta && (
            <Link className="tunnel-btn is-secondary" href={stage.secondaryCta.href}>
              {stage.secondaryCta.label} <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
      ) : (
        stage.cta && (
          <Link className="tunnel-btn" href={stage.cta.href}>
            {stage.cta.label} <ArrowUpRight size={16} />
          </Link>
        )
      )}
    </div>
  );
}

function drawCover(
  context: CanvasRenderingContext2D,
  source: CanvasImageSource,
  width: number,
  height: number,
  sourceWidth: number,
  sourceHeight: number,
) {
  const scale = Math.max(width / sourceWidth, height / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  context.drawImage(source, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}

export default function TunnelSequence() {
  const wrapperRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const railRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const cueRef = useRef<HTMLDivElement>(null);
  const goToSectionRef = useRef<(index: number) => void>(() => {});
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const viewport = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      setReduced(motion.matches);
      setMobile(viewport.matches);
    };
    apply();
    motion.addEventListener("change", apply);
    viewport.addEventListener("change", apply);
    return () => {
      motion.removeEventListener("change", apply);
      viewport.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    return scrollYProgress.on("change", (value) => {
      progressRef.current = value;
    });
  }, [scrollYProgress]);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !sticky) return;

    const bitmaps: Array<ImageBitmap | undefined> = new Array(FRAME_COUNT + 1);
    let displayed = 1;
    let paintedKey = "";
    let lastTick = performance.now();
    let raf = 0;
    let cancelled = false;
    const context = canvas.getContext("2d", { alpha: false, desynchronized: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(canvas.clientWidth * dpr);
      const height = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        paintedKey = "";
      }
    };

    const paintFrames = (from: ImageBitmap, to: ImageBitmap | undefined, mix: number) => {
      if (!context) return;
      resize();
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "medium";
      context.globalAlpha = 1;
      if (!to || mix <= 0.012) {
        drawCover(context, from, canvas.width, canvas.height, from.width, from.height);
        return;
      }
      if (mix >= 0.988) {
        drawCover(context, to, canvas.width, canvas.height, to.width, to.height);
        return;
      }
      drawCover(context, from, canvas.width, canvas.height, from.width, from.height);
      context.globalAlpha = mix;
      drawCover(context, to, canvas.width, canvas.height, to.width, to.height);
      context.globalAlpha = 1;
    };

    const syncOverlay = (frame: number, scrolled: number) => {
      for (let index = 0; index < tunnelStages.length; index += 1) {
        const node = stageRefs.current[index];
        const stage = tunnelStages[index];
        if (!node || !stage) continue;
        const motion = stageMotion(frame, stage);
        const opacity = motion.opacity.toFixed(3);
        const scale = statementScale(frame, stage);
        const transform = `translate3d(0, ${motion.shift.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
        if (node.style.opacity !== opacity) node.style.opacity = opacity;
        if (node.style.transform !== transform) node.style.transform = transform;
        const events = motion.opacity > 0.45 ? "auto" : "none";
        if (node.style.pointerEvents !== events) node.style.pointerEvents = events;
      }
      serviceStages.forEach((stage, index) => {
        const button = railRefs.current[index];
        if (!button) return;
        const end = index === serviceStages.length - 1 ? stage.to + 1 : stage.to;
        const active = frame >= stage.from && frame < end;
        button.classList.toggle("is-active", active);
        if (active) button.setAttribute("aria-current", "true");
        else button.removeAttribute("aria-current");
      });
      if (cueRef.current) {
        const cue = Math.max(0, Math.min(1, (0.05 - scrolled) / 0.035)).toFixed(3);
        if (cueRef.current.style.opacity !== cue) cueRef.current.style.opacity = cue;
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(34, now - lastTick);
      lastTick = now;
      const scrolled = progressRef.current;
      const target = scrolled < 0.004 ? idleFrame(now) : frameFromProgress(scrolled);
      const delta = target - displayed;
      if (Math.abs(delta) < 0.012) displayed = target;
      else displayed += delta * (1 - Math.exp(-dt / 80));
      const lower = Math.min(FRAME_COUNT, Math.max(1, Math.floor(displayed)));
      const upper = Math.min(FRAME_COUNT, Math.max(lower, Math.ceil(displayed)));
      const mix = upper === lower ? 0 : displayed - lower;
      const from = bitmaps[lower];
      const to = bitmaps[upper];
      const quant = mix <= 0.012 ? 0 : mix >= 0.988 ? 1 : Math.round(mix * 16) / 16;
      const key = `${quant >= 0.988 ? upper : lower}:${quant}`;
      if (from && key !== paintedKey) {
        if (quant === 0 || !to) paintFrames(from, undefined, 0);
        else if (quant === 1) paintFrames(to, undefined, 0);
        else paintFrames(from, to, quant);
        paintedKey = key;
      }
      syncOverlay(displayed, scrolled);
      raf = requestAnimationFrame(loop);
    };

    const decodeFrame = async (index: number) => {
      if (bitmaps[index]) return;
      const response = await fetch(framePath(index, mobile));
      if (!response.ok) throw new Error(`Frame ${index} failed`);
      const bitmap = await createImageBitmap(await response.blob());
      if (cancelled) {
        bitmap.close();
        return;
      }
      bitmaps[index] = bitmap;
    };

    setReady(false);
    setLoaded(0);

    let booted = false;
    let running = false;
    const start = () => {
      if (!booted || running) return;
      running = true;
      lastTick = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) start();
      else stop();
    });
    observer.observe(sticky);

    const boot = async () => {
      let nextIndex = 1;
      let finished = 0;
      const worker = async () => {
        while (!cancelled && nextIndex <= FRAME_COUNT) {
          const index = nextIndex;
          nextIndex += 1;
          try {
            await decodeFrame(index);
          } catch {
            continue;
          }
          finished += 1;
          if (finished === FRAME_COUNT || finished % 12 === 0) setLoaded(finished / FRAME_COUNT);
        }
      };
      await Promise.all(Array.from({ length: 8 }, () => worker()));
      if (cancelled) return;
      const first = bitmaps[1];
      if (first) {
        paintFrames(first, undefined, 0);
        paintedKey = "1:0";
      }
      booted = true;
      setLoaded(1);
      setReady(true);
      syncOverlay(1, 0);
      if (sticky.getBoundingClientRect().bottom > 0 && sticky.getBoundingClientRect().top < window.innerHeight) {
        start();
      }
    };

    void boot();
    return () => {
      cancelled = true;
      stop();
      observer.disconnect();
      for (const bitmap of bitmaps) bitmap?.close();
    };
  }, [mobile, reduced]);

  useEffect(() => {
    if (reduced) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const metrics = () => {
      const distance = Math.max(1, wrapper.offsetHeight - window.innerHeight);
      const top = window.scrollY + wrapper.getBoundingClientRect().top;
      const progress = (window.scrollY - top) / distance;
      const rect = wrapper.getBoundingClientRect();
      const engaged = rect.top <= 8 && rect.bottom >= window.innerHeight - 8;
      return { distance, top, progress, engaged };
    };

    let raf = 0;
    let animating = false;
    let glideY = window.scrollY;
    let direction: -1 | 0 | 1 = 0;
    let lastY = window.scrollY;
    let endTimer = 0;

    const animateTo = (progress: number) => {
      const { top, distance } = metrics();
      const targetY = top + progress * distance;
      const startY = window.scrollY;
      const delta = targetY - startY;
      if (Math.abs(delta) < 2) return;
      cancelAnimationFrame(raf);
      animating = true;
      const duration = Math.min(1500, 520 + Math.abs(delta) * 0.62);
      const start = performance.now();
      const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        glideY = t < 1 ? startY + delta * ease(t) : targetY;
        if (t < 1) {
          window.scrollTo(0, glideY);
          raf = requestAnimationFrame(step);
          return;
        }
        animating = false;
        window.scrollTo(0, targetY);
      };
      raf = requestAnimationFrame(step);
    };

    goToSectionRef.current = (index: number) => {
      const clamped = Math.min(tunnelStages.length - 1, Math.max(0, index));
      animateTo(sectionSnapProgress(clamped));
    };

    const settle = () => {
      if (animating) return;
      const { progress, engaged } = metrics();
      if (!engaged) return;
      const target = sectionSettleProgress(progress, direction);
      if (target == null) return;
      animateTo(target);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (animating) {
        if (Math.abs(y - glideY) <= 14) return;
        cancelAnimationFrame(raf);
        animating = false;
      }
      if (Math.abs(delta) > 0.5) direction = delta > 0 ? 1 : -1;
      window.clearTimeout(endTimer);
      endTimer = window.setTimeout(settle, 180);
    };

    const onScrollEnd = () => {
      if (animating) return;
      window.clearTimeout(endTimer);
      endTimer = window.setTimeout(settle, 60);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(endTimer);
      goToSectionRef.current = () => {};
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [reduced]);

  const scrollToStage = (stage: TunnelStage) => {
    const index = tunnelStages.findIndex((item) => item.id === stage.id);
    if (index >= 0) goToSectionRef.current(index);
  };

  if (reduced) {
    return (
      <div className="tunnel-static">
        {tunnelStages.map((stage) => (
          <section key={stage.id} className={`tunnel-static-stage is-${stage.align}${stage.id === "intro" ? " is-intro" : ""}`}>
            <img src={framePath(stage.still, mobile)} alt="" />
            <StageCopy stage={stage} heading={stage.id === "hero" ? "h1" : "h2"} />
          </section>
        ))}
      </div>
    );
  }

  return (
    <section className="tunnel-scroll" ref={wrapperRef} aria-label="Clyra services">
      <div className="tunnel-sticky" ref={stickyRef}>
        <img className="tunnel-poster" src={framePath(1, mobile)} alt="" />
        <canvas ref={canvasRef} aria-hidden="true" />
        {tunnelStages.map((stage, index) => (
          <div
            key={stage.id}
            ref={(node) => {
              stageRefs.current[index] = node;
            }}
            className={`tunnel-stage is-${stage.align}${stage.id === "intro" ? " is-intro" : ""}`}
          >
            <StageCopy stage={stage} heading={stage.id === "hero" ? "h1" : "h2"} />
          </div>
        ))}
        <nav className="tunnel-rail" aria-label="Services in this sequence">
          {serviceStages.map((stage, index) => (
            <button
              key={stage.id}
              ref={(node) => {
                railRefs.current[index] = node;
              }}
              type="button"
              onClick={() => scrollToStage(stage)}
            >
              <span />
              {stage.progress}
            </button>
          ))}
        </nav>
        <div className="tunnel-scroll-cue" ref={cueRef} aria-hidden="true">
          <ArrowDown size={16} />
          Scroll
        </div>
        {!ready && (
          <div className="tunnel-loader" role="status" aria-live="polite">
            <p>Loading the journey</p>
            <div className="tunnel-loader-track">
              <div className="tunnel-loader-bar" style={{ width: `${Math.round(loaded * 100)}%` }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
