import React, { useEffect, useState } from 'react';
import { Music2, Instagram, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/useLanguage';
import SEO from '../components/SEO';
import type { Database } from '../lib/database.types';

type Artist = Database['public']['Tables']['artists']['Row'];

const Lineup: React.FC = () => {
  const { t, language } = useLanguage();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const getArtistBio = (artist: Artist) => {
    return language === 'it' && artist.bio_it ? artist.bio_it : artist.bio;
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setArtists(data || []);
    } catch (error) {
      console.error('Error fetching artists:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      <SEO
        title="Lineup & Artisti"
        description="Scopri gli artisti di Take a Break. I migliori DJ e producer internazionali di drum & bass, UK garage e bass music che si esibiranno nei nostri eventi."
        keywords="DJ drum and bass, artisti UK garage, bass music artists, lineup eventi, producer elettronica"
        url="/lineup"
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-[#00f0ff] neon-glow mb-4 uppercase tracking-tighter">
            {t.lineup.title}
          </h1>
          <p className="text-xl text-[#a0a0a0] tracking-wide">
            {t.lineup.subtitle}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-[#00f0ff]/30 border-t-[#00f0ff] rounded-full animate-spin"></div>
          </div>
        ) : artists.length === 0 ? (
          <div className="text-center py-20">
<p className="text-2xl text-[#a0a0a0]">{t.lineup.noArtists}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artists.map((artist) => (
              <div
                key={artist.id}
                onClick={() => setSelectedArtist(artist)}
                className="holographic group cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden bg-[#252525]">
                  {artist.image_url ? (
                    <img
                      src={artist.image_url}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music2 size={64} className="text-[#00f0ff]/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>

                  {artist.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] text-xs font-bold uppercase tracking-wider">
                      {language === 'it' ? 'In Evidenza' : 'Featured'}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#e8e8e8] mb-3 uppercase tracking-wide group-hover:text-[#00f0ff] transition-colors">
                    {artist.name}
                  </h3>

                  {artist.genre_tags && artist.genre_tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {artist.genre_tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#a0a0a0]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {getArtistBio(artist) && (
                    <p className="text-sm text-[#a0a0a0] line-clamp-2 mb-4">
                      {getArtistBio(artist)}
                    </p>
                  )}

                  <div className="flex gap-2">
                    {artist.instagram_url && (
                      <a
                        href={artist.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-colors"
                      >
                        <Instagram size={16} />
                      </a>
                    )}
                    {artist.soundcloud_url && (
                      <a
                        href={artist.soundcloud_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-colors"
                      >
                        <Music2 size={16} />
                      </a>
                    )}
                    {artist.spotify_url && (
                      <a
                        href={artist.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedArtist && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedArtist(null)}
        >
          <div
            className="holographic max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedArtist.image_url && (
              <div className="relative h-80 overflow-hidden">
                <img
                  src={selectedArtist.image_url}
                  alt={selectedArtist.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
              </div>
            )}

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-black text-[#00f0ff] neon-glow mb-2 uppercase tracking-tight">
                    {selectedArtist.name}
                  </h2>
                  {selectedArtist.genre_tags && selectedArtist.genre_tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedArtist.genre_tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-sm px-3 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSelectedArtist(null)}
                  className="text-[#a0a0a0] hover:text-[#00f0ff] transition-colors text-2xl"
                >
                  ×
                </button>
              </div>

{getArtistBio(selectedArtist) && (
                <div className="mb-6">
<h3 className="text-sm font-bold text-[#00f0ff] mb-3 uppercase tracking-wider">
                    {t.lineup.socialMedia}
                  </h3>
                  <p className="text-[#a0a0a0] leading-relaxed">
                    {getArtistBio(selectedArtist)}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                {selectedArtist.instagram_url && (
                  <a
                    href={selectedArtist.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-colors text-sm font-medium uppercase tracking-wider"
                  >
                    <Instagram size={18} />
                    Instagram
                  </a>
                )}
                {selectedArtist.soundcloud_url && (
                  <a
                    href={selectedArtist.soundcloud_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-colors text-sm font-medium uppercase tracking-wider"
                  >
                    <Music2 size={18} />
                    SoundCloud
                  </a>
                )}
                {selectedArtist.spotify_url && (
                  <a
                    href={selectedArtist.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-colors text-sm font-medium uppercase tracking-wider"
                  >
                    <ExternalLink size={18} />
                    Spotify
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lineup;
