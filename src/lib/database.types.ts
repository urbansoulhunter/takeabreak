export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          title: string;
          date: string;
          venue: string;
          location: string;
          ticket_link: string | null;
          lineup: string[];
          description: string | null;
          title_it: string | null;
          description_it: string | null;
          venue_it: string | null;
          location_it: string | null;
          image_url: string | null;
          flyer_url: string | null;
          status: 'upcoming' | 'past' | 'sold_out';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      artists: {
        Row: {
          id: string;
          name: string;
          bio: string | null;
          bio_it: string | null;
          genre_tags: string[];
          image_url: string | null;
          soundcloud_url: string | null;
          instagram_url: string | null;
          spotify_url: string | null;
          featured: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['artists']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['artists']['Insert']>;
      };
      merch: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          image_urls: string[];
          sizes: string[];
          in_stock: boolean;
          category: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['merch']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['merch']['Insert']>;
      };
      bookings: {
        Row: {
          id: string;
          name: string;
          email: string;
          event_type: string;
          preferred_date: string | null;
          message: string;
          status: 'new' | 'reviewed' | 'contacted';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at' | 'status'>;
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>;
      };
    };
  };
}
