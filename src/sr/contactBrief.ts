import { services } from './companyData';

export type ProjectBrief = { name: string; email: string; service: string; project: string; timing: string };

export function createProjectBrief(brief: ProjectBrief, recipient: string) {
  const service = services.find(item => item.id === brief.service)?.title ?? 'Help defining the project';
  const body = `Hello Serendepify,\n\nI’d like to discuss ${service.toLowerCase()}.\n\nProject:\n${brief.project.trim()}\n\nTiming: ${brief.timing.trim() || 'Open to discussion'}\n\n${brief.name.trim()}\n${brief.email.trim()}`;
  return { body, href: `mailto:${recipient}?subject=${encodeURIComponent(`Project inquiry — ${service}`)}&body=${encodeURIComponent(body)}` };
}
