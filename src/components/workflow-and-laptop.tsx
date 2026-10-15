import { useEffect, useMemo, useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ObjectPalette { color: string; light: string; shadow: string; accent: string }

function useDisplayTexture(palette: ObjectPalette, mode: 'desktop' | 'trigger' | 'ai' | 'crm' | 'email' | 'done') {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = mode === 'desktop' ? 1024 : 256; canvas.height = mode === 'desktop' ? 640 : 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const { light, shadow, color, accent } = palette;
      ctx.fillStyle = mode === 'desktop' ? shadow : light; ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (mode === 'desktop') {
        ctx.fillStyle = color; ctx.fillRect(0, 0, 180, 640);
        ctx.fillStyle = light; ctx.font = 'bold 24px sans-serif'; ctx.fillText('clyra', 30, 56);
        ctx.globalAlpha = .6;
        for (let i = 0; i < 6; i++) ctx.fillRect(30, 116 + i * 54, 110, 8);
        ctx.globalAlpha = 1; ctx.font = '24px sans-serif'; ctx.fillText('Workspace', 222, 65);
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = light; ctx.globalAlpha = .12; ctx.fillRect(220 + i * 258, 110, 226, 112); ctx.globalAlpha = 1;
          ctx.fillStyle = light; ctx.font = 'bold 32px sans-serif'; ctx.fillText(['98.4%', '24.8k', '+32%'][i] ?? '', 240 + i * 258, 167);
          ctx.font = '14px sans-serif'; ctx.fillText(['Uptime', 'Connections', 'Growth'][i] ?? '', 240 + i * 258, 200);
        }
        ctx.strokeStyle = color; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(235, 480);
        [435, 450, 362, 388, 305, 325, 260, 270, 238].forEach((y, i) => ctx.lineTo(250 + i * 84, y)); ctx.stroke();
        ctx.fillStyle = accent;
        for (let i = 0; i < 7; i++) ctx.fillRect(250 + i * 110, 560 - i * 13, 62, 28 + i * 13);
      } else {
        ctx.strokeStyle = mode === 'ai' ? accent : color; ctx.fillStyle = ctx.strokeStyle; ctx.lineWidth = 10;
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        if (mode === 'trigger') { ctx.beginPath(); ctx.moveTo(143, 32); ctx.lineTo(76, 134); ctx.lineTo(123, 134); ctx.lineTo(106, 207); ctx.lineTo(181, 105); ctx.lineTo(132, 105); ctx.closePath(); ctx.fill(); }
        if (mode === 'ai') {
          ctx.strokeRect(78, 65, 100, 100);
          for (let i = 0; i < 3; i++) { const p = 92 + i * 32; ctx.beginPath(); ctx.moveTo(p, 45); ctx.lineTo(p, 65); ctx.moveTo(p, 165); ctx.lineTo(p, 185); ctx.moveTo(58, p - 15); ctx.lineTo(78, p - 15); ctx.moveTo(178, p - 15); ctx.lineTo(198, p - 15); ctx.stroke(); }
          ctx.font = 'bold 40px sans-serif'; ctx.fillText('AI', 101, 132);
        }
        if (mode === 'crm') { for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(128, 70 + i * 40, 60, 23, 0, 0, Math.PI * 2); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(68, 70); ctx.lineTo(68, 150); ctx.moveTo(188, 70); ctx.lineTo(188, 150); ctx.stroke(); }
        if (mode === 'email') { ctx.strokeRect(57, 65, 142, 100); ctx.beginPath(); ctx.moveTo(57, 65); ctx.lineTo(128, 120); ctx.lineTo(199, 65); ctx.stroke(); }
        if (mode === 'done') { ctx.beginPath(); ctx.arc(128, 115, 66, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(91, 116); ctx.lineTo(119, 140); ctx.lineTo(168, 90); ctx.stroke(); }
        ctx.fillStyle = shadow; ctx.font = 'bold 19px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText({ trigger: 'TRIGGER', ai: 'AI AGENT', crm: 'CRM', email: 'EMAIL', done: 'SYNCED' }[mode], 128, 232);
      }
    }
    const result = new THREE.CanvasTexture(canvas); result.colorSpace = THREE.SRGBColorSpace; result.anisotropy = 4;
    return result;
  }, [palette.color, palette.light, palette.shadow, palette.accent, mode]);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

