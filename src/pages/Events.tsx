import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, MapPin, ExternalLink, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/useLanguage';
import SEO from '../components/SEO';
import type { Database } from '../lib/database.types';
import { eventItalianField } from '../lib/eventI18nFallbacks';
import { formatLineupDisplayName, sortLineupForDisplay } from '../lib/lineupDisplay';
import type { Language } from '../lib/translations';

type Event = Database['public']['Tables']['events']['Row'];

function pickLocalized(
  language: Language,
  primary: string,
  italian: string | null | undefined,
): string {
  if (language === 'it' && italian != null && italian.trim() !== '') {
    return italian;
  }
  return primary;
}

function pickLocalizedNullable(
  language: Language,
  primary: string | null | undefined,
  italian: string | null | undefined,
): string | null {
  if (language === 'it' && italian != null && italian.trim() !== '') {
    return italian;
  }
  return primary ?? null;
}

const Events: React.FC = () => {
  const { t, language } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      await supabase.rpc('update_past_events');

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = useMemo(() => {
    const list = events.filter((event) => {
      if (filter === 'all') return true;
      if (filter === 'upcoming') return event.status === 'upcoming' || event.status === 'sold_out';
      if (filter === 'past') return event.status === 'past';
      return true;
    });
    if (filter === 'past') {
      return [...list].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }
    return list;
  }, [events, filter]);

  const dateLocale = language === 'it' ? 'it-IT' : 'en-GB';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString(dateLocale, { month: 'short' }).toUpperCase(),
      year: date.getFullYear(),
      time: date.toLocaleTimeString(dateLocale, { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming' || e.status === 'sold_out');
  const eventListSchema = upcomingEvents.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": upcomingEvents.map((event, index) => ({
      "@type": "MusicEvent",
      "position": index + 1,
      "name": pickLocalized(language, event.title, eventItalianField(event, 'title_it')),
      "startDate": event.date,
      "location": {
        "@type": "Place",
        "name": pickLocalized(language, event.venue, eventItalianField(event, 'venue_it')),
        "address": {
          "@type": "PostalAddress",
          "addressLocality": pickLocalized(language, event.location, eventItalianField(event, 'location_it')),
          "addressCountry": "IT"
        }
      },
      "image": event.flyer_url || event.image_url,
      "description": pickLocalizedNullable(language, event.description, eventItalianField(event, 'description_it')),
      "eventStatus": event.status === 'sold_out' ? "https://schema.org/EventSoldOut" : "https://schema.org/EventScheduled",
      "performer": event.lineup
        ? sortLineupForDisplay(event.lineup).map((artist) => ({
            "@type": "MusicGroup",
            "name": artist,
          }))
        : []
    }))
  } : undefined;

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      <SEO
        title="Eventi"
        description="Scopri tutti i prossimi eventi Take a Break. Drum & bass, UK garage e bass music con i migliori artisti internazionali in Sardegna."
        keywords="eventi drum and bass, UK garage events, bass music Sardegna, concerti elettronica Italia"
        url="/events"
        type="website"
        schemaData={eventListSchema}
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-[#00f0ff] neon-glow mb-4 uppercase tracking-tighter">
            {t.events.title}
          </h1>
          <p className="text-xl text-[#a0a0a0] tracking-wide">
            {t.footer.tagline}
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {(['all', 'upcoming', 'past'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-2 font-medium tracking-wider uppercase text-sm transition-all duration-300 ${
                filter === filterOption
                  ? 'bg-[#00f0ff]/20 border-2 border-[#00f0ff] text-[#00f0ff]'
                  : 'bg-transparent border-2 border-[#a0a0a0]/30 text-[#a0a0a0] hover:border-[#00f0ff]/50 hover:text-[#00f0ff]'
              }`}
            >
              {filterOption === 'upcoming' ? t.events.upcoming : filterOption === 'past' ? t.events.past : t.events.all}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-[#00f0ff]/30 border-t-[#00f0ff] rounded-full animate-spin"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20">
<p className="text-2xl text-[#a0a0a0]">{filter === 'upcoming' ? t.events.noUpcoming : t.events.noPast}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const dateInfo = formatDate(event.date);
              const displayTitle = pickLocalized(language, event.title, eventItalianField(event, 'title_it'));
              const displayVenue = pickLocalized(language, event.venue, eventItalianField(event, 'venue_it'));
              const displayLocation = pickLocalized(language, event.location, eventItalianField(event, 'location_it'));
              const displayDescription = pickLocalizedNullable(language, event.description, eventItalianField(event, 'description_it'));
              const displayLineup = event.lineup?.length
                ? sortLineupForDisplay(event.lineup)
                : [];
              return (
                <div
                  key={event.id}
                  className="holographic group hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  {(event.flyer_url || event.image_url) && (
                    <div className="relative w-full bg-[#121212] border-b border-[#00f0ff]/15">
                      <img
                        src={event.flyer_url || event.image_url}
                        alt={displayTitle}
                        className="w-full h-auto block"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 text-center">
                        <div className="text-3xl font-bold text-[#00f0ff]">{dateInfo.day}</div>
                        <div className="text-xs text-[#a0a0a0] tracking-wider">{dateInfo.month}</div>
                        <div className="text-xs text-[#a0a0a0]">{dateInfo.year}</div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#e8e8e8] mb-2 uppercase tracking-wide">
                          {displayTitle}
                        </h3>
                        {event.status === 'sold_out' && (
                          <span className="inline-block px-2 py-1 text-xs font-bold bg-red-500/20 border border-red-500 text-red-400 mb-2 uppercase">
                            {t.events.soldOut}
                          </span>
                        )}
                        {event.status === 'past' && (
                          <span className="inline-block px-2 py-1 text-xs font-bold bg-[#a0a0a0]/20 border border-[#a0a0a0] text-[#a0a0a0] mb-2 uppercase">
                            {t.events.pastEvent}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
                        <MapPin size={16} className="text-[#00f0ff]" />
                        <span>{displayVenue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
                        <Calendar size={16} className="text-[#00f0ff]" />
                        <span>{displayLocation}</span>
                      </div>
                    </div>

                    {displayDescription && (
                      <p className="text-sm text-[#a0a0a0] mb-4 line-clamp-2">
                        {displayDescription}
                      </p>
                    )}

                    {displayLineup.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-[#00f0ff] font-medium mb-2 uppercase tracking-wider">
                          {t.events.lineup}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {displayLineup.slice(0, 3).map((artist, index) => (
                            <span
                              key={`${artist}-${index}`}
                              className="text-xs px-2 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#e8e8e8] uppercase tracking-wide"
                            >
                              {formatLineupDisplayName(artist)}
                            </span>
                          ))}
                          {displayLineup.length > 3 && (
                            <span className="text-xs px-2 py-1 text-[#a0a0a0] uppercase tracking-wide">
                              {t.events.lineupMore.replace('{{count}}', String(displayLineup.length - 3))}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {event.ticket_link && event.status !== 'past' && event.status !== 'sold_out' && (
                      <a
                        href={event.ticket_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] text-sm font-medium hover:bg-[#00f0ff]/30 transition-colors w-full justify-center uppercase tracking-wider"
                      >
{t.events.viewDetails}
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedEvent && (() => {
        const modalTitle = pickLocalized(language, selectedEvent.title, eventItalianField(selectedEvent, 'title_it'));
        const modalVenue = pickLocalized(language, selectedEvent.venue, eventItalianField(selectedEvent, 'venue_it'));
        const modalLocation = pickLocalized(language, selectedEvent.location, eventItalianField(selectedEvent, 'location_it'));
        const modalDescription = pickLocalizedNullable(language, selectedEvent.description, eventItalianField(selectedEvent, 'description_it'));
        const modalLineup = selectedEvent.lineup?.length
          ? sortLineupForDisplay(selectedEvent.lineup)
          : [];
        return (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#1a1a1a] border-2 border-[#00f0ff] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/80 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              {selectedEvent.flyer_url ? (
                <img
                  src={selectedEvent.flyer_url}
                  alt={`${modalTitle} Flyer`}
                  className="w-full h-auto"
                />
              ) : (
                <div className="p-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#00f0ff] mb-6 uppercase tracking-wider">
                    {modalTitle}
                  </h2>
                  <div className="space-y-4 text-[#e8e8e8]">
                    <div className="flex items-center gap-2">
                      <Calendar size={20} className="text-[#00f0ff]" />
                      <span className="text-lg">
                        {new Date(selectedEvent.date).toLocaleDateString(dateLocale, {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={20} className="text-[#00f0ff]" />
                      <span className="text-lg">{modalVenue} - {modalLocation}</span>
                    </div>
                    {modalDescription && (
                      <p className="text-[#a0a0a0] mt-4">{modalDescription}</p>
                    )}
                    {modalLineup.length > 0 && (
                      <div className="mt-6">
<h3 className="text-xl font-bold text-[#00f0ff] mb-3 uppercase">{t.events.lineup}</h3>
                        <div className="flex flex-wrap gap-2">
                          {modalLineup.map((artist, index) => (
                            <span
                              key={`${artist}-${index}`}
                              className="px-4 py-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#e8e8e8] font-medium uppercase tracking-wide"
                            >
                              {formatLineupDisplayName(artist)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedEvent.ticket_link && (
                      <a
                        href={selectedEvent.ticket_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#00f0ff]/20 border-2 border-[#00f0ff] text-[#00f0ff] font-bold hover:bg-[#00f0ff]/30 transition-colors mt-6 uppercase tracking-wider"
                      >
{t.events.viewDetails}
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        );
      })()}
    </div>
  );
};

export default Events;
