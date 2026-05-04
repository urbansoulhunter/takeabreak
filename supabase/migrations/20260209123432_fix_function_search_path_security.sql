/*
  # Fix Function Search Path Security Issues

  1. Changes
    - Updates `update_past_events()` function to have immutable search_path
    - Updates `check_and_update_event_status()` function to have immutable search_path
    - Sets search_path explicitly to prevent potential security vulnerabilities
  
  2. Security
    - Prevents search_path manipulation attacks
    - Ensures functions always reference the correct schema
*/

-- Recreate update_past_events function with secure search_path
CREATE OR REPLACE FUNCTION update_past_events()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE events
  SET status = 'past'
  WHERE date < NOW()
    AND status != 'past';
END;
$$;

-- Recreate check_and_update_event_status function with secure search_path
CREATE OR REPLACE FUNCTION check_and_update_event_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.date < NOW() AND NEW.status != 'past' THEN
    NEW.status := 'past';
  END IF;
  RETURN NEW;
END;
$$;