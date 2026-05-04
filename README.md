# Take A Break

Bilingual (English/Italian) event website for the Take A Break electronic music collective, based in the UK.

---

## Quick Start

### Requirements

- Node.js 20.19 or later (22 LTS recommended)
- npm

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env and add your Supabase credentials (see ENVIRONMENT.md)

# 3. Start the development server
npm run dev
```

The app runs at `http://localhost:5173`.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Build for production (output: `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Documentation

| File | Contents |
|---|---|
| `MIGRATION_HANDOFF.md` | App overview, structure, Bolt migration notes |
| `ENVIRONMENT.md` | Environment variable reference |
| `DEPLOYMENT.md` | How to deploy (Netlify, Vercel, self-hosted) |
| `DEPENDENCIES.md` | Package explanations and version notes |
| `ARCHITECTURE.md` | Frontend/backend/data flow architecture |
| `TODO.md` | Incomplete features, bugs, cleanup tasks |

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — styling
- **React Router v7** — client-side routing
- **Supabase** — Postgres database
- **Lucide React** — icons
- **react-helmet-async** — SEO meta tags

---

## Project Structure

```
src/
  components/   Shared UI components
  contexts/     React contexts (language/translations)
  lib/          Supabase client, DB types, translations
  pages/        One file per route
  App.tsx       Router and layout
  index.css     Global styles and animations
supabase/
  migrations/   SQL migration files
public/         Static assets (images, flyers, logos)
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get these values from your Supabase project under **Settings → API**. See `ENVIRONMENT.md` for full details.

---

## Database

All schema is defined in `supabase/migrations/`. To apply migrations to a fresh Supabase project:

```bash
supabase link --project-ref <your-project-id>
supabase db push
```

---

## Deployment

The site builds to a static `dist/` folder and can be hosted anywhere. Netlify is recommended — the project includes `netlify.toml` and `public/_redirects` already configured.

See `DEPLOYMENT.md` for full instructions.

---

## License

All rights reserved. Take A Break.
