/** Canonical site origin for SEO, JSON-LD, and Open Graph (no trailing slash). */
const DEFAULT_SITE_URL = 'https://takeabreaksets.com';

/** Default share image (absolute URL). Override with VITE_DEFAULT_OG_IMAGE. */
const DEFAULT_OG_IMAGE = 'https://iili.io/BQBvybI.md.jpg';

export function getSiteUrl(): string {
  const raw = import.meta.env.VITE_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, '');
  return DEFAULT_SITE_URL;
}

/** Absolute URL for a path or already-absolute URL. */
export function absoluteSiteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const base = getSiteUrl();
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}

export function getDefaultOgImageUrl(): string {
  const raw = import.meta.env.VITE_DEFAULT_OG_IMAGE?.trim();
  if (raw) return raw;
  return DEFAULT_OG_IMAGE;
}
