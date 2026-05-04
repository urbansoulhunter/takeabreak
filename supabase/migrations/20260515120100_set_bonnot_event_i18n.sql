/*
  Italian copy for Bonnot + General Levy row (requires title_it / description_it columns).
*/

UPDATE public.events
SET
  title_it = 'Bonnot + General Levy — Londra',
  description_it = 'Bass One Union presenta Bonnot con ospite speciale General Levy. Venerdì 15 maggio 2026, 21:00–04:00. 18+ | Senza documento non si entra | Ultimo ingresso 2:00 | Vietati copricapo e tuta | Solo bar card. Biglietti dal QR sul flyer.',
  venue_it = NULL,
  location_it = NULL
WHERE flyer_url = 'https://iili.io/BQC2mYJ.md.jpg';
