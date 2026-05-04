import { useEffect, useState } from 'react';

import {
  fetchPackageProof,
  fetchRepoProof,
  formatCompactNumber,
  formatRelativeDate,
} from '@/lib/live-proof';
import { siteConfig } from '@/lib/site-config';

export type ProofCard = {
  name: string;
  eyebrow: string;
  headline: string;
  detail: string;
  href: string;
  cta: string;
};

const fallbackCards: ProofCard[] = [
  {
    name: 'Datafy MCP',
    eyebrow: 'NPM package',
    headline: 'Production-ready database gateway',
    detail: 'Live package metrics will appear here when the NPM API is available.',
    href: 'https://www.npmjs.com/package/@teckedd-code2save/datafy',
    cta: 'Open package',
  },
  {
    name: 'b2dp',
    eyebrow: 'NPM package',
    headline: 'Product builder CLI',
    detail: 'Fallback mode keeps the proof section useful even when external calls fail.',
    href: 'https://www.npmjs.com/package/@teckedd-code2save/b2dp',
    cta: 'View package',
  },
  {
    name: 'GitHub portfolio',
    eyebrow: 'GitHub signal',
    headline: `${siteConfig.githubOrg} repositories`,
    detail: 'Public repository signals can be pulled from GitHub and merged into the site without changing the visual structure.',
    href: `https://github.com/${siteConfig.githubOrg}`,
    cta: 'Visit GitHub',
  },
];

export function useLiveProof() {
  const [cards, setCards] = useState<ProofCard[]>(fallbackCards);
  const [status, setStatus] = useState<'fallback' | 'live'>('fallback');

  useEffect(() => {
    let active = true;

    async function load() {
      const [datafyPkg, b2dpPkg, agentExchangeRepo] = await Promise.allSettled([
        fetchPackageProof('@teckedd-code2save/datafy'),
        fetchPackageProof('@teckedd-code2save/b2dp'),
        fetchRepoProof(siteConfig.githubOrg, 'agent-exchange'),
      ]);

      if (!active) {
        return;
      }

      if (
        datafyPkg.status !== 'fulfilled' &&
        b2dpPkg.status !== 'fulfilled' &&
        agentExchangeRepo.status !== 'fulfilled'
      ) {
        setCards(fallbackCards);
        setStatus('fallback');
        return;
      }

      setCards([
        datafyPkg.status === 'fulfilled'
          ? {
              name: 'Datafy MCP',
              eyebrow: 'NPM package',
              headline: `${formatCompactNumber(datafyPkg.value.monthlyDownloads)} downloads last month`,
              detail: `Latest published version ${datafyPkg.value.latestVersion}. This gives buyers a real adoption signal instead of a generic trust claim.`,
              href: datafyPkg.value.url,
              cta: 'Open package',
            }
          : fallbackCards[0],
        b2dpPkg.status === 'fulfilled'
          ? {
              name: 'b2dp',
              eyebrow: 'NPM package',
              headline: `Version ${b2dpPkg.value.latestVersion} is live`,
              detail:
                b2dpPkg.value.monthlyDownloads !== null
                  ? `${formatCompactNumber(b2dpPkg.value.monthlyDownloads)} downloads last month, useful as a proof-of-interest signal for implementation work.`
                  : 'Live package metadata loaded successfully, even though download counts were unavailable.',
              href: b2dpPkg.value.url,
              cta: 'View package',
            }
          : fallbackCards[1],
        agentExchangeRepo.status === 'fulfilled'
          ? {
              name: 'Agent Exchange',
              eyebrow: 'GitHub repo',
              headline: `${formatCompactNumber(agentExchangeRepo.value.stars)} stars • ${formatCompactNumber(agentExchangeRepo.value.forks)} forks`,
              detail: `Updated ${formatRelativeDate(agentExchangeRepo.value.updatedAt)} with ${agentExchangeRepo.value.openIssues} open issues. GitHub becomes the proof layer when buyers want to inspect the work directly.`,
              href: agentExchangeRepo.value.url,
              cta: 'Visit repository',
            }
          : fallbackCards[2],
      ]);
      setStatus('live');
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  return { cards, status };
}
