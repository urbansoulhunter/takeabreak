import React from 'react';
import { FileText } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../contexts/useLanguage';
import SEO from '../components/SEO';

const TermsAndConditions: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      <SEO
        title={t.termsAndConditions.title}
        description={t.termsAndConditions.introduction}
        keywords="Take a Break, terms and conditions, website terms, GDPR, events"
        url="/terms-and-conditions"
      />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-[#00f0ff] neon-glow mb-6 uppercase tracking-tighter">
            {t.termsAndConditions.title}
          </h1>
          <div className="h-1 w-32 bg-[#00f0ff] mx-auto neon-glow"></div>
          <p className="text-[#a0a0a0] mt-6 text-sm">{t.termsAndConditions.lastUpdated}</p>
        </div>

        <div className="space-y-8">
          <ScrollReveal>
            <section className="holographic p-10 md:p-16">
              <div className="space-y-8 text-base md:text-lg text-[#a0a0a0] leading-relaxed">
                <p className="text-[#e8e8e8] font-medium text-lg">
                  {t.termsAndConditions.introduction}
                </p>

                <div className="space-y-8 pt-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#00f0ff] mb-4 uppercase tracking-wider">
                      {t.termsAndConditions.section1Title}
                    </h2>
                    <p>{t.termsAndConditions.section1Content}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#00f0ff] mb-4 uppercase tracking-wider">
                      {t.termsAndConditions.section2Title}
                    </h2>
                    <p>{t.termsAndConditions.section2Content}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#00f0ff] mb-4 uppercase tracking-wider">
                      {t.termsAndConditions.section3Title}
                    </h2>
                    <p>{t.termsAndConditions.section3Content}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#00f0ff] mb-4 uppercase tracking-wider">
                      {t.termsAndConditions.section4Title}
                    </h2>
                    <p>{t.termsAndConditions.section4Content}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#00f0ff] mb-4 uppercase tracking-wider">
                      {t.termsAndConditions.section5Title}
                    </h2>
                    <p>{t.termsAndConditions.section5Content}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#00f0ff] mb-4 uppercase tracking-wider">
                      {t.termsAndConditions.section6Title}
                    </h2>
                    <p>{t.termsAndConditions.section6Content}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#00f0ff] mb-4 uppercase tracking-wider">
                      {t.termsAndConditions.section7Title}
                    </h2>
                    <p>{t.termsAndConditions.section7Content}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#00f0ff] mb-4 uppercase tracking-wider">
                      {t.termsAndConditions.section8Title}
                    </h2>
                    <p>{t.termsAndConditions.section8Content}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#00f0ff] mb-4 uppercase tracking-wider">
                      {t.termsAndConditions.section9Title}
                    </h2>
                    <p>{t.termsAndConditions.section9Content}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#00f0ff] mb-4 uppercase tracking-wider">
                      {t.termsAndConditions.section10Title}
                    </h2>
                    <p>{t.termsAndConditions.section10Content}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#00f0ff] mb-4 uppercase tracking-wider">
                      {t.termsAndConditions.section11Title}
                    </h2>
                    <p>{t.termsAndConditions.section11Content}</p>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>

          <section className="holographic p-8 bg-[#00f0ff]/5 border-2 border-[#00f0ff]/30">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <FileText className="text-[#00f0ff]" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#e8e8e8] mb-2 uppercase tracking-wider">
                  Important Notice
                </h3>
                <p className="text-[#a0a0a0] leading-relaxed">
                  By using this website, you confirm that you have read, understood, and agreed to these Terms & Conditions.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
