# Environment Variables

This project uses two environment variables. Both are required for the app to start — the Supabase client will throw an error at boot if either is missing.

All variables must be prefixed with `VITE_` to be accessible in the browser bundle via `import.meta.env`.

---

## Variables

### `VITE_SUPABASE_URL`

| Field | Value |
|---|---|
| **Used for** | The base URL of your Supabase project. All database queries and storage requests go through this URL. |
| **Required** | Yes |
| **Needed** | Locally and in production |
| **Example** | `https://xxxxxxxxxxxxxxxxxxxx.supabase.co` |
| **Where to find it** | Supabase Dashboard → Project Settings → API → Project URL |

---

### `VITE_SUPABASE_ANON_KEY`

| Field | Value |
|---|---|
| **Used for** | The public anonymous key for the Supabase client. This key is safe to expose in client-side code — it is restricted by Row Level Security (RLS) policies. |
| **Required** | Yes |
| **Needed** | Locally and in production |
| **Example** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxx` |
| **Where to find it** | Supabase Dashboard → Project Settings → API → Project API Keys → `anon` `public` |

---

### `VITE_SITE_URL` (optional)

| Field | Value |
|---|---|
| **Used for** | Canonical site origin (no trailing slash): `react-helmet-async` canonicals/OG URLs, JSON-LD, and **build-time** `index.html`, `dist/sitemap.xml`, `dist/robots.txt`. |
| **Required** | No — defaults to `https://takeabreaksets.com`. |
| **Needed** | Set in **Netlify** (or `.env`) to match your production hostname if it differs. |

### `VITE_DEFAULT_OG_IMAGE` (optional)

| Field | Value |
|---|---|
| **Used for** | Absolute URL of the default Open Graph / Twitter image in `index.html` (build) and in `SEO.tsx` when a page does not pass a custom `image`. |
| **Required** | No — defaults to the Olbia flyer image URL used in the app. |

---

## Local-only scripts (`.env.local`, gitignored via `*.local`)

These are **not** used by the Vite app. They power `scripts/add-event.mjs`, `scripts/update-event.mjs`, and `npm run db:event-i18n`.

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Same value as `VITE_SUPABASE_URL` (no `VITE_` prefix). |
| `SUPABASE_SERVICE_ROLE_KEY` | Inserts/updates rows bypassing RLS. **Never** expose in the browser. |
| `SUPABASE_DB_PASSWORD` | Database password (Project Settings → Database). Used only by `npm run db:event-i18n` to run SQL for optional Italian event columns. |

---

## Netlify CLI (optional — manual deploys)

The Vite app is normally deployed by **pushing to GitHub** when the repo is connected in Netlify. Use the CLI only if you want to deploy from your machine without pushing.

`npx netlify deploy --prod` needs authentication. Pick one:

### 1. Log in on this PC (simplest for local use)

From the project root:

```bash
npx netlify login
```

Complete the browser flow once. The CLI stores a token locally (you do not need `NETLIFY_AUTH_TOKEN` in your shell after that).

If this folder is not linked to your site yet:

```bash
npx netlify link
```

Then:

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

### 2. Personal access token (CI or you prefer env vars)

1. Netlify Dashboard → **User settings** → **Applications** → **Personal access tokens** → create a token.
2. In **PowerShell** (current session only):

```powershell
$env:NETLIFY_AUTH_TOKEN = "paste-token-here"
npx netlify deploy --prod --dir=dist
```

The Netlify CLI does **not** read `.env.local`; use the shell, or **Windows** → *Environment variables* → add `NETLIFY_AUTH_TOKEN` for your user if you want it persistent.

**Security:** Treat the token like a password. Do not commit it. Revoke it in Netlify if it leaks.

---

## Notes

- Never commit your real `.env` file to version control. It is listed in `.gitignore`.
- The anon key is intentionally public — it is scoped by RLS. Do not confuse it with the `service_role` key, which bypasses all security policies and must never be exposed client-side.
- If you need to run `supabase gen types` or apply migrations from the CLI, you will also need `SUPABASE_ACCESS_TOKEN` set in your shell environment (not in `.env`). Get it from Supabase Dashboard → Account → Access Tokens.

---

## Local Setup

```bash
cp .env.example .env
# then edit .env and paste in your real values
```
