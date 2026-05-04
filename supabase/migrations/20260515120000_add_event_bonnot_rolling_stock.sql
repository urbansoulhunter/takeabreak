/*
  Bass One Union — Bonnot + General Levy @ Rolling Stock, London (2026-05-15).
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
  'Bonnot + General Levy',
  '2026-05-15T20:00:00+00:00',
  'Rolling Stock',
  '48 Kingsland Rd, London E2 8DA',
  NULL,
  ARRAY[
    'Bonnot',
    'General Levy (Special Guest)',
    'Manlio Calafrocampano (Host)',
    'TILLY',
    'DOMPROD',
    'JAHPAWA',
    'EDS',
    'SLENCHO',
    'MILMO',
    'MARTI STONE',
    'EL SANTONADA',
    'MISURA',
    'GABS',
    'SABAMAN',
    'RICOCHET',
    'MC INSIDE',
    'MOOSTATZ',
    'SLIPPY SKILLS & LNO',
    'REDMOND-HAMILTON'
  ]::text[],
  'Bass One Union presents Bonnot with special guest General Levy. Friday 15 May 2026, 9PM–4AM. 18+ | No ID, no entry | Last entry 2AM | No head cover, no tracksuit bottoms | Bar card only. Scan the QR on the flyer for tickets.',
  'https://iili.io/BQC2mYJ.md.jpg',
  'https://iili.io/BQC2mYJ.md.jpg',
  'upcoming'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.events e
  WHERE e.flyer_url = 'https://iili.io/BQC2mYJ.md.jpg'
);
