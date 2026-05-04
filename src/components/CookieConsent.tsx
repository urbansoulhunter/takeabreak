import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-6xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00f0ff] to-[#0080ff] rounded-xl flex items-center justify-center">
                <Cookie className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t.cookies.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.cookies.description}
                </p>
                <a
                  href="/terms-and-conditions"
                  className="text-sm text-[#00f0ff] hover:underline mt-2 inline-block"
                >
                  {t.cookies.learnMore}
                </a>
              </div>
            </div>

            <button
              onClick={handleDecline}
              className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-initial px-8 py-3 bg-gradient-to-r from-[#00f0ff] to-[#0080ff] text-white rounded-xl font-semibold hover:from-[#00d0dd] hover:to-[#0070dd] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {t.cookies.accept}
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-initial px-8 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {t.cookies.decline}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
