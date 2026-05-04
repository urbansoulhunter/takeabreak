# Deployment Guide

This is a fully static site. There is no server, no API layer, and no SSR. The build output is a folder of HTML/CSS/JS files that can be hosted anywhere that serves static files.

---

## Recommended Host: Netlify

The project already includes `netlify.toml` and `public/_redirects` configured for Netlify. It is the lowest-friction option.

### Steps

1. Push the project to a GitHub repository.
2. Log in to [netlify.com](https://netlify.com) and click **Add new site → Import an existing project**.
3. Connect your GitHub account and select the repository.
4. Netlify will auto-detect the build settings from `netlify.toml`, but confirm:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Go to **Site settings → Environment variables** and add:
   - `VITE_SUPABASE_URL` — your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` — your Supabase anon key
6. Click **Deploy site**.

From that point, every push to the main branch triggers an automatic redeploy.

---

## Alternative: Vercel

1. Push to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Vite. Confirm:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Add environment variables under **Project Settings → Environment Variables**.
5. Deploy.

---

## Alternative: Cloudflare Pages

1. Push to GitHub.
2. In Cloudflare Dashboard → Pages → Create a project.
3. Connect GitHub, select repo.
4. Set **Build command:** `npm run build`, **Build output directory:** `dist`.
5. Add environment variables.
6. Deploy.

---

## Manual / Self-Hosted

```bash
npm install
npm run build
# Serve the dist/ folder from any static file server
# e.g. nginx, Apache, S3 + CloudFront, etc.
```

---

## Redirects / Rewrites (Required)

Because routing is client-side (React Router), the server must return `index.html` for every path. Without this, direct URL visits and page refreshes on sub-routes return 404.

**Netlify** — already handled by `public/_redirects`:
```
/* /index.html 200
```

**Vercel** — add a `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Nginx** — add to your server block:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache** — add a `.htaccess`:
```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ /index.html [L]
```

---

## Environment Variables in Production

Set these in your hosting platform's environment variable UI. Never hardcode them or commit `.env`.

| Variable | Required | Notes |
|---|---|---|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase public anon key |

---

## Serverless / API / Backend

There are no custom API routes or serverless functions in this project. All data access goes directly from the browser to Supabase using the public anon key, controlled by Row Level Security policies.

---

## Database Setup

The Supabase database is already provisioned and migrated. If you are setting up a new Supabase project (e.g. for a staging environment), apply all migrations in order:

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref <your-project-id>

# Apply all migrations
supabase db push
```

Migration files are in `supabase/migrations/` and must be applied in chronological order (filename prefix is a timestamp).

---

## Domain / DNS

The SEO component (`src/components/SEO.tsx`) has `https://takeabreak.events` hardcoded as the base URL for Open Graph tags and canonical links. If you change the domain, update that constant in `SEO.tsx`.

For a custom domain on Netlify: Site settings → Domain management → Add custom domain. Update your DNS registrar to point to Netlify's nameservers or add the provided A/CNAME records.

---

## Storage

Flyer images and artist photos are currently stored as files in the `public/` folder and referenced by path (e.g. `/karma-flyer.png`). This works fine for the current scale. For a more scalable approach, migrate these to Supabase Storage and update the image URLs in the database records.
