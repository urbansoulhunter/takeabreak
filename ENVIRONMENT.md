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

## Local-only scripts (`.env.local`, gitignored via `*.local`)

These are **not** used by the Vite app. They power `scripts/add-event.mjs`, `scripts/update-event.mjs`, and `npm run db:event-i18n`.

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Same value as `VITE_SUPABASE_URL` (no `VITE_` prefix). |
| `SUPABASE_SERVICE_ROLE_KEY` | Inserts/updates rows bypassing RLS. **Never** expose in the browser. |
| `SUPABASE_DB_PASSWORD` | Database password (Project Settings → Database). Used only by `npm run db:event-i18n` to run SQL for optional Italian event columns. |

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
