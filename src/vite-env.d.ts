/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical origin, no trailing slash (e.g. https://takeabreaksets.com). */
  readonly VITE_SITE_URL?: string;
  /** Absolute image URL for default Open Graph / Twitter previews. */
  readonly VITE_DEFAULT_OG_IMAGE?: string;
}
