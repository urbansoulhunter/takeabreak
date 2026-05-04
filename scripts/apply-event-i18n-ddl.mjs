/**
 * Apply event i18n columns + Italian copy for the Drum & Bass Night row (Postgres).
 *
 * Add to .env.local:
 *   SUPABASE_DB_PASSWORD=your_database_password
 * (Supabase → Project Settings → Database → Database password)
 *
 * Usage: node scripts/apply-event-i18n-ddl.mjs
 */

import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function loadEnv() {
  const out = {};
  for (const name of ['.env.local', '.env']) {
    const p = join(root, name);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(key in out)) out[key] = val;
    }
  }
  return out;
}

const env = loadEnv();
const urlStr = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
const password = env.SUPABASE_DB_PASSWORD;

if (!urlStr || !password) {
  console.error(
    'Need SUPABASE_URL (or VITE_SUPABASE_URL) and SUPABASE_DB_PASSWORD in .env.local',
  );
  process.exit(1);
}

let host;
try {
  const u = new URL(urlStr);
  host = u.hostname;
} catch {
  console.error('Invalid SUPABASE_URL');
  process.exit(1);
}

const projectRef = host.replace('.supabase.co', '');
if (!projectRef || projectRef === host) {
  console.error('Could not parse project ref from URL host:', host);
  process.exit(1);
}

const statements = [
  'ALTER TABLE public.events ADD COLUMN IF NOT EXISTS title_it text;',
  'ALTER TABLE public.events ADD COLUMN IF NOT EXISTS description_it text;',
  'ALTER TABLE public.events ADD COLUMN IF NOT EXISTS venue_it text;',
  'ALTER TABLE public.events ADD COLUMN IF NOT EXISTS location_it text;',
];

const client = new pg.Client({
  host: `db.${projectRef}.supabase.co`,
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
try {
  for (const q of statements) {
    await client.query(q);
  }
  console.log('Applied event i18n columns (title_it, description_it, venue_it, location_it).');

  const { rowCount } = await client.query(
    `UPDATE public.events
     SET title_it = $1,
         description_it = $2,
         venue_it = NULL,
         location_it = NULL
     WHERE flyer_url = $3`,
    [
      'Serata Drum & Bass',
      'Ingresso gratuito. Inquadra il QR code sul flyer per registrarti — merch in omaggio.',
      'https://iili.io/BQBvybI.md.jpg',
    ],
  );
  console.log('Updated Italian fields for flyer row; rows affected:', rowCount);
} finally {
  await client.end();
}
