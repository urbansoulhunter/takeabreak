/**
 * Insert one row into public.events using the service role key from .env.local.
 *
 * Usage:
 *   node scripts/add-event.mjs
 *   node scripts/add-event.mjs path/to/event.json
 *
 * event.json example:
 * {
 *   "title": "Summer Session",
 *   "date": "2026-08-16T20:00:00+00:00",
 *   "venue": "Venue name",
 *   "location": "City, Country",
 *   "ticket_link": null,
 *   "lineup": ["DJ One", "DJ Two"],
 *   "description": null,
 *   "title_it": null,
 *   "description_it": null,
 *   "venue_it": null,
 *   "location_it": null,
 *   "image_url": "https://...",
 *   "flyer_url": "https://...",
 *   "status": "upcoming"
 * }
 */

import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

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
const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    'Missing SUPABASE_URL (or VITE_SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY. Check .env.local.',
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const defaultEvent = {
  title: 'New event (edit title)',
  date: '2026-08-16T20:00:00+00:00',
  venue: 'Venue TBA',
  location: 'Sardegna, Italia',
  ticket_link: null,
  lineup: [],
  description: null,
  image_url: 'https://iili.io/BQBvybI.md.jpg',
  flyer_url: 'https://iili.io/BQBvybI.md.jpg',
  status: 'upcoming',
};

let payload;
const arg = process.argv[2];
if (arg) {
  const jsonPath = join(root, arg);
  if (!existsSync(jsonPath)) {
    console.error('File not found:', jsonPath);
    process.exit(1);
  }
  payload = JSON.parse(readFileSync(jsonPath, 'utf8'));
} else {
  payload = defaultEvent;
}

const { data, error } = await supabase.from('events').insert(payload).select().single();

if (error) {
  console.error('Insert failed:', error.message);
  process.exit(1);
}

console.log('Inserted event:', data.id, data.title);
