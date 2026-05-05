import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/useLanguage';
import type { Database } from '../lib/database.types';
import type { Language } from '../lib/translations';
import { eventItalianField } from '../lib/eventI18nFallbacks';

type EventRow = Database['public']['Tables']['events']['Row'];

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

interface UpcomingEventsCarouselProps {
  /** Shown when there are no upcoming or sold-out events in the database. */
  fallbackFlyerUrl: string;
  fallbackAlt: string;
}

const AUTO_MS = 7500;
const SWIPE_MIN = 48;

const UpcomingEventsCarousel: React.FC<UpcomingEventsCarouselProps> = ({
  fallbackFlyerUrl,
  fallbackAlt,
}) => {
  const { t, language } = useLanguage();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [pauseAuto, setPauseAuto] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await supabase.rpc('update_past_events');
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });
        if (error) throw error;
        if (cancelled) return;
        const upcoming = (data || []).filter(
          (e) => e.status === 'upcoming' || e.status === 'sold_out',
        );
        setEvents(upcoming);
      } catch (e) {
        console.error('UpcomingEventsCarousel:', e);
        if (!cancelled) setEvents([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const dateLocale = language === 'it' ? 'it-IT' : 'en-GB';

  const formatWhen = useCallback(
    (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(dateLocale, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    [dateLocale],
  );

  const active = events[index];
  const imgSrc = active?.flyer_url || active?.image_url;

  useEffect(() => {
    const url = imgSrc || fallbackFlyerUrl;
    if (!url || url.startsWith('/')) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
    return () => {
      link.parentNode?.removeChild(link);
    };
  }, [imgSrc, fallbackFlyerUrl]);

  useEffect(() => {
    setIndex(0);
  }, [events.length]);

  useEffect(() => {
    if (events.length <= 1 || pauseAuto) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % events.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [events.length, pauseAuto]);

  const goPrev = useCallback(() => {
    if (events.length < 2) return;
    setIndex((i) => (i - 1 + events.length) % events.length);
  }, [events.length]);

  const goNext = useCallback(() => {
    if (events.length < 2) return;
    setIndex((i) => (i + 1) % events.length);
  }, [events.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || events.length < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [events.length, goPrev, goNext]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null || events.length < 2) return;
    const end = e.changedTouches[0].clientX;
    const d = end - start;
    if (d > SWIPE_MIN) goPrev();
    else if (d < -SWIPE_MIN) goNext();
  };

  if (loading) {
    return (
      <div className="relative inline-block w-full max-w-md md:max-w-lg mx-auto min-h-[280px] flex items-center justify-center">
        <div
          className="w-14 h-14 border-4 border-[#00f0ff]/30 border-t-[#00f0ff] rounded-full animate-spin"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="relative inline-block w-full max-w-md md:max-w-lg mx-auto">
        <div className="absolute inset-0 blur-3xl bg-[#00f0ff]/20 rounded-2xl scale-110" aria-hidden />
        <img
          src={fallbackFlyerUrl}
          alt={fallbackAlt}
          className="relative w-full h-auto rounded-lg border border-[#00f0ff]/40 shadow-[0_0_40px_rgba(0,240,255,0.25)]"
        />
        <p className="mt-4 text-sm text-[#a0a0a0] text-center">{t.events.noUpcoming}</p>
      </div>
    );
  }

  const displayTitle = active
    ? pickLocalized(language, active.title, eventItalianField(active, 'title_it'))
    : '';
  const displayVenue = active
    ? pickLocalized(language, active.venue, eventItalianField(active, 'venue_it'))
    : '';
  const displayLocation = active
    ? pickLocalized(language, active.location, eventItalianField(active, 'location_it'))
    : '';

  return (
    <div className="relative w-full max-w-md md:max-w-lg mx-auto">
      <p className="text-xs uppercase tracking-[0.2em] text-[#00f0ff]/80 mb-3 text-center font-semibold">
        {t.home.nextEventsTitle}
      </p>

      <div
        ref={containerRef}
        className="relative rounded-lg border border-[#00f0ff]/40 shadow-[0_0_40px_rgba(0,240,255,0.25)] overflow-hidden bg-[#121212]/80 outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
        role="region"
        aria-roledescription="carousel"
        aria-label={t.home.nextEventsTitle}
        tabIndex={0}
        onMouseEnter={() => setPauseAuto(true)}
        onMouseLeave={() => setPauseAuto(false)}
        onFocus={() => setPauseAuto(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setPauseAuto(false);
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute inset-0 blur-3xl bg-[#00f0ff]/15 rounded-2xl scale-110 pointer-events-none -z-10" aria-hidden />

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {events.map((event) => {
              const src = event.flyer_url || event.image_url;
              const title = pickLocalized(language, event.title, eventItalianField(event, 'title_it'));
              return (
                <div key={event.id} className="w-full flex-shrink-0">
                  {src ? (
                    <img
                      src={src}
                      alt={title}
                      className="w-full h-auto block"
                      loading={event.id === active?.id ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  ) : (
                    <div className="aspect-[3/4] flex items-center justify-center bg-[#1a1a1a] text-[#a0a0a0] px-6 text-center uppercase tracking-wide">
                      {title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {events.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded border border-[#00f0ff]/50 bg-black/70 text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-colors"
              aria-label={t.home.carouselPrev}
            >
              <ChevronLeft size={22} aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded border border-[#00f0ff]/50 bg-black/70 text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-colors"
              aria-label={t.home.carouselNext}
            >
              <ChevronRight size={22} aria-hidden />
            </button>
          </>
        )}
      </div>

      <div className="mt-4 space-y-3 text-center px-1">
        <h2 className="text-lg md:text-xl font-bold text-[#e8e8e8] uppercase tracking-wide leading-snug">
          {displayTitle}
        </h2>
        {active?.status === 'sold_out' && (
          <span className="inline-block px-2 py-1 text-xs font-bold bg-red-500/20 border border-red-500 text-red-400 uppercase">
            {t.events.soldOut}
          </span>
        )}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center text-sm text-[#a0a0a0]">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={16} className="text-[#00f0ff] shrink-0" aria-hidden />
            {active ? formatWhen(active.date) : ''}
          </span>
          <span className="inline-flex items-center gap-1.5 max-w-full">
            <MapPin size={16} className="text-[#00f0ff] shrink-0" aria-hidden />
            <span className="truncate">
              {displayVenue}
              {displayLocation ? ` · ${displayLocation}` : ''}
            </span>
          </span>
        </div>
        {active?.ticket_link && active.status !== 'sold_out' && (
          <a
            href={active.ticket_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-6 py-2 text-sm font-bold uppercase tracking-wider bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/30 transition-colors"
          >
            {t.events.viewDetails}
          </a>
        )}
        <div className="pt-2">
          <Link
            to="/events"
            className="text-sm text-[#00f0ff]/90 hover:text-[#00f0ff] underline underline-offset-4 font-medium uppercase tracking-wide"
          >
            {t.home.viewAllEvents}
          </Link>
        </div>
      </div>

      {events.length > 1 && (
        <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label={t.home.carouselDotsLabel}>
          {events.map((event, i) => (
            <button
              key={event.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${t.home.carouselGoToSlide} ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-[#00f0ff]' : 'w-2 bg-[#a0a0a0]/40 hover:bg-[#a0a0a0]/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEventsCarousel;
