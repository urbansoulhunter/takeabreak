/*
  # Add Italian Bios for Artists

  1. Changes
    - Add `bio_it` column to artists table for Italian translations
    - Populate Italian translations for existing artists

  2. Notes
    - "Take a Break" and "break" are kept in English as requested
    - All other content is translated to Italian
*/

-- Add Italian bio column
ALTER TABLE artists ADD COLUMN IF NOT EXISTS bio_it TEXT;

-- Update Italian bios for all artists
UPDATE artists SET bio_it = 'Moostatz è un DJ e produttore di drum and bass di Terralba (Oristano), parte della scena underground sarda. Con un sound liquid e soulful, canalizza emozione e energia nella sua musica. Le sue uscite su Samsara Beats e Obl/que sono disponibili su tutte le principali piattaforme di streaming.'
WHERE name = 'Moostatz';

UPDATE artists SET bio_it = 'Difficile non lasciarsi travolgere dall''energia di una traccia Drum and Bass: veloce, audace, alternativa. Un genere che mi rappresenta e che ho scelto di produrre e pubblicare con OX Recordings. Un universo di tracce che, da quasi un decennio, suono nei DJ set in festival e locali dell''isola, condividendo passione ed emozione.'
WHERE name = 'Pipu';

UPDATE artists SET bio_it = 'Lee Kerry è un DJ sardo di Drum & Bass guidato da una profonda passione per il genere. Con anni di esperienza dietro i piatti, la sua missione è offrire momenti indimenticabili, fondendo energia, precisione ed emozione in ogni set. Come fondatore e membro della crew "Drive My Thr!ll", è impegnato a promuovere la cultura DnB e unire tutti coloro che condividono il suo amore per questo suono potente e in continua evoluzione.'
WHERE name = 'Lee Kerry';

UPDATE artists SET bio_it = 'Misura (aka Mario Conteddu) è immerso nella musica dal 1992. Ha iniziato il suo viaggio da adolescente in Sardegna, Italia, suonando pianoforte e tastiere in band rock prima di tuffarsi nella scena hip hop locale a metà degli anni ''90—producendo beat e scratching per crew rap.

La sua passione per l''hip hop ha scatenato un fascino per il campionamento, il DJing e i sintetizzatori. A 16 anni ha comprato il suo primo sampler—un Roland S-50—che ha acceso la sua esplorazione permanente della produzione musicale elettronica.

Nel corso degli anni, Misura ha affinato le sue abilità con macchine e software, esibendosi in club e rave in tutta Italia. Nel 2004 si è trasferito a Londra per elevare il suo mestiere e ha studiato Informatica Musicale all''Università di Westminster. Ha poi prodotto e remixato per etichette tra cui Worldwide Exclusive Records (USA), Tall House Digital (UK) ed Embi Music (Francoforte), mentre suonava in locali di fama mondiale come Ministry of Sound, Egg e Rhythm Factory.

Ora Misura sta canalizzando la sua energia creativa nella Drum and Bass—un genere che fonde il suo amore per il ritmo, la complessità e l''emozione grezza. Con radici profonde nella musica underground e una mentalità proiettata al futuro, questo nuovo capitolo riflette sia la sua evoluzione che il suo impegno a spingere i confini.'
WHERE name = 'Misura';