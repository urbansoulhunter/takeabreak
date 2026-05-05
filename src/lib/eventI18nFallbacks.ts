import type { Database } from './database.types';

type EventRow = Database['public']['Tables']['events']['Row'];

/**
 * Italian copy when DB `*_it` columns are missing or empty (e.g. migrations not applied yet).
 * DB values always win when present.
 */
export const EVENT_I18N_BY_FLYER: Record<
  string,
  Partial<Pick<EventRow, 'title_it' | 'description_it' | 'venue_it' | 'location_it'>>
> = {
  'https://iili.io/BQBvybI.md.jpg': {
    title_it: 'Serata Drum & Bass',
    description_it:
      'Ingresso gratuito. Inquadra il QR code sul flyer per registrarti — merch in omaggio.',
  },
  'https://iili.io/BQC2mYJ.md.jpg': {
    title_it: 'Bonnot + General Levy — Londra',
    description_it:
      'Bass One Union presenta Bonnot con ospite speciale General Levy. Venerdì 15 maggio 2026, 21:00–04:00. 18+ | Senza documento non si entra | Ultimo ingresso 2:00 | Vietati copricapo e tuta | Solo bar card. Biglietti dal QR sul flyer.',
  },
  'https://iili.io/BQUIrhl.md.jpg': {
    title_it: 'Take a Break — Drum & Bass (Londra)',
    description_it:
      'Drum & bass al Groove Tank Live. Sabato 9 maggio 2026, 19:00–00:00 (UK). Ingresso £5; offerta biglietto gratuito — posti limitati, registrazione obbligatoria (QR sul flyer). Live su YouTube. Con Jungle Planet Radio, Take a Break e Lost Souls.',
    venue_it: 'Groove Tank Live',
    location_it: 'Unit 67, Containerville Studios, 40 The Oval, London E2 9DT, Regno Unito',
  },
};

export function eventItalianField(
  event: EventRow,
  field: 'title_it' | 'description_it' | 'venue_it' | 'location_it',
): string | null | undefined {
  const fromDb = event[field];
  if (fromDb != null && typeof fromDb === 'string' && fromDb.trim() !== '') {
    return fromDb;
  }
  const key = event.flyer_url || event.image_url || '';
  if (!key) return undefined;
  const pack = EVENT_I18N_BY_FLYER[key];
  if (!pack) return undefined;
  return pack[field];
}
