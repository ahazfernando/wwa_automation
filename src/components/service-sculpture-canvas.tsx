"use client";

import { Component, Suspense, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { createSculptureTargets, createSculptureIndices, sculptureKinds, sculptureStages, type SculptureKind } from '@/lib/service-sculptures';
import { serviceObjects, staffingWomanUrl } from '@/lib/service-objects';
import { ServiceObject } from './service-object';
import { MacBookObject, WorkflowObject } from './workflow-and-laptop';

export interface SculpturePalette { jade: string; silver: string; copper: string; light: string; shadow: string; }

class ModelBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static override getDerivedStateFromError() { return { failed: true }; }
  override render() { return this.state.failed ? null : this.props.children; }
}
const descriptions: Record<SculptureKind, string> = { strategy: 'Polished interwoven strategy ribbons', ...Object.fromEntries(Object.entries(serviceObjects).map(([key, value]) => [key, value.description])) } as Record<SculptureKind, string>;
function Sculpture({ palette, host }: { palette: SculpturePalette; host: HTMLElement }) {
  const layers = useRef<Partial<Record<SculptureKind, THREE.Group>>>({});
  const group = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const time = useRef(0); const stageRef = useRef(-1);
  const reduced = useRef(false); const pointer = useRef({ x: 0, y: 0 });
  const geometry = useMemo(() => {
    const targets = createSculptureTargets();
    const indices = createSculptureIndices();
    const base = new THREE.BufferGeometry();
    base.setIndex(new THREE.BufferAttribute(indices, 1));
    base.setAttribute('position', new THREE.BufferAttribute(targets.strategy, 3));
    base.computeVertexNormals();
    return base;
  }, []);
  const colors = useMemo(() => ({ strategy: new THREE.Color(palette.jade), automation: new THREE.Color(palette.silver), marketing: new THREE.Color(palette.copper), staffing: new THREE.Color(palette.jade), technology: new THREE.Color(palette.silver) }), [palette]);
  const desiredScale = useMemo(() => new THREE.Vector3(), []);
  const sections = useRef<HTMLElement[]>([]);
  useEffect(() => {
    sections.current = Array.from(document.querySelectorAll<HTMLElement>('[data-orb-stage]'));
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => { reduced.current = media.matches; }; preference(); media.addEventListener('change', preference);
    const move = (e: PointerEvent) => { pointer.current = { x: e.clientX / window.innerWidth - .5, y: e.clientY / window.innerHeight - .5 }; };
    window.addEventListener('pointermove', move);
    return () => { media.removeEventListener('change', preference); window.removeEventListener('pointermove', move); geometry.dispose(); };
  }, [geometry]);

  useFrame((_, rawDelta) => {
    const assembly = group.current;
    if (!assembly) return;
    const dt = Math.min(rawDelta, .05); const damping = reduced.current ? 1 : 1 - Math.exp(-3.8 * dt);
    if (!reduced.current) time.current += dt;
    let stage = 0; let section = sections.current[0];
    for (const candidate of sections.current) if (candidate.getBoundingClientRect().top < window.innerHeight * .52) { stage = Number(candidate.dataset['orbStage'] ?? 0); section = candidate; }
    const kind = sculptureStages[stage] ?? 'strategy';
    if (stageRef.current !== stage) {
      stageRef.current = stage; host.dataset['sculpture'] = kind; host.dataset['stage'] = String(stage);
      host.dataset['object'] = kind === 'strategy' ? 'brand-sculpture' : serviceObjects[kind].object;
      host.setAttribute('aria-label', descriptions[kind]);
    }
    sculptureKinds.forEach(target => {
      const layer = layers.current[target];
      if (!layer) return;
      const active = target === kind && stage !== 1;
      const progress = layer.scale.x + ((active ? 1 : 0) - layer.scale.x) * damping;
      layer.scale.setScalar(progress);
      layer.visible = progress > .08;
      layer.position.z = (1 - progress) * -.8;
      layer.rotation.y = (1 - progress) * .8;
    });
    const bounds = section?.querySelector<HTMLElement>('.service-copy, .hero-copy')?.getBoundingClientRect();
    const mobile = size.width <= 760;
    const hostTop = host.getBoundingClientRect().top;
    let centerX = size.width * .74; let centerY = size.height * .46; let available = size.width * .42;
    let mobileHeight = 280;
    if (mobile) {
      centerX = size.width / 2; available = size.width * .8;
      const contentBottom = (bounds?.bottom ?? 340) - hostTop;
      mobileHeight = Math.max(100, Math.min(280, size.height - contentBottom - 48));
      centerY = contentBottom + 24 + mobileHeight / 2;
    } else if (stage >= 2 && bounds) {
      if (stage % 2 === 0) { available = Math.max(180, bounds.left - 56); centerX = available / 2 + 14; }
      else { available = Math.max(180, size.width - bounds.right - 56); centerX = bounds.right + available / 2 + 20; }
      centerY = Math.max(190, Math.min(size.height - 170, (bounds.top + bounds.bottom) / 2 - hostTop));
    } else if (bounds) { available = Math.max(160, size.width - bounds.right - 40); centerX = bounds.right + available / 2 + 10; }
    const scale = stage === 1 ? 0 : Math.min(available / size.width * viewport.width / 3.4, (mobile ? mobileHeight : 460) / size.height * viewport.height / 3.4);
    assembly.position.x += ((centerX / size.width - .5) * viewport.width - assembly.position.x) * damping;
    assembly.position.y += ((.5 - centerY / size.height) * viewport.height - assembly.position.y) * damping;
    desiredScale.setScalar(scale); assembly.scale.lerp(desiredScale, damping);
    const spin = reduced.current ? 0 : Math.sin(time.current * .22) * .16;
    const yRotation = (kind === 'technology' ? -.3 : kind === 'marketing' ? -.3 : kind === 'automation' ? -.12 : -.12) + spin + (reduced.current ? 0 : pointer.current.x * .22);
    assembly.rotation.x += ((kind === 'technology' ? .4 : .12) + (reduced.current ? 0 : pointer.current.y * .12) - assembly.rotation.x) * damping;
    assembly.rotation.y += (yRotation - assembly.rotation.y) * damping;
    assembly.rotation.z += ((kind === 'strategy' ? -.2 : kind === 'marketing' ? -.15 : 0) - assembly.rotation.z) * damping;
    assembly.visible = assembly.scale.x > .005;
    host.dataset['motionTime'] = time.current.toFixed(2);
  });
  return <group ref={group}>
    {sculptureKinds.map(kind => <group key={kind} scale={0} ref={node => { if (node) layers.current[kind] = node; else delete layers.current[kind]; }}>
      {kind === 'strategy' ? <mesh args={[geometry]} frustumCulled={false}><meshPhysicalMaterial color={palette.jade} metalness={.82} roughness={.23} clearcoat={1} envMapIntensity={1.4} side={THREE.DoubleSide} /></mesh> :
        <Suspense fallback={null}>
          {kind === 'technology' ? <MacBookObject palette={{ color: palette.silver, light: palette.light, shadow: palette.shadow, accent: palette.copper }} /> : kind === 'automation' ? <WorkflowObject palette={{ color: palette.jade, light: palette.light, shadow: palette.shadow, accent: palette.copper }} /> : kind === 'staffing' ? <group>
            <ModelBoundary><group position={[-.8, -.07, -.25]} scale={.8} rotation-y={.16}><ServiceObject natural url={staffingWomanUrl} color={palette.silver} light={palette.light} shadow={palette.shadow} /></group></ModelBoundary>
            <ModelBoundary><group position={[.65, .03, .15]} scale={.88} rotation-y={-.12}><ServiceObject natural url={serviceObjects.staffing.url} color={palette.jade} light={palette.light} shadow={palette.shadow} /></group></ModelBoundary>
          </group> : <ModelBoundary><ServiceObject url={serviceObjects[kind].url} color={colors[kind].getStyle()} light={palette.light} shadow={palette.shadow} /></ModelBoundary>}
        </Suspense>}
    </group>)}
  </group>;
}
export default function ServiceSculptureCanvas({ palette, host }: { palette: SculpturePalette; host: HTMLElement }) {
  return <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}><hemisphereLight args={[palette.light, palette.shadow, 1.5]} /><directionalLight position={[2, 5, 5]} intensity={2.5} color={palette.light} /><Environment resolution={128}><Lightformer intensity={4} position={[0, 4, 3]} scale={[8, 3, 1]} color={palette.light} /><Lightformer intensity={3} position={[-4, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 1, 1]} color={palette.light} /><Lightformer intensity={2} position={[4, -2, 2]} rotation-y={-Math.PI / 3} scale={[4, 2, 1]} color={palette.copper} /><Lightformer intensity={1} position={[0, -4, 1]} scale={[8, 1, 1]} color={palette.jade} /></Environment><Sculpture palette={palette} host={host} /></Canvas>;
}
