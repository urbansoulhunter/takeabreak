# Dependencies

## Package Manager

**npm** — the project uses `package-lock.json`. Always use `npm install` (not `yarn` or `pnpm`) to keep the lockfile consistent.

---

## Node Version

**Node 20.19 or later is required.** Node 22 LTS is recommended. The project uses ES modules (`"type": "module"` in `package.json`) and requires a modern Node for Vite's dev server.

To check your version: `node -v`

---

## Runtime Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.3.1 | UI framework |
| `react-dom` | ^18.3.1 | React DOM renderer |
| `react-router-dom` | ^7.9.5 | Client-side routing |
| `@supabase/supabase-js` | ^2.81.1 | Supabase client for database queries |
| `react-helmet-async` | ^2.0.5 | Document head management for SEO (meta, OG, JSON-LD) |
| `lucide-react` | ^0.344.0 | Icon library (used throughout navigation and pages) |

---

## Development Dependencies

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^8.0.10 | Build tool and dev server |
| `@vitejs/plugin-react` | ^6.0.1 | Vite plugin for React JSX transform |
| `typescript` | ^5.5.3 | Type checking |
| `@types/react` | ^18.3.5 | React type definitions |
| `@types/react-dom` | ^18.3.0 | React DOM type definitions |
| `tailwindcss` | ^3.4.1 | Utility-first CSS framework |
| `postcss` | ^8.4.35 | CSS processing pipeline required by Tailwind |
| `autoprefixer` | ^10.4.18 | Adds vendor prefixes to CSS automatically |
| `eslint` | ^9.9.1 | Linter |
| `typescript-eslint` | ^8.3.0 | TypeScript-aware ESLint rules |
| `eslint-plugin-react-hooks` | ^5.1.0-rc.0 | Enforces React hooks rules |
| `eslint-plugin-react-refresh` | ^0.4.11 | Ensures HMR-compatible component exports |
| `globals` | ^15.9.0 | ESLint global variable sets |
| `@eslint/js` | ^9.9.1 | ESLint core JS ruleset |

---

## Bolt-Specific Packages

**None.** No packages in `package.json` are Bolt-specific. Everything here is standard open-source tooling that works identically in any local environment.

The only Bolt-specific files are `.bolt/config.json` and `.bolt/prompt`, which are metadata files with no effect on the build or runtime. They can be deleted after migration.

## Version Caveats

- **react-router-dom v7** is a major version with breaking changes from v6. The app uses the v7 API correctly. Do not downgrade to v6 without reviewing all `<Routes>` / `<Route>` usage.
- **eslint-plugin-react-hooks** is on an RC (`5.1.0-rc.0`). Consider pinning to a stable release if ESLint behavior is inconsistent.
- **lucide-react** is excluded from Vite's `optimizeDeps` in `vite.config.ts` — this is intentional and prevents a known issue with tree-shaking icon components in dev mode.

---

## Installing After Clone

```bash
npm install
```

Do not delete `package-lock.json`. It ensures reproducible installs across environments.
