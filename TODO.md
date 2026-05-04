# TODO

Outstanding work, known issues, and migration tasks.

---

## Incomplete Features

### Contact / Booking Form
- The `bookings` table exists in the database with fields: `name`, `email`, `event_type`, `preferred_date`, `message`, `status`.
- The Contact page currently only shows social media links — no form is wired up.
- A form should POST to `supabase.from('bookings').insert(...)`.
- RLS already has a public insert policy.

### Merch Page
- The `merch` table is fully defined (name, description, price, image_urls, sizes, in_stock, category).
- There is no frontend page or route for it.
- A `/merch` route and `src/pages/Merch.tsx` need to be created.

### Artist Images
- Artist records in the database have an `image_url` field but many/all are null.
- The Lineup page renders a placeholder if the URL is missing.
- Images should be uploaded to Supabase Storage and URLs stored in the `artists` table.

### Event Flyers in Storage
- Flyers are currently stored as files in `public/` and referenced by local path.
- This does not scale well for a CMS workflow.
- Migrate to Supabase Storage: upload images, store public URLs in `events.flyer_url`.

---

## Bugs / Fragile Areas

### No Error Boundary
- If a Supabase query fails (network error, RLS change, etc.), the page will throw and the whole app crashes.
- Add a React error boundary around route renders in `App.tsx`.

### database.types.ts is Hand-Written
- `src/lib/database.types.ts` was manually written to match the schema.
- If the schema changes and this file is not updated, TypeScript will silently allow wrong column names.
- Fix: automate with `supabase gen types typescript --project-id <id> > src/lib/database.types.ts` and commit the output.

### HTML `lang` Attribute is Static
- `index.html` sets `lang="it"` unconditionally.
- The app detects language on load and can switch to English, but the HTML attribute never updates.
- This affects screen readers and search engine language detection.
- Fix: update `document.documentElement.lang` inside `LanguageContext` when language changes.

### Featured Artists Section is Hardcoded
- The "Featured Artists" section on the Home page lists artists with hardcoded names/bios rather than querying `artists WHERE featured = true`.
- This means adding/removing featured artists requires a code change, not a database update.
- Fix: refactor to query the `artists` table and filter by `featured = true`.

### `update_past_events()` Called on Every Events Page Mount
- The Events page calls the `update_past_events()` RPC function on every mount, even if no events need updating.
- This is harmless but wasteful.
- Consider calling it only when there are events with past dates still marked as `upcoming`.

---

## Migration Risks

| Risk | Detail |
|---|---|
| `.env` not copied | The project will fail to start without `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Copy your `.env` file manually — it is not in version control. |
| `public/` assets not committed | Flyer images and logos in `public/` must be committed to the repository or migrated to Supabase Storage. If you download from Bolt as a ZIP, they should be included. |
| Supabase project already live | Do not re-run migrations against a production database that already has data. The migrations use `IF NOT EXISTS` guards, but verify before running `supabase db push` against production. |
| Node version mismatch | Requires Node 20.19+. If your local Node is older, install via `nvm` or `fnm`. |

---

## Cleanup Tasks

- Delete `.bolt/` directory — it is Bolt metadata and has no use outside Bolt.
- Remove `DEPLOY_TO_NETLIFY.md` if this handoff document replaces it (or merge its content in).
- Resolve the `caniuse-lite` outdated warning: `npx update-browserslist-db@latest`.
- Remove or consolidate `src/pages/Terms.tsx` and `src/pages/TermsAndConditions.tsx` — there are two separate terms pages with different content. Decide if both are needed and whether they should be linked from the footer.

---

## Suggested Tests to Add

The project has no test suite. Suggested additions, in priority order:

1. **Supabase integration smoke test** — confirm the client can connect and read from `events` and `artists`.
2. **Routing test** — confirm all 8 routes render without crashing.
3. **Translation completeness test** — confirm every key in the `en` object also exists in `it` and vice versa.
4. **LanguageContext test** — confirm timezone detection defaults correctly and `setLanguage` persists to localStorage.
5. **ScrollReveal test** — confirm the component renders children and applies the correct initial transform.

Consider Vitest (already compatible with Vite, no extra config needed) + React Testing Library.
