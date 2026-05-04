import React from 'react';
import { Instagram, Youtube, Music } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      <SEO
        title="Contatti"
        description="Entra in contatto con Take a Break. Seguici sui social media, ascolta i nostri mix su SoundCloud e resta aggiornato su tutti i nostri eventi e novità."
        keywords="contatti Take a Break, social media bass music, Instagram eventi, SoundCloud DJ mix"
        url="/contact"
      />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-[#00f0ff] neon-glow mb-4 uppercase tracking-tighter">
            {t.contact.title}
          </h1>
          <p className="text-xl text-[#a0a0a0] tracking-wide">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="holographic p-8 text-center">
            <h2 className="text-2xl font-bold text-[#e8e8e8] mb-6 uppercase tracking-wide">
              {t.contact.followUs}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://instagram.com/takeabreakset"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#00f0ff]/20 border-2 border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/30 transition-all duration-300 text-base font-bold uppercase tracking-wider"
              >
                <Instagram size={20} />
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@Takeabreaksets"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#ff0000]/20 border-2 border-[#ff0000] text-[#ff0000] hover:bg-[#ff0000]/30 transition-all duration-300 text-base font-bold uppercase tracking-wider"
              >
                <Youtube size={20} />
                YouTube
              </a>
              <a
                href="https://www.mixcloud.com/takeabreaksets/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#ff6b35]/20 border-2 border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35]/30 transition-all duration-300 text-base font-bold uppercase tracking-wider"
              >
                <Music size={20} />
                Mixcloud
              </a>
            </div>
          </div>

          <div className="holographic p-8">

            <div className="holographic p-8">
              <h3 className="text-xl font-bold text-[#e8e8e8] mb-4 uppercase tracking-wide">
                {t.about.title}
              </h3>
              <p className="text-[#a0a0a0] leading-relaxed mb-4">
                {t.contact.stayConnected}
              </p>
              <ul className="space-y-2 text-[#a0a0a0]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00f0ff] mt-1">▸</span>
                  <span>{t.contact.curatedLineups}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00f0ff] mt-1">▸</span>
                  <span>{t.contact.professionalSound}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00f0ff] mt-1">▸</span>
                  <span>{t.contact.dedicatedFanbase}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00f0ff] mt-1">▸</span>
                  <span>{t.contact.fullManagement}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
