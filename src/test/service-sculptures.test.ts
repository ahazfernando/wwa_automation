import { describe, it, expect } from 'vitest';
import { createSculptureTargets, createSculptureIndices, sculptureStages, SCULPTURE_VERTICES, SCULPTURE_BANDS, SCULPTURE_SEGMENTS, SCULPTURE_SIDES } from '../lib/service-sculptures';
describe('service-specific home transformations',()=>{
  it('maps the automation section',()=>expect(sculptureStages[2]).toBe('automation'));
  it('maps the digital marketing section',()=>expect(sculptureStages[3]).toBe('marketing'));
  it('maps staffing to a connected network',()=>expect(sculptureStages[4]).toBe('staffing'));
  it('maps the technology section',()=>expect(sculptureStages[5]).toBe('technology'));
  it('produces distinct finite solid surfaces with matching vertex counts',()=>{
    const targets=createSculptureTargets();
    for(const target of Object.values(targets)) {expect(target.length).toBe(SCULPTURE_VERTICES*3);expect(Array.from(target).every(Number.isFinite)).toBe(true);}
    const values=Object.values(targets);
    for(let i=0;i<values.length;i++) for(let j=i+1;j<values.length;j++) expect(values[i]).not.toEqual(values[j]);
  });
  it('connects six continuous surfaces with valid triangle indices',()=>{
    const indices=createSculptureIndices();
    expect(indices.length).toBe(SCULPTURE_BANDS*SCULPTURE_SEGMENTS*SCULPTURE_SIDES*6);
    expect(Math.max(...indices)).toBeLessThan(SCULPTURE_VERTICES);
    expect(Math.min(...indices)).toBe(0);
  });
});