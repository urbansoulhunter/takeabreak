/*
  Optional Italian copy for events (UI falls back to primary columns when null).
*/

ALTER TABLE public.events ADD COLUMN IF NOT EXISTS title_it text;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS description_it text;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS venue_it text;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS location_it text;
