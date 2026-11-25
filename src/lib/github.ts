export const REPO = "yannick2009/yily";

export interface Contributor {
  login: string;
  avatar: string;
  url: string;
}

// Snapshot used when the GitHub API is unreachable (at build time or in the browser).
export const FALLBACK_CONTRIBUTORS: Contributor[] = [
  {
    login: "yannick2009",
    avatar: "https://avatars.githubusercontent.com/u/69443278?v=4",
    url: "https://github.com/yannick2009",
  },
  {
    login: "Angislad20",
    avatar: "https://avatars.githubusercontent.com/u/116013303?v=4",
    url: "https://github.com/Angislad20",
  },
  {
    login: "yvnnix",
    avatar: "https://avatars.githubusercontent.com/u/181828602?v=4",
    url: "https://github.com/yvnnix",
  },
];

interface ContributorPayload {
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

const isContributorPayload = (entry: unknown): entry is ContributorPayload => {
  if (typeof entry !== "object" || entry === null) return false;
  const candidate = entry as Record<string, unknown>;
  return (
    candidate.type === "User" &&
    typeof candidate.login === "string" &&
    typeof candidate.avatar_url === "string" &&
    typeof candidate.html_url === "string"
  );
};

const avatarWithSize = (url: string) => {
  try {
    const avatar = new URL(url);
    avatar.searchParams.set("s", "176");
    return avatar.toString();
  } catch {
    return url;
  }
};

// GitHub orders contributors by contribution count, so the most active come first.
export const fetchContributors = async (signal?: AbortSignal): Promise<Contributor[]> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}/contributors?per_page=100`, {
      headers: { Accept: "application/vnd.github+json" },
      signal,
    });
    if (!response.ok) return [];
    const data: unknown = await response.json();
    if (!Array.isArray(data)) return [];
    return data.filter(isContributorPayload).map((entry) => ({
      login: entry.login,
      avatar: avatarWithSize(entry.avatar_url),
      url: entry.html_url,
    }));
  } catch {
    return [];
  }
};
