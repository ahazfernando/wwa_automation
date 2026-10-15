import { describe, expect, it } from 'vitest';
import { serviceObjects } from '../lib/service-objects';
import { sculptureStages } from '../lib/service-sculptures';

describe('recognizable service objects', () => {
  it('shows a MacBook-style laptop beside IT', () => {
    expect(sculptureStages[5]).toBe('technology');
    expect(serviceObjects.technology.object).toBe('macbook');
  });
  it('shows an n8n-inspired workflow beside automation', () => expect(serviceObjects.automation.object).toBe('n8n-workflow'));
  it('shows a megaphone beside marketing', () => expect(serviceObjects.marketing.object).toBe('megaphone'));
  it('shows natural people rather than voxel characters beside staffing', () => expect(serviceObjects.staffing.object).toBe('natural-people'));
});