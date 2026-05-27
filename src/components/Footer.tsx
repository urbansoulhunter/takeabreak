import React from 'react';
import { Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] border-t border-[#00f0ff]/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-[#00f0ff] neon-glow mb-4">TAKE A BREAK</h3>
            <p className="text-[#a0a0a0] text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <div>
<h4 className="text-sm font-bold text-[#e8e8e8] tracking-wider mb-4">{t.footer.followUs.toUpperCase()}</h4>
            <a
              href="https://instagram.com/takeabreaksets"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-[#00f0ff] transition-colors"
            >
              <Instagram size={20} />
              <span>@takeabreaksets</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-[#00f0ff]/10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-[#a0a0a0] text-sm">
              © {currentYear} TAKE A BREAK. {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
