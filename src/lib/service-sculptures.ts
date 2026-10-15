export type SculptureKind = 'strategy' | 'automation' | 'marketing' | 'staffing' | 'technology';
export const sculptureStages: Record<number, SculptureKind> = { 0: 'strategy', 1: 'strategy', 2: 'automation', 3: 'marketing', 4: 'staffing', 5: 'technology' };
export const sculptureKinds: SculptureKind[] = ['strategy', 'automation', 'marketing', 'staffing', 'technology'];
export const SCULPTURE_BANDS = 6;
export const SCULPTURE_SEGMENTS = 192;
export const SCULPTURE_SIDES = 12;
export const SCULPTURE_VERTICES = SCULPTURE_BANDS * (SCULPTURE_SEGMENTS + 1) * (SCULPTURE_SIDES + 1);
type Point = [number, number, number];
const TAU = Math.PI * 2;

// Each form has the same six continuous ribbon surfaces, so the GPU can
// transform their actual surfaces rather than dissolve them into particles.
function path(kind: SculptureKind, band: number, t: number): Point {
  const angle = band * TAU / SCULPTURE_BANDS;
  if (kind === 'strategy') {
    const phase = Math.floor(band / 2) * TAU / 3;
    const u = t + phase;
    const radius = 1.02 + .32 * Math.cos(3 * u);
    const offset = (band % 2 - .5) * .15;
    return [(radius + offset) * Math.cos(2 * u), (radius + offset) * Math.sin(2 * u), .5 * Math.sin(3 * u) + offset];
  }
  if (kind === 'automation') {
    // Closed interlocking flow loops, arranged as a cascading workflow.
    const column = band % 3; const row = Math.floor(band / 3);
    const x = (column - 1) * .8; const y = (row - .5) * 1.12;
    const r = .51;
    return [x + r * Math.cos(t), y + .67 * Math.sin(t), .28 * Math.sin(t * 2 + column) + (row - .5) * .22];
  }
  if (kind === 'marketing') {
    // An expanding, directional signal vortex — growth in three dimensions.
    const r = .38 + band * .18;
    return [r * Math.cos(t), r * Math.sin(t) + .18 * Math.sin(t * 2), (band - 2.5) * .15 + .32 * Math.cos(t + band * .25)];
  }
  if (kind === 'staffing') {
    // Six interwoven links united around a shared centre.
    const radial = .78 + .52 * Math.cos(t);
    const across = .39 * Math.sin(t);
    return [radial * Math.cos(angle) - across * Math.sin(angle), radial * Math.sin(angle) + across * Math.cos(angle), .36 * Math.sin(t)];
  }
  // Precision-engineered square circuits form an open spatial architecture.
  const c = Math.cos(t); const s = Math.sin(t);
  const x = Math.sign(c) * Math.pow(Math.abs(c), .27) * 1.02;
  const y = Math.sign(s) * Math.pow(Math.abs(s), .27) * 1.02;
  const depth = band % 2 === 0 ? -.64 : .64;
  if (band < 2) return [x, y, depth];
  if (band < 4) return [x, depth, y];
  return [depth, x, y];
}

export function createSculptureTargets(): Record<SculptureKind, Float32Array> {
  return Object.fromEntries(sculptureKinds.map(kind => {
    const values = new Float32Array(SCULPTURE_VERTICES * 3);
    let index = 0;
    for (let band = 0; band < SCULPTURE_BANDS; band++) {
      for (let step = 0; step <= SCULPTURE_SEGMENTS; step++) {
        const t = step / SCULPTURE_SEGMENTS * TAU;
        const p = path(kind, band, t);
        const before = path(kind, band, t - .002); const after = path(kind, band, t + .002);
        const dx = after[0] - before[0]; const dy = after[1] - before[1]; const dz = after[2] - before[2];
        const len = Math.hypot(dx, dy, dz) || 1;
        const tangent: Point = [dx / len, dy / len, dz / len];
        // Choose the normal to each circuit plane to avoid a collapsed frame
        // when a vertical tangent is aligned with the default reference axis.
        const reference: Point = kind === 'technology' && band >= 4 ? [1, 0, 0] : kind === 'technology' && band >= 2 ? [0, 1, 0] : [0, 0, 1];
        const cross: Point = [tangent[1] * reference[2] - tangent[2] * reference[1], tangent[2] * reference[0] - tangent[0] * reference[2], tangent[0] * reference[1] - tangent[1] * reference[0]];
        const nlen = Math.hypot(...cross) || 1;
        const normal: Point = [cross[0] / nlen, cross[1] / nlen, cross[2] / nlen];
        const binormal: Point = [-tangent[2] * normal[1], tangent[2] * normal[0], tangent[0] * normal[1] - tangent[1] * normal[0]];
        const twist = kind === 'strategy' ? t * 1.5 : kind === 'staffing' ? t : .2 * Math.sin(t);
        const width = kind === 'strategy' ? .085 : kind === 'technology' ? .075 : .11;
        for (let side = 0; side <= SCULPTURE_SIDES; side++) {
          const a = side / SCULPTURE_SIDES * TAU;
          const n = Math.cos(a) * width; const b = Math.sin(a) * .038;
          const u = n * Math.cos(twist) - b * Math.sin(twist);
          const v = n * Math.sin(twist) + b * Math.cos(twist);
          for (let axis = 0; axis < 3; axis++) values[index++] = (p[axis] ?? 0) + u * (normal[axis] ?? 0) + v * (binormal[axis] ?? 0);
        }
      }
    }
    return [kind, values];
  })) as Record<SculptureKind, Float32Array>;
}

export function createSculptureIndices(): Uint16Array {
  const indices: number[] = [];
  const stride = SCULPTURE_SIDES + 1;
  for (let band = 0; band < SCULPTURE_BANDS; band++) {
    const start = band * (SCULPTURE_SEGMENTS + 1) * stride;
    for (let step = 0; step < SCULPTURE_SEGMENTS; step++) for (let side = 0; side < SCULPTURE_SIDES; side++) {
      const a = start + step * stride + side; const b = a + stride;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  return new Uint16Array(indices);
}
