export type RepoProof = {
  fullName: string;
  stars: number;
  forks: number;
  openIssues: number;
  updatedAt: string;
  url: string;
};

export type PackageProof = {
  name: string;
  latestVersion: string;
  monthlyDownloads: number | null;
  url: string;
};

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchRepoProof(
  owner: string,
  repo: string
): Promise<RepoProof> {
  const data = await getJson<{
    full_name: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    pushed_at: string;
    html_url: string;
  }>(`https://api.github.com/repos/${owner}/${repo}`);

  return {
    fullName: data.full_name,
    stars: data.stargazers_count,
    forks: data.forks_count,
    openIssues: data.open_issues_count,
    updatedAt: data.pushed_at,
    url: data.html_url,
  };
}

export async function fetchPackageProof(
  packageName: string
): Promise<PackageProof> {
  const encoded = encodeURIComponent(packageName);
  const [registryData, downloadData] = await Promise.allSettled([
    getJson<{ 'dist-tags': { latest?: string } }>(
      `https://registry.npmjs.org/${encoded}`
    ),
    getJson<{ downloads: number }>(
      `https://api.npmjs.org/downloads/point/last-month/${encoded}`
    ),
  ]);

  const latestVersion =
    registryData.status === 'fulfilled'
      ? registryData.value['dist-tags'].latest || 'latest'
      : 'latest';

  const monthlyDownloads =
    downloadData.status === 'fulfilled' ? downloadData.value.downloads : null;

  return {
    name: packageName,
    latestVersion,
    monthlyDownloads,
    url: `https://www.npmjs.com/package/${encoded}`,
  };
}

export function formatCompactNumber(value: number | null) {
  if (value === null) {
    return 'Unavailable';
  }

  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatRelativeDate(isoDate: string) {
  const diff = Date.now() - new Date(isoDate).getTime();
  const days = Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));

  if (days < 30) {
    return `${days}d ago`;
  }

  const months = Math.round(days / 30);
  return `${months}mo ago`;
}
