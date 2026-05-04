import React from 'react';
import { Zap, Users, Radio, Target } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      <SEO
        title="Chi Siamo"
        description="La storia di Take a Break. Un movimento dedicato alla bass music e alla cultura underground. Scopri la nostra missione, i nostri valori e i partner che rendono possibile tutto questo."
        keywords="Take a Break storia, bass music Sardegna, cultura underground, eventi musica elettronica"
        url="/about"
      />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-[#00f0ff] neon-glow mb-6 uppercase tracking-tighter">
            {t.about.title}
          </h1>
          <div className="h-1 w-32 bg-[#00f0ff] mx-auto neon-glow"></div>
        </div>

        <div className="space-y-16">
          <ScrollReveal>
            <section className="holographic p-10 md:p-16">
            <div className="space-y-6 text-lg text-[#a0a0a0] leading-relaxed">
              <p>
                {t.about.storyIntro}
              </p>
              <p>
                {t.about.storyPause1}<br />
                <span className="text-[#00f0ff]">{t.about.storyPause2}</span><br />
                <span className="text-[#00f0ff]">{t.about.storyPause3}</span>
              </p>
              <p>
                {t.about.storyDiscovery}
              </p>
              <p>
                {t.about.storyExpansion}
              </p>
              <p className="text-[#e8e8e8] font-medium text-xl">
                {t.about.storyGoal}<br />
                {t.about.storyGoalText}
              </p>
              <p className="text-[#00f0ff] font-medium text-xl italic">
                {t.about.storyTagline}
              </p>
            </div>
          </section>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="holographic p-8 group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30">
                <Zap className="text-[#00f0ff]" size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#e8e8e8] mb-3 uppercase tracking-wider">
                {t.about.authentic}
              </h3>
              <p className="text-[#a0a0a0] leading-relaxed">
                {t.about.authenticText}
              </p>
            </div>

            <div className="holographic p-8 group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30">
                <Users className="text-[#00f0ff]" size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#e8e8e8] mb-3 uppercase tracking-wider">
                {t.about.community}
              </h3>
              <p className="text-[#a0a0a0] leading-relaxed">
                {t.about.communityText}
              </p>
            </div>

            <div className="holographic p-8 group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30">
                <Radio className="text-[#00f0ff]" size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#e8e8e8] mb-3 uppercase tracking-wider">
                {t.about.quality}
              </h3>
              <p className="text-[#a0a0a0] leading-relaxed">
                {t.about.qualityText}
              </p>
            </div>

            <div className="holographic p-8 group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30">
                <Target className="text-[#00f0ff]" size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#e8e8e8] mb-3 uppercase tracking-wider">
                {t.about.diverse}
              </h3>
              <p className="text-[#a0a0a0] leading-relaxed">
                {t.about.diverseText}
              </p>
            </div>
          </div>

          <ScrollReveal>
            <section className="holographic p-10 md:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#00f0ff] mb-4 uppercase tracking-wider text-center">
                {t.about.partners}
              </h2>
              <p className="text-lg text-[#a0a0a0] mb-12 text-center max-w-2xl mx-auto">
                {t.about.partnersText}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                <div className="w-32 h-32 flex items-center justify-center p-4 rounded-lg hover:scale-110 transition-all duration-300">
                  <img src="/22376.png" alt="Jungle Planet Radio" className="w-full h-full object-contain" />
                </div>
                <div className="w-32 h-32 flex items-center justify-center p-4 rounded-lg hover:scale-110 transition-all duration-300">
                  <img src="/vdsafvlogo@1.5x copy.png" alt="Partner" className="w-full h-full object-contain" />
                </div>
                <div className="w-[141px] h-[141px] flex items-center justify-center p-4 rounded-lg hover:scale-110 transition-all duration-300">
                  <img src="/logo_lost_souls-removebg-preview.png" alt="Lost Souls" className="w-full h-full object-contain" />
                </div>
                <div className="w-[141px] h-[141px] flex items-center justify-center p-4 rounded-lg hover:scale-110 transition-all duration-300">
                  <img src="/white_dnbit_suppot_full_logo_nobg.png" alt="DNB IT Support" className="w-full h-full object-contain" />
                </div>
              </div>
            </section>
          </ScrollReveal>

          <section className="text-center py-12">
            <h2 className="text-2xl font-bold text-[#e8e8e8] mb-6 uppercase tracking-wide">
              {t.home.joinMovement}
            </h2>
            <p className="text-lg text-[#a0a0a0] mb-8 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-[#00f0ff]/20 border-2 border-[#00f0ff] text-[#00f0ff] font-bold tracking-wider hover:bg-[#00f0ff]/30 transition-all duration-300 uppercase"
            >
              {t.contact.title}
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
