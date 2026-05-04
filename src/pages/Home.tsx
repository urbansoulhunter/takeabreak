import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/useLanguage';
import SEO from '../components/SEO';
import { getDefaultOgImageUrl, getSiteUrl } from '../lib/siteUrl';

const OLBIA_FLYER_URL = 'https://iili.io/BQBvybI.md.jpg';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const siteUrl = getSiteUrl();
  const brandImage = getDefaultOgImageUrl();

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = OLBIA_FLYER_URL;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Take a Break",
    "description": "Beyond The Beat, Always. Premium eventi di drum & bass e UK garage in Sardegna",
    "url": siteUrl,
    "logo": brandImage,
    "sameAs": [
      "https://www.instagram.com/takeabreak.events",
      "https://www.instagram.com/takeabreakset",
      "https://www.mixcloud.com/takeabreaksets/",
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "La Caletta, Siniscola",
      "addressRegion": "Sardegna",
      "addressCountry": "IT"
    }
  };

  return (
    <div className="relative min-h-screen">
      <SEO
        title="Beyond The Beat, Always"
        description="Take a Break - Eventi premium di drum & bass e UK garage in Sardegna. Esperienza musicale unica con i migliori artisti internazionali della scena bass music."
        keywords="drum and bass, UK garage, eventi musicali, bass music, La Caletta, Siniscola, Sardegna, Italia, musica elettronica, underground music"
        url="/"
        type="website"
        schemaData={organizationSchema}
      />
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12">
        <div className="relative z-20 text-center px-4 sm:px-6 w-full max-w-3xl mx-auto">
          <div className="mb-10">
            <div className="relative inline-block w-full max-w-md md:max-w-lg mx-auto">
              <div className="absolute inset-0 blur-3xl bg-[#00f0ff]/20 rounded-2xl scale-110" aria-hidden />
              <img
                src={OLBIA_FLYER_URL}
                alt="Drum & Bass Night — Take a Break, Olbia"
                className="relative w-full h-auto rounded-lg border border-[#00f0ff]/40 shadow-[0_0_40px_rgba(0,240,255,0.25)]"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#00f0ff] neon-glow mb-12 uppercase tracking-tighter">
            Beyond The Beat, Always
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/events"
              className="px-8 py-4 bg-[#00f0ff] text-[#1a1a1a] font-bold tracking-wider hover:bg-[#00f0ff]/90 transition-all duration-300 uppercase"
            >
              {t.home.viewEvents || 'View Events'}
            </Link>
            <Link
              to="/lineup"
              className="px-8 py-4 border-2 border-[#00f0ff] text-[#00f0ff] font-bold tracking-wider hover:bg-[#00f0ff]/10 transition-all duration-300 uppercase"
            >
              {t.home.viewLineup || 'View Lineup'}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 bg-[#252525]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#e8e8e8] uppercase tracking-wider">
            {t.home.joinMovement}
          </h2>
          <p className="text-lg text-[#a0a0a0] mb-12 leading-relaxed">
            {t.home.joinDescription}
          </p>
          <Link
            to="/about"
            className="inline-block px-8 py-4 border-2 border-[#00f0ff] text-[#00f0ff] font-bold tracking-wider hover:bg-[#00f0ff]/10 transition-all duration-300 uppercase"
          >
            {t.home.learnMore}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
