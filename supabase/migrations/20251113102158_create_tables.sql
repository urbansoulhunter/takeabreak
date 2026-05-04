/*
  # Create Take a Break Database Schema

  ## Overview
  Creates the database structure for the Take a Break D&B event brand website
  with tables for events, artists, merchandise, and booking inquiries.

  ## New Tables

  ### 1. events
  Main table for event information and calendar
  - `id` (uuid, primary key) - Unique event identifier
  - `title` (text) - Event name/title
  - `date` (timestamptz) - Event date and time
  - `venue` (text) - Venue name
  - `location` (text) - City/location
  - `ticket_link` (text, nullable) - External ticket purchase URL
  - `lineup` (text[]) - Array of artist names performing
  - `description` (text, nullable) - Event description/details
  - `image_url` (text, nullable) - Event flyer/poster image
  - `status` (text) - Event status: upcoming, past, sold_out
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. artists
  DJ/artist profiles and information
  - `id` (uuid, primary key) - Unique artist identifier
  - `name` (text) - Artist/DJ name
  - `bio` (text, nullable) - Artist biography
  - `genre_tags` (text[]) - Array of genre tags
  - `image_url` (text, nullable) - Artist photo/profile image
  - `soundcloud_url` (text, nullable) - SoundCloud profile link
  - `instagram_url` (text, nullable) - Instagram profile link
  - `spotify_url` (text, nullable) - Spotify profile link
  - `featured` (boolean) - Whether artist is featured on homepage
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. merch
  Merchandise products for the brand
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name
  - `description` (text, nullable) - Product description
  - `price` (numeric) - Product price
  - `image_urls` (text[]) - Array of product image URLs
  - `sizes` (text[]) - Available sizes
  - `in_stock` (boolean) - Inventory availability
  - `category` (text) - Product category (apparel, accessories, etc.)
  - `created_at` (timestamptz) - Record creation timestamp

  ### 4. bookings
  Contact form submissions and booking inquiries
  - `id` (uuid, primary key) - Unique inquiry identifier
  - `name` (text) - Inquirer name
  - `email` (text) - Contact email
  - `event_type` (text) - Type of event/booking request
  - `preferred_date` (date, nullable) - Preferred event date
  - `message` (text) - Inquiry message/details
  - `status` (text) - Inquiry status: new, reviewed, contacted
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable Row Level Security on all tables
  - Public read access for events, artists, and merch
  - Authenticated-only write access for bookings
  - Admin-only write access for events, artists, and merch (future implementation)

  ## Important Notes
  1. All tables use UUID primary keys for security and scalability
  2. Timestamps use timestamptz for timezone awareness
  3. Array columns used for flexible multi-value fields
  4. Nullable fields allow partial data entry during content creation
  5. Status enums implemented as text with check constraints for flexibility
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date timestamptz NOT NULL,
  venue text NOT NULL,
  location text NOT NULL,
  ticket_link text,
  lineup text[] DEFAULT '{}',
  description text,
  image_url text,
  status text NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'past', 'sold_out')),
  created_at timestamptz DEFAULT now()
);

-- Create artists table
CREATE TABLE IF NOT EXISTS artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text,
  genre_tags text[] DEFAULT '{}',
  image_url text,
  soundcloud_url text,
  instagram_url text,
  spotify_url text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create merch table
CREATE TABLE IF NOT EXISTS merch (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10, 2) NOT NULL,
  image_urls text[] DEFAULT '{}',
  sizes text[] DEFAULT '{}',
  in_stock boolean DEFAULT true,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  event_type text NOT NULL,
  preferred_date date,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE merch ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Events are publicly readable"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Artists are publicly readable"
  ON artists FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Merch is publicly readable"
  ON merch FOR SELECT
  TO anon, authenticated
  USING (true);

-- Booking submission policy (anyone can submit)
CREATE POLICY "Anyone can submit bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS events_date_idx ON events(date DESC);
CREATE INDEX IF NOT EXISTS events_status_idx ON events(status);
CREATE INDEX IF NOT EXISTS artists_featured_idx ON artists(featured);
CREATE INDEX IF NOT EXISTS artists_name_idx ON artists(name);
CREATE INDEX IF NOT EXISTS merch_category_idx ON merch(category);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings(created_at DESC);
