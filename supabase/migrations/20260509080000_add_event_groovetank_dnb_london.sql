/*
  Take a Break — Drum & Bass @ Groove Tank Live, London (2026-05-09).
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
  'Take a Break — Drum & Bass',
  '2026-05-09T19:00:00+01:00',
  'Groove Tank Live',
  'Unit 67, Containerville Studios, 40 The Oval, London E2 9DT, UK',
  NULL,
  ARRAY[
    'MISURA',
    'EDS',
    'RICOCHET',
    'MILMO',
    'DJ DEEF'
  ]::text[],
  'Drum & bass at Groove Tank Live. Saturday 9 May 2026, 7:00 PM – midnight (UK). £5 entry; free ticket offer — limited availability, registration required (scan QR on flyer). Live on YouTube. With Jungle Planet Radio, Take a Break & Lost Souls.',
  'https://iili.io/BQUIrhl.md.jpg',
  'https://iili.io/BQUIrhl.md.jpg',
  'upcoming'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.events e
  WHERE e.flyer_url = 'https://iili.io/BQUIrhl.md.jpg'
);
