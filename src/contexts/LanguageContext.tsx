import React, { useState, useEffect } from 'react';
import { translations, Language } from '../lib/translations';
import { LanguageContext } from './LanguageContextCore';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'it' || saved === 'en') {
      return saved;
    }

    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const isItaly = userTimezone === 'Europe/Rome';
      return isItaly ? 'it' : 'en';
    } catch {
      return 'it';
    }
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
