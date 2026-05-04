/*
  Italian fields for the Drum & Bass Night flyer event (idempotent update).
*/

UPDATE public.events
SET
  title_it = 'Serata Drum & Bass',
  description_it = 'Ingresso gratuito. Inquadra il QR code sul flyer per registrarti — merch in omaggio.',
  venue_it = NULL,
  location_it = NULL
WHERE flyer_url = 'https://iili.io/BQBvybI.md.jpg';
