/*
  # Fix Security Issues

  ## Overview
  This migration addresses several security and performance issues identified in the database.

  ## Changes Made

  ### 1. Remove Unused Indexes
  Dropping indexes that are not being used to improve database performance:
  - `artists_featured_idx` - Not utilized in current queries
  - `artists_name_idx` - Not utilized in current queries
  - `merch_category_idx` - Not utilized in current queries
  - `bookings_created_at_idx` - Not utilized in current queries

  ### 2. Fix Insecure RLS Policy
  Replacing the overly permissive booking submission policy with secure validation:
  - **Old Policy**: Allowed unrestricted access with `WITH CHECK (true)`
  - **New Policy**: Validates that required fields are provided and properly formatted
  - Ensures name, email, event_type, and message are not empty strings
  - Validates email format using basic pattern matching

  ## Important Notes

  ### Auth DB Connection Strategy
  **Action Required**: The Auth server connection strategy must be updated manually in the Supabase Dashboard:
  1. Navigate to Project Settings > Database
  2. Change "Connection pooling mode" from "Session" to "Transaction"
  3. Update the connection limit from a fixed number (10) to a percentage-based allocation
  
  This cannot be automated via SQL migration and requires dashboard access.

  ## Security Improvements
  - Prevents empty or malformed booking submissions
  - Maintains public access while adding input validation
  - Reduces database overhead by removing unused indexes
*/

-- Drop unused indexes
DROP INDEX IF EXISTS artists_featured_idx;
DROP INDEX IF EXISTS artists_name_idx;
DROP INDEX IF EXISTS merch_category_idx;
DROP INDEX IF EXISTS bookings_created_at_idx;

-- Drop the insecure booking policy
DROP POLICY IF EXISTS "Anyone can submit bookings" ON bookings;

-- Create a secure booking submission policy with validation
CREATE POLICY "Validated booking submissions"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Ensure name is not empty
    length(trim(name)) > 0
    -- Ensure email is not empty and has basic email format
    AND length(trim(email)) > 0
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    -- Ensure event_type is not empty
    AND length(trim(event_type)) > 0
    -- Ensure message is not empty
    AND length(trim(message)) > 0
  );
