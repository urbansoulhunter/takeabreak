import React from 'react';
import { Video, Instagram, Camera, Film, Users, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const JoinTeam: React.FC = () => {
  const roles = [
    {
      icon: Video,
      title: 'Video / FX Editor',
      description: 'Ti occuperai di montaggio creativo, effetti visivi e storytelling. Cerchiamo qualcuno che sappia trasformare suono ed energia in immagini, con libertà creativa e voglia di sperimentare.'
    },
    {
      icon: Instagram,
      title: 'Social Media Manager',
      description: 'Ti occuperai della gestione dei canali social e della comunicazione online. Cerchiamo qualcuno che capisca il linguaggio della scena e sappia far crescere la community, non solo pubblicare contenuti.'
    },
    {
      icon: Camera,
      title: 'Fotografo',
      description: 'Ti occuperai di raccontare eventi, atmosfere e momenti reali. Cerchiamo uno sguardo capace di cogliere l\'energia, non solo lo scatto perfetto.'
    },
    {
      icon: Film,
      title: 'Videomaker',
      description: 'Ti occuperai delle riprese durante eventi e live. Cerchiamo qualcuno a suo agio nei contesti reali, capace di muoversi, osservare e raccontare.'
    },
    {
      icon: Users,
      title: 'PR (Zona Olbia e Cagliari)',
      description: 'Ti occuperai di supportare la crescita del progetto sul territorio. Cerchiamo qualcuno che conosca la scena locale e abbia voglia di creare connessioni reali.'
    }
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      <SEO
        title="Entra nel Team"
        description="Unisciti a Take a Break, un collettivo Drum & Bass indipendente. Cerchiamo persone appassionate che vogliano contribuire a costruire una community autentica."
        keywords="Take a Break team, unisciti a noi, Drum & Bass collettivo, video editor, social media manager, fotografo, videomaker, PR"
        url="/join-team"
      />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-[#00f0ff] neon-glow mb-6 uppercase tracking-tighter">
            Far parte di Take a Break
          </h1>
          <div className="h-1 w-32 bg-[#00f0ff] mx-auto neon-glow"></div>
        </div>

        <div className="space-y-16">
          <ScrollReveal>
            <section className="holographic p-10 md:p-16">
              <div className="space-y-6 text-lg text-[#a0a0a0] leading-relaxed">
                <p className="text-[#e8e8e8] text-xl font-medium">
                  Take a Break è un collettivo Drum & Bass indipendente.<br />
                  Nasce dalla passione per la musica, gli eventi e la cultura che gira intorno alla D&B e alla Jungle.
                </p>
                <p>
                  Non è un'azienda, non è un'agenzia e non è un progetto costruito per "fare numeri".
                </p>
                <p className="text-[#00f0ff] font-medium">
                  È uno spazio in cui la musica diventa esperienza, connessione e comunità.<br />
                  Questa pagina è per chi vuole farne parte, non solo guardarla da fuori.
                </p>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="holographic p-10 md:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#00f0ff] mb-6 uppercase tracking-wider">
                Che tipo di coinvolgimento cerchiamo
              </h2>
              <div className="space-y-4 text-lg text-[#a0a0a0] leading-relaxed">
                <p>
                  Stiamo costruendo una community prima ancora che un progetto.
                </p>
                <p className="font-medium text-[#e8e8e8]">Il coinvolgimento che cerchiamo è:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>continuativo, nei limiti del tempo che ognuno ha</li>
                  <li>flessibile e compatibile con lavoro, studio o altri progetti</li>
                  <li>basato sulla voglia di contribuire e crescere insieme</li>
                </ul>
                <p className="text-[#00f0ff] italic">
                  Non cerchiamo collaborazioni spot o task isolati.<br />
                  Cerchiamo persone che sentano Take a Break anche un po' loro.
                </p>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="holographic p-10 md:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#00f0ff] mb-6 uppercase tracking-wider">
                Ruolo attivo, non solo fare cose
              </h2>
              <div className="space-y-4 text-lg text-[#a0a0a0] leading-relaxed">
                <p className="font-medium text-[#e8e8e8]">Entrare nel team significa:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>contribuire concretamente allo sviluppo del progetto</li>
                  <li>portare idee, non solo eseguire</li>
                  <li>essere parte della promozione del collettivo</li>
                  <li>collaborare con altre persone che condividono la stessa visione</li>
                </ul>
                <p>
                  Il progetto ha una direzione chiara e una guida che ne cura la continuità nel tempo,
                  ma il lavoro nasce dal confronto e non esistono gerarchie rigide.<br />
                  <span className="text-[#e8e8e8] font-medium">Ogni contributo conta.</span>
                </p>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="holographic p-10 md:p-16 border-2 border-[#00f0ff]/30">
              <h2 className="text-3xl md:text-4xl font-bold text-[#00f0ff] mb-6 uppercase tracking-wider">
                Trasparenza sui compensi
              </h2>
              <div className="space-y-4 text-lg text-[#a0a0a0] leading-relaxed">
                <p className="text-[#e8e8e8] font-medium">
                  Vogliamo essere chiari fin da subito.
                </p>
                <p>Al momento:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>non c'è un budget fisso garantito</li>
                  <li>molti eventi nascono e crescono grazie alla passione delle persone coinvolte</li>
                </ul>
                <p>
                  Quando ci sono compensi, prima vengono coperte le spese e quello che resta viene condiviso con il team.
                </p>
                <p className="text-[#e8e8e8] font-medium italic">
                  Nessuna promessa irrealistica, solo trasparenza.
                </p>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00f0ff] mb-8 uppercase tracking-wider text-center">
                Le figure che stiamo cercando
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map((role, index) => (
                  <div key={index} className="holographic p-8 group hover:scale-105 transition-transform duration-300">
                    <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30">
                      <role.icon className="text-[#00f0ff]" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-[#e8e8e8] mb-3 uppercase tracking-wider">
                      {role.title}
                    </h3>
                    <p className="text-[#a0a0a0] leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal>
              <section className="holographic p-10">
                <h2 className="text-2xl font-bold text-[#00f0ff] mb-4 uppercase tracking-wider">
                  Un po' di chiarezza sul tempo
                </h2>
                <div className="space-y-4 text-lg text-[#a0a0a0] leading-relaxed">
                  <p>
                    Non chiediamo una disponibilità rigida.<br />
                    Ognuno contribuisce in base al proprio tempo e alle proprie possibilità.
                  </p>
                  <p>
                    La maggior parte degli eventi viene pianificata con largo anticipo, anche fino a 3–4 mesi prima.
                    Questo permette a tutti di organizzarsi con calma, rispettare le scadenze e lavorare in modo sostenibile.
                  </p>
                  <p className="text-[#e8e8e8] font-medium">
                    L'importante è esserci in modo costante, anche a piccoli passi.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section className="holographic p-10">
                <h2 className="text-2xl font-bold text-[#00f0ff] mb-4 uppercase tracking-wider">
                  Come lavoriamo insieme
                </h2>
                <div className="space-y-4 text-lg text-[#a0a0a0] leading-relaxed">
                  <p>
                    Ci organizziamo in modo informale ma consapevole.<br />
                    Ci sentiamo online, condividiamo idee, prendiamo decisioni insieme e ci adattiamo ai momenti.
                  </p>
                  <p>
                    C'è una visione che tiene il progetto coerente nel tempo,
                    ma lo spazio per contribuire e proporre è sempre aperto.
                  </p>
                </div>
              </section>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal>
              <section className="holographic p-10 border-2 border-green-500/30">
                <h2 className="text-2xl font-bold text-green-400 mb-4 uppercase tracking-wider">
                  È il posto giusto per te se…
                </h2>
                <ul className="space-y-3 text-lg text-[#a0a0a0]">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>ami davvero la Drum & Bass</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>ti piace lavorare in modo collaborativo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>vuoi costruire qualcosa con altre persone</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>non cerchi risultati immediati</span>
                  </li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section className="holographic p-10 border-2 border-red-500/30">
                <h2 className="text-2xl font-bold text-red-400 mb-4 uppercase tracking-wider">
                  Non è il posto giusto se…
                </h2>
                <ul className="space-y-3 text-lg text-[#a0a0a0]">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✗</span>
                    <span>cerchi un compenso fisso</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✗</span>
                    <span>vuoi solo visibilità personale</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✗</span>
                    <span>non hai tempo o continuità</span>
                  </li>
                </ul>
                <p className="mt-6 text-[#e8e8e8] italic">
                  Meglio essere chiari fin dall'inizio.
                </p>
              </section>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <section className="holographic p-10 md:p-16 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-[#00f0ff]/10 border-2 border-[#00f0ff]/50 mx-auto">
                <MessageCircle className="text-[#00f0ff]" size={40} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00f0ff] mb-6 uppercase tracking-wider">
                Come entrare nel team
              </h2>
              <div className="space-y-6 text-lg text-[#a0a0a0] leading-relaxed max-w-2xl mx-auto">
                <p>
                  Scrivici in DM o tramite il form.<br />
                  Facciamo due chiacchiere, senza pressioni.<br />
                  Se c'è sintonia, lo capiamo subito.
                </p>
                <p className="text-[#00f0ff] text-xl font-medium italic">
                  Take a Break è prima di tutto persone.<br />
                  Se leggendo questa pagina ti sei riconosciuto, probabilmente sei già più vicino di quanto pensi.
                </p>
              </div>
              <div className="mt-10">
                <a
                  href="/contact"
                  className="inline-block px-10 py-4 bg-[#00f0ff]/20 border-2 border-[#00f0ff] text-[#00f0ff] font-bold tracking-wider hover:bg-[#00f0ff]/30 transition-all duration-300 uppercase text-lg"
                >
                  Contattaci
                </a>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;
