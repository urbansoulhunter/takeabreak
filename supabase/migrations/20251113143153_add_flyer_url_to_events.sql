/*
  # Add flyer URL to events table

  1. Changes
    - Add `flyer_url` column to `events` table for storing event flyer image URLs
    - This allows events to have a dedicated flyer that can be displayed in a modal
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'flyer_url'
  ) THEN
    ALTER TABLE events ADD COLUMN flyer_url text;
  END IF;
END $$;