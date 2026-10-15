export const serviceGroups = [
  { id: 'automation', name: 'Process Automation', short: 'Automation', description: 'Less repetitive work. More room for what matters.', items: ['Workflow Automation', 'CRM & Sales Automation', 'Email & Communication Automation', 'AI & Chatbot Automation', 'Finance & Accounting Automation'] },
  { id: 'marketing', name: 'Digital Marketing', short: 'Marketing', description: 'Make meaningful connections. Turn attention into growth.', items: ['Search Engine Optimization (SEO)', 'Social Media Marketing (SMM)', 'Paid Advertising (PPC / Paid Media)', 'Content Marketing', 'Email Marketing & Automation', 'Creative Design & Video Marketing', 'Website Design & Conversion Optimization', 'Influencer & Affiliate Marketing', 'Analytics & Marketing Strategy', 'Local & Reputation Marketing'] },
  { id: 'technology', name: 'IT Solutions', short: 'Technology', description: 'Connected systems. Better experiences. Stronger businesses.', items: ['Managed IT Services (MSP)', 'Website & E-commerce Solutions', 'Cloud Solutions & Microsoft 365', 'Business Process & AI Automation', 'Agriculture & IoT Technology', 'Business Software & Systems Integration', 'IT Consulting, Training & Digital Transformation'] },
  { id: 'offshore', name: 'Offshore Staffing', short: 'Offshore staffing', description: 'Specialist support that feels like part of your team.', items: ['Lead Generation & Sales Administration', 'Data Entry, Reporting & Analysis', 'CAD, Drafting & Design Support', 'Medical & Allied Health Administration', 'Procurement & Supply Chain Administration'] },
  { id: 'onshore', name: 'Onshore Staffing', short: 'Onshore staffing', description: 'The right people, right where you need them.', items: ['Hospitality', 'Manufacturing', 'Engineering', 'Education', 'Automotive'] },
] as const;

export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title} | Clyra` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | Clyra` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}

export const advantages = [
  ['End-to-end expertise', 'Strategy, technology, and people. Connected from the first conversation to the final delivery.'],
  ['Built around outcomes', 'Clear goals and thoughtful execution keep every decision focused on your business.'],
  ['A tailored approach', 'Your challenges are unique. Your solution should be too.'],
  ['Long-term partnership', 'A team that stays curious, takes ownership, and grows alongside you.'],
];