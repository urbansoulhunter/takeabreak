/*
  Insert a new upcoming event with the provided flyer URL.

  RLS does not allow anon inserts on `events`, so this is applied via Supabase migrations
  (`supabase db push`) or run manually in the SQL editor as a privileged user.

  After deploy, open Supabase → Table Editor → events and adjust title, date, venue,
  location, lineup, ticket_link, and description to match the flyer.
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
  'Drum & Bass Night',
  '2026-05-30T17:00:00+00:00',
  'Party Music Pub',
  'Via Regina Elena 40, Olbia SS',
  NULL,
  ARRAY['MISURA','LEE KERRY','LAKILUCIANO','DJ DRAS','PIPU','STENZ:OVERDUB (MC + DJ set)']::text[],
  'Free entry. Scan the QR code on the flyer to register — free merch.',
  'https://iili.io/BQBvybI.md.jpg',
  'https://iili.io/BQBvybI.md.jpg',
  'upcoming'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.events e
  WHERE e.flyer_url = 'https://iili.io/BQBvybI.md.jpg'
);
