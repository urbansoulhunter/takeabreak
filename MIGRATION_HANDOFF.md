# Migration Handoff — Take A Break

This document contains everything needed to move this project from Bolt to a local development environment managed in Cursor or any other editor.

---

## What the App Does

Take A Break is a bilingual (English/Italian) event website for a UK-based electronic music collective. It showcases upcoming and past events, the DJ/artist roster, team information, and contact details. The site is primarily read-only for visitors; all content is managed via the Supabase database directly.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 18.3.x |
| Language | TypeScript | 5.5.x |
| Build tool | Vite | 8.0.x |
| Routing | React Router DOM | 7.9.x |
| Styling | Tailwind CSS | 3.4.x |
| Icons | Lucide React | 0.344.x |
| SEO | react-helmet-async | 2.0.x |
| Database/Auth | Supabase | 2.81.x |
| CSS preprocessor | PostCSS + Autoprefixer | latest |

---

## Project Structure

```
project/
├── public/                    # Static assets (images, flyers, logos)
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Background3D.tsx   # Animated canvas background
│   │   ├── CookieConsent.tsx  # GDPR cookie banner
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx     # Fixed top navbar with mobile menu
│   │   ├── ScrollReveal.tsx   # Intersection Observer animation wrapper
│   │   ├── SEO.tsx            # Helmet-based meta/OG/JSON-LD
│   │   └── VisualEffects.tsx  # CSS scanlines + film grain overlay
│   ├── contexts/
│   │   └── LanguageContext.tsx  # Language state, timezone detection, localStorage
│   ├── lib/
│   │   ├── database.types.ts  # TypeScript types generated from Supabase schema
│   │   ├── supabase.ts        # Supabase client singleton
│   │   └── translations.ts    # All English + Italian UI strings
│   ├── pages/
│   │   ├── Home.tsx           # Hero, featured artists, upcoming events preview
│   │   ├── Events.tsx         # Full event list with filtering
│   │   ├── Lineup.tsx         # Artist grid with modal detail view
│   │   ├── About.tsx          # Collective story and values
│   │   ├── Contact.tsx        # Social links and contact info
│   │   ├── JoinTeam.tsx       # Open roles and application info
│   │   ├── Terms.tsx          # Live stream recording consent terms
│   │   └── TermsAndConditions.tsx  # Bilingual full T&Cs
│   ├── App.tsx                # Root component, router, layout
│   ├── index.css              # Global styles, CSS custom properties, animations
│   ├── main.tsx               # React DOM entry point
│   └── vite-env.d.ts          # Vite env type declarations
├── supabase/
│   └── migrations/            # All SQL migrations in order
├── .env                       # Local secrets (do not commit)
├── .env.example               # Safe placeholder template (safe to commit)
├── index.html                 # HTML entry point
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── postcss.config.js
├── eslint.config.js
├── package.json
└── package-lock.json
```

---

## Install Dependencies

Requires Node.js 20.19 or later (22 LTS recommended).

```bash
npm install
```

---

## Run Locally

1. Copy `.env.example` to `.env` and fill in your real Supabase credentials (see `ENVIRONMENT.md`).
2. Start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

---

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` directory. This is a fully static site — no server required.

---

## Preview Production Build

```bash
npm run preview
```

Serves `dist/` locally at `http://localhost:4173`.

---

## How Routing Works

Client-side routing is handled by React Router DOM v7 using `BrowserRouter`. All routes are defined in `src/App.tsx`.

| Path | Page |
|---|---|
| `/` | Home |
| `/events` | Events |
| `/lineup` | Lineup (DJ Roster) |
| `/about` | About |
| `/contact` | Contact |
| `/join-team` | Join the Team |
| `/terms` | Live Stream Terms |
| `/terms-and-conditions` | Full Terms & Conditions |

Because routing is client-side, the hosting platform must serve `index.html` for all paths. This is configured in:
- `public/_redirects` — for Netlify
- `netlify.toml` — additional Netlify config

For any other host, configure a catch-all rewrite to `index.html`.

---

## Where Things Live

| Concern | Location |
|---|---|
| Pages | `src/pages/` |
| Shared components | `src/components/` |
| All UI text (en + it) | `src/lib/translations.ts` |
| Language state | `src/contexts/LanguageContext.tsx` |
| Supabase client | `src/lib/supabase.ts` |
| DB TypeScript types | `src/lib/database.types.ts` |
| Global CSS / animations | `src/index.css` |
| Static images/logos/flyers | `public/` |
| Database migrations | `supabase/migrations/` |

---

## Bolt-Specific Assumptions to Replace

| Item | What to do outside Bolt |
|---|---|
| **Bolt dev server** | Run `npm run dev` in your terminal |
| **`.bolt/config.json` and `.bolt/prompt`** | These are Bolt metadata files. They have no effect outside Bolt and can be deleted or ignored. |
| **Environment variables in Bolt UI** | Copy values from your `.env` file into your hosting platform's environment variable settings (Netlify, Vercel, etc.) |
| **Supabase MCP tools** | Outside Bolt, use the Supabase Dashboard or the Supabase CLI (`supabase db push`) to apply migrations |
| **Auto-save / instant preview** | Not available — use `npm run dev` HMR instead |

---

## Known Issues / Incomplete Work

- The `merch` table and schema exist in the database but there is no Merch page in the frontend.
- The `bookings` table exists for contact/booking form submissions but the Contact page currently only shows social links — no form is wired up.
- The `database.types.ts` file was hand-written to match the schema; it is not auto-generated. If the schema changes, update this file manually or run `supabase gen types typescript`.
- `index.html` sets `lang="it"` as the document language. This should ideally be updated dynamically based on the selected language (currently only affects initial HTML parse).
- No error boundary is implemented — an unhandled Supabase error will crash the page.

---

## Recommended Next Steps After Migration

1. Set up a GitHub repository and push the code.
2. Connect the repo to Netlify or Vercel for CI/CD deploys on push.
3. Set environment variables in the hosting dashboard (never commit `.env`).
4. Run `supabase gen types typescript --project-id <id> > src/lib/database.types.ts` to keep types in sync.
5. Add a booking/contact form wired to the existing `bookings` table.
6. Build the Merch page using the existing `merch` table.
7. Set up Supabase Storage for flyer/artist image uploads instead of storing files in `public/`.
8. Add an admin interface or use Supabase Dashboard for content management.
9. Consider adding `lang` attribute switching on `<html>` based on the selected language.
10. Add a basic error boundary around route renders.
