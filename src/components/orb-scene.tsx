"use client";

import { Component, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import type { SculpturePalette } from './service-sculpture-canvas';

type SceneProps = { palette: SculpturePalette; host: HTMLElement };

class SceneBoundary extends Component<{ children: ReactNode; host: HTMLElement }, { failed: boolean }> {
  state = { failed: false };
  static override getDerivedStateFromError() { return { failed: true }; }
  override componentDidCatch() { this.props.host.dataset['unavailable'] = 'true'; }
  override render() { return this.state.failed ? null : this.props.children; }
}
export default function OrbScene() {
  const host = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<{ Component: ComponentType<SceneProps>; palette: SculpturePalette; host: HTMLElement } | null>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    const style = getComputedStyle(element);
    const swatch = document.createElement('canvas'); swatch.width=1; swatch.height=1;
    const context=swatch.getContext('2d');
    const token = (name: string) => {
      const value=style.getPropertyValue(name).trim();
      if(!context) return value;
      context.clearRect(0,0,1,1);context.fillStyle=value;context.fillRect(0,0,1,1);
      const data=context.getImageData(0,0,1,1).data;
      return `rgb(${data[0] ?? 0},${data[1] ?? 0},${data[2] ?? 0})`;
    };
    const palette = { jade:token('--sculpture-jade'),silver:token('--sculpture-silver'),copper:token('--sculpture-copper'),light:token('--sculpture-light'),shadow:token('--sculpture-shadow') };
    void import('./service-sculpture-canvas').then(module => {
      if (!cancelled) setScene({ Component:module.default,palette,host:element });
    }).catch(() => { element.dataset['unavailable']='true'; });
    return () => { cancelled=true; };
  },[]);
  return <div ref={host} className="orb-canvas" role="img" aria-label="Service-related 3D objects that transition as you scroll">{scene && <SceneBoundary host={scene.host}><scene.Component palette={scene.palette} host={scene.host} /></SceneBoundary>}</div>;
}
