/**
 * Patch one event row (service role). Match by flyer URL or event id.
 *
 * Usage:
 *   node scripts/update-event.mjs --flyer <flyer_url> <patch.json>
 *   node scripts/update-event.mjs --id <uuid> <patch.json>
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

const argv = process.argv.slice(2);
let mode = null;
let matchValue = null;
let jsonPath = null;

if (argv[0] === '--flyer' && argv.length >= 3) {
  mode = 'flyer';
  matchValue = argv[1];
  jsonPath = join(root, argv[2]);
} else if (argv[0] === '--id' && argv.length >= 3) {
  mode = 'id';
  matchValue = argv[1];
  jsonPath = join(root, argv[2]);
} else {
  console.error('Usage: node scripts/update-event.mjs --flyer <url> <patch.json>');
  console.error('   or: node scripts/update-event.mjs --id <uuid> <patch.json>');
  process.exit(1);
}

if (!existsSync(jsonPath)) {
  console.error('Patch file not found:', jsonPath);
  process.exit(1);
}

const patch = JSON.parse(readFileSync(jsonPath, 'utf8'));

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const q = supabase.from('events').update(patch);
const { data, error } =
  mode === 'flyer'
    ? await q.eq('flyer_url', matchValue).select().single()
    : await q.eq('id', matchValue).select().single();

if (error) {
  console.error('Update failed:', error.message);
  process.exit(1);
}

console.log('Updated event:', data.id, data.title);
