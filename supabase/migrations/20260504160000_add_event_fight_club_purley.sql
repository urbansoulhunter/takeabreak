/*
  FIGHT CLUB — Lost Souls @ Regans Fight Champions, Purley (2026-03-28).
  Idempotent on flyer_url.
*/

INSERT INTO public.events (
  title,
  date,
  venue,
  location,
  ticket_link,
  lineup,
  description,
  image_url,
  flyer_url,
  status
)
SELECT
  'FIGHT CLUB',
  '2026-03-28T16:00:00+00:00',
  'Regans Fight Champions',
  'Units 9–11, Royal Oak Centre, Brighton Rd, Purley CR8 2PG, UK',
  NULL,
  ARRAY[
    'HAZZA B2B STATEE',
    'DARAN E B2B SOPHIA NICOLE',
    'WROE B2B JOHN',
    'MISS NIK B2B CULTIST',
    'VICAMIN D B2B JCB',
    'AUDIBLE ARCHIVE B2B VYPERBOY',
    'LA PISCINE B2B NARRATOR',
    'DJ COMP WINNERS (House & Garage)',
    'EDS B2B RICOCHET W/ MC INSIDE',
    'LADY H B2B LANA',
    'MISURA B2B JJAMES',
    'DDAM B2B MITCH',
    'FABLED SOUNDS B2B JIRANI',
    'JAMES B2B STTOCS',
    'TAIKO B2B MERCY',
    'DJ COMP WINNERS (D&B & Jungle)',
    'MC INSIDE',
    'MC STINGER'
  ]::text[],
  'Presented by Lost Souls. Two arenas: House & Garage, and D&B & Jungle. Saturday 28 March 2026, 4 PM – midnight (UK). Hosts: MC Inside, MC Stinger (+ more TBA). Partners: Jungle Planet Radio, Take a Break, Much Much Bass, Abso DNB.',
  'https://iili.io/BQCN60v.md.png',
  'https://iili.io/BQCN60v.md.png',
  'past'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.events e
  WHERE e.flyer_url = 'https://iili.io/BQCN60v.md.png'
);
