# Architecture

---

## Overview

Take A Break is a single-page application (SPA) built with React. It is entirely client-side — there is no custom backend, no API server, and no SSR. All dynamic data is fetched directly from Supabase using the public anon key and controlled by Row Level Security.

```
Browser
  └── React SPA (Vite bundle)
        ├── React Router (client-side routing)
        ├── Supabase JS client (data fetching)
        └── Tailwind CSS (styling)
              └── Supabase (Postgres + RLS)
```

---

## Frontend Structure

### Entry Points

- `index.html` — HTML shell, mounts `#root`
- `src/main.tsx` — Renders `<App />` into `#root`, wraps with `HelmetProvider`
- `src/App.tsx` — Root layout: providers, router, persistent layout components, route definitions

### Layout Components (always rendered)

| Component | Role |
|---|---|
| `Background3D` | Full-screen animated canvas behind all content |
| `VisualEffects` | Fixed CSS scanlines + film grain overlay (z-index 1) |
| `Navigation` | Fixed top navbar with mobile hamburger and language toggle |
| `Footer` | Bottom bar with branding and social link |
| `CookieConsent` | GDPR banner, appears after 1s if not yet dismissed |

All page content is rendered inside `<div className="relative z-10">` so it sits above the background layers.

### Pages

Each page is a standalone React component in `src/pages/`. Pages fetch their own data directly from Supabase using `useEffect` + `useState`.

| Page | Data source | Key behaviour |
|---|---|---|
| `Home` | `events` table (upcoming, limit 3) | Glitch hero animation, featured artists section (hardcoded), event preview cards |
| `Events` | `events` table (all) | Filter tabs (upcoming/past/all), event detail modal, calls `update_past_events()` RPC on mount |
| `Lineup` | `artists` table (all) | Artist grid, modal with full bio, social links, language-aware bio (en/it) |
| `About` | Static | Collective story, four values, partner logos |
| `Contact` | Static | Social media links, contact information |
| `JoinTeam` | Static | Role listings with criteria |
| `Terms` | Static | Live stream recording consent |
| `TermsAndConditions` | Static | Bilingual full T&Cs using translation keys |

### Components

| Component | Purpose |
|---|---|
| `ScrollReveal` | Wraps any child in an Intersection Observer animation. Props: `direction` (up/down/left/right), `delay` (ms). Used on almost every section. |
| `SEO` | Accepts `title`, `description`, `keywords`, `image`, `url`, `schema` props. Renders helmet tags + JSON-LD. Base URL is hardcoded as `https://takeabreak.events`. |

---

## Backend / API Structure

There is no custom backend. Data lives in Supabase Postgres.

The only "backend logic" is a PostgreSQL function:
- `update_past_events()` — marks events with a past date as `status = 'past'`. Called via `.rpc('update_past_events')` from the Events page on mount.
- A trigger `check_event_status_on_change` runs this logic automatically on `INSERT`/`UPDATE` to the events table.

---

## Auth Flow

There is no user authentication in this application. The site is fully public. The Supabase anon key is used for all requests, and RLS policies allow public `SELECT` on `events` and `artists` tables.

The `bookings` table also has a public `INSERT` policy (for form submissions), though the contact form UI is not yet built.

If you add an admin interface in the future, use Supabase Auth with email/password and create RLS policies gating `INSERT`/`UPDATE`/`DELETE` on `auth.uid()`.

---

## Database / Data Flow

### Tables

| Table | Used by | Notes |
|---|---|---|
| `events` | Home, Events pages | `status` field: `upcoming`, `past`, `sold_out` |
| `artists` | Lineup page | `featured` boolean controls hero display; `bio_it` for Italian bio |
| `merch` | Not yet used in frontend | Schema exists, no page built |
| `bookings` | Not yet used in frontend | Schema exists, no form built |

### Data Fetching Pattern

All pages follow the same pattern:

```typescript
const [data, setData] = useState<Type[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    const { data, error } = await supabase.from('table').select('*');
    if (!error && data) setData(data);
    setLoading(false);
  };
  fetchData();
}, []);
```

There is no caching layer, context-based data store, or query library (e.g. React Query). Each page fetches fresh on mount.

### Migrations

All schema changes must be applied as SQL files in `supabase/migrations/`. Filename format: `YYYYMMDDHHMMSS_description.sql`. Apply with `supabase db push` or via the Supabase Dashboard SQL editor.

---

## Third-Party Services

| Service | Used for | Required |
|---|---|---|
| Supabase | Postgres database, RLS | Yes |
| (No others) | — | — |

There are no payment integrations, analytics, email services, or external APIs at this time.

---

## State Management

There is no global state management library. State is local to each component (`useState`) with one exception:

**LanguageContext** (`src/contexts/LanguageContext.tsx`) — React Context that provides:
- `language`: `'en'` or `'it'`
- `setLanguage(lang)`: persists to `localStorage`
- `t(key)`: looks up a translation string from `src/lib/translations.ts`

Language defaults to Italian if the user's timezone is `Europe/Rome`, otherwise English. The toggle in the navbar calls `setLanguage`.

---

## Styling Approach

- **Tailwind CSS** for all layout, spacing, typography, and responsive design.
- **CSS custom properties** in `src/index.css` define the color palette:
  - `--bg-primary: #1a1a1a`
  - `--bg-secondary: #252525`
  - `--text-primary: #e8e8e8`
  - `--text-secondary: #a0a0a0`
  - `--accent-cyan: #00f0ff`
- **Utility classes** in `src/index.css`:
  - `.neon-glow` — cyan text shadow pulse
  - `.holographic` — gradient + backdrop blur surface
  - `.glitch` — CSS glitch animation (used on hero title)
  - `.scanlines` / `.grain` — visual texture overlays
- No CSS Modules, styled-components, or Emotion are used. Everything is Tailwind + global CSS.

---

## Important Utility / Helper Files

| File | Description |
|---|---|
| `src/lib/supabase.ts` | Supabase client singleton. Import `supabase` from here everywhere. |
| `src/lib/database.types.ts` | TypeScript types for all 4 tables. Keep in sync with schema. |
| `src/lib/translations.ts` | All UI strings in `en` and `it`. Add new strings here. |
| `src/contexts/LanguageContext.tsx` | `useLanguage()` hook — use this in any component that needs translated text or language switching. |
