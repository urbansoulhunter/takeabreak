import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/events', label: t.nav.events },
    { path: '/lineup', label: t.nav.djRoster },
    { path: '/about', label: t.nav.about },
    { path: '/contact', label: t.nav.contact },
    { path: '/join-team', label: t.nav.joinTeam },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'it' : 'en');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-[#00f0ff]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="text-xl font-bold tracking-wider text-[#00f0ff] neon-glow group-hover:scale-105 transition-transform">
              TAKE A BREAK
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 relative group ${
                  isActive(link.path)
                    ? 'text-[#00f0ff]'
                    : 'text-[#a0a0a0] hover:text-[#00f0ff]'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00f0ff] neon-glow"></span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00f0ff] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="ml-2 px-3 py-2 text-sm font-medium tracking-wider transition-all duration-300 text-[#a0a0a0] hover:text-[#00f0ff] flex items-center gap-2"
            >
              <Globe size={16} />
              {language.toUpperCase()}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#00f0ff] hover:bg-[#00f0ff]/10 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#252525]/95 backdrop-blur-md border-t border-[#00f0ff]/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-base font-medium tracking-wider transition-all ${
                  isActive(link.path)
                    ? 'text-[#00f0ff] bg-[#00f0ff]/10 neon-border-subtle'
                    : 'text-[#a0a0a0] hover:text-[#00f0ff] hover:bg-[#00f0ff]/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="w-full text-left px-4 py-3 text-base font-medium tracking-wider text-[#a0a0a0] hover:text-[#00f0ff] hover:bg-[#00f0ff]/5 flex items-center gap-2 transition-all"
            >
              <Globe size={18} />
              {language.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
