import automation from '@/assets/automation.asset.json';
import computer from '@/assets/computer.asset.json';
import marketing from '@/assets/marketing.asset.json';
import person from '@/assets/staffing-professional.asset.json';
import woman from '@/assets/staffing-woman.asset.json';
import type { SculptureKind } from './service-sculptures';

export const serviceObjects: Record<Exclude<SculptureKind, 'strategy'>, { url: string; object: string; description: string }> = {
  automation: { url: automation.url, object: 'n8n-workflow', description: 'An n8n-inspired workflow connecting a trigger, AI agent, CRM and email for process automation' },
  marketing: { url: marketing.url, object: 'megaphone', description: 'A megaphone for digital marketing' },
  staffing: { url: person.url, object: 'natural-people', description: 'Naturally proportioned adult professionals for onshore and offshore staffing' },
  technology: { url: computer.url, object: 'macbook', description: 'A slim aluminum MacBook-style laptop for technology and software' },
};
export const staffingWomanUrl = woman.url;