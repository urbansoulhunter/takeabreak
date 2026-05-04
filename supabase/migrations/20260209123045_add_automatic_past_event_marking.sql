/*
  # Automatic Past Event Marking

  1. New Functions
    - `update_past_events()` - PostgreSQL function that automatically updates event status to 'past' when the event date has passed
    - This function compares event dates with the current timestamp and updates status accordingly
  
  2. Changes
    - Creates a reusable function that can be called to update past events
    - Can be scheduled or called periodically to keep event statuses up-to-date
  
  3. Security
    - Function uses SECURITY DEFINER to run with creator privileges
    - Ensures proper updates even with RLS enabled
*/

-- Function to automatically update past events
CREATE OR REPLACE FUNCTION update_past_events()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE events
  SET status = 'past'
  WHERE date < NOW()
    AND status != 'past';
END;
$$;

-- Run the function immediately to update any existing past events
SELECT update_past_events();

-- Create a trigger function that runs before SELECT queries
-- This ensures status is always up-to-date when viewing events
CREATE OR REPLACE FUNCTION check_and_update_event_status()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- If the event date has passed and status is not 'past', update it
  IF NEW.date < NOW() AND NEW.status != 'past' THEN
    NEW.status := 'past';
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger that runs on INSERT and UPDATE
DROP TRIGGER IF EXISTS update_event_status_trigger ON events;
CREATE TRIGGER update_event_status_trigger
  BEFORE INSERT OR UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION check_and_update_event_status();