export function MacBookObject({ palette }: { palette: ObjectPalette }) {
  const screen = useDisplayTexture(palette, 'desktop');
  return <group position={[0, -.75, 0]}>
    <RoundedBox args={[3, .075, 2.04]} radius={.035} smoothness={4}><meshPhysicalMaterial color={palette.light} metalness={.92} roughness={.25} /></RoundedBox>
    <RoundedBox args={[2.75, .015, .86]} radius={.005} position={[0, .048, -.36]}><meshStandardMaterial color={palette.color} roughness={.65} /></RoundedBox>
    {Array.from({ length: 5 }, (_, row) => Array.from({ length: 14 }, (_, col) => <group key={`${row}-${col}`} position={[-1.23 + col * .189, .074, -.69 + row * .155]}><RoundedBox args={[.157, .025, .12]} radius={.008}><meshStandardMaterial color={palette.shadow} roughness={.6} /></RoundedBox><mesh position={[0, .014, 0]} rotation-x={-Math.PI / 2}><planeGeometry args={[.025, .013]} /><meshBasicMaterial color={palette.light} /></mesh></group>))}
    <RoundedBox args={[.86, .008, .45]} radius={.04} position={[0, .047, .49]}><meshStandardMaterial color={palette.color} metalness={.8} roughness={.3} /></RoundedBox>
    <mesh position={[0, .055, -.98]} rotation-z={Math.PI / 2}><cylinderGeometry args={[.043, .043, 2.7, 24]} /><meshStandardMaterial color={palette.color} metalness={.85} roughness={.24} /></mesh>
    <group position={[0, .06, -.97]} rotation-x={-.23}>
      <RoundedBox args={[3, 1.91, .055]} position={[0, .95, 0]} radius={.055} smoothness={4}><meshPhysicalMaterial color={palette.light} metalness={.9} roughness={.23} /></RoundedBox>
      <RoundedBox args={[2.88, 1.78, .015]} position={[0, .95, .035]} radius={.035}><meshStandardMaterial color={palette.shadow} /></RoundedBox>
      <mesh position={[0, .955, .046]}><planeGeometry args={[2.74, 1.64]} /><meshBasicMaterial map={screen} /></mesh>
      <RoundedBox args={[.3, .065, .018]} radius={.015} position={[0, 1.76, .05]}><meshStandardMaterial color={palette.shadow} /></RoundedBox>
      <mesh position={[0, 1.758, .065]}><circleGeometry args={[.012, 16]} /><meshBasicMaterial color={palette.color} /></mesh>
    </group>
  </group>;
}

const workflowNodes = [
  { mode: 'trigger', x: -1.36, y: 0 }, { mode: 'ai', x: -.3, y: 0 },
  { mode: 'crm', x: .83, y: .68 }, { mode: 'email', x: .83, y: -.68 }, { mode: 'done', x: 1.85, y: 0 },
] as const;
const edges = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4]] as const;
function WorkflowNode({ mode, x, y, palette }: typeof workflowNodes[number] & { palette: ObjectPalette }) {
  const texture = useDisplayTexture(palette, mode);
  return <group position={[x, y, 0]}>
    <RoundedBox args={[.65, .69, .15]} radius={.075} smoothness={4}><meshPhysicalMaterial color={mode === 'ai' ? palette.accent : palette.color} metalness={.35} roughness={.3} clearcoat={1} /></RoundedBox>
    <mesh position={[0, 0, .081]}><planeGeometry args={[.57, .61]} /><meshBasicMaterial map={texture} /></mesh>
    {[-1, 1].map(side => <mesh key={side} position={[side * .34, 0, 0]}><sphereGeometry args={[.043, 20, 16]} /><meshStandardMaterial color={palette.accent} metalness={.6} roughness={.25} /></mesh>)}
  </group>;
}
function WorkflowConnection({ from, to, palette, index }: { from: typeof workflowNodes[number]; to: typeof workflowNodes[number]; palette: ObjectPalette; index: number }) {
  const pulse = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.CubicBezierCurve3(new THREE.Vector3(from.x + .34, from.y, 0), new THREE.Vector3(from.x + .65, from.y, 0), new THREE.Vector3(to.x - .65, to.y, 0), new THREE.Vector3(to.x - .34, to.y, 0)), [from, to]);
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 40, .023, 8, false), [curve]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame(({ clock }) => { if (pulse.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) pulse.current.position.copy(curve.getPoint((clock.elapsedTime * .28 + index * .19) % 1)); });
  return <><mesh geometry={geometry}><meshStandardMaterial color={palette.color} metalness={.55} roughness={.3} /></mesh><mesh ref={pulse} position={curve.getPoint(.5)}><sphereGeometry args={[.047, 16, 12]} /><meshBasicMaterial color={palette.accent} /></mesh></>;
}
export function WorkflowObject({ palette }: { palette: ObjectPalette }) {
  return <group position={[-.22, 0, 0]} scale={.88}>
    {edges.map(([a, b], index) => <WorkflowConnection key={`${a}-${b}`} from={workflowNodes[a]} to={workflowNodes[b]} palette={palette} index={index} />)}
    {workflowNodes.map(node => <WorkflowNode key={node.mode} {...node} palette={palette} />)}
  </group>;
}