import React from 'react';
import { FileText } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SEO from '../components/SEO';

const Terms: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      <SEO
        title="Live Streaming Terms"
        description="Terms and conditions for Take a Break live streaming events. Registration, attendance, recording consent, and participant responsibilities."
        keywords="Take a Break, live stream terms, drum and bass, event registration"
        url="/terms"
      />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-[#00f0ff] neon-glow mb-6 uppercase tracking-tighter">
            Live Streaming Terms & Conditions
          </h1>
          <div className="h-1 w-32 bg-[#00f0ff] mx-auto neon-glow"></div>
        </div>

        <div className="space-y-8">
          <ScrollReveal>
            <section className="holographic p-10 md:p-16">
              <div className="space-y-8 text-base md:text-lg text-[#a0a0a0] leading-relaxed">
                <p className="text-[#e8e8e8] font-medium text-lg">
                  By registering for, accessing, or attending this live streaming event, you acknowledge and agree to the following:
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-[#00f0ff] rounded-full"></div>
                    </div>
                    <p>
                      The event is live-streamed and audio-visually recorded in real time.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-[#00f0ff] rounded-full"></div>
                    </div>
                    <p>
                      Your presence at the venue constitutes explicit consent to being filmed, recorded, and included in the live broadcast.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-[#00f0ff] rounded-full"></div>
                    </div>
                    <div>
                      <p className="mb-3">
                        You grant the organisers a non-exclusive, royalty-free, perpetual, worldwide licence to record, reproduce, distribute, broadcast, and otherwise use your image, voice, name, and likeness in connection with:
                      </p>
                      <ul className="space-y-2 pl-6">
                        <li className="flex items-center gap-2">
                          <span className="text-[#00f0ff]">→</span>
                          <span>Live streaming</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#00f0ff]">→</span>
                          <span>Recorded broadcasts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#00f0ff]">→</span>
                          <span>Promotional materials</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#00f0ff]">→</span>
                          <span>Archival content</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-[#00f0ff] rounded-full"></div>
                    </div>
                    <p>
                      No compensation, approval rights, or claims may be made in relation to such use.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-[#00f0ff] rounded-full"></div>
                    </div>
                    <p>
                      Personal mobile device usage is permitted, provided it does not interfere with the live broadcast, artists, or other attendees.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-[#00f0ff] rounded-full"></div>
                    </div>
                    <p>
                      Attendees who choose to share content from the event on social media are invited to use the hashtag <span className="text-[#00f0ff] font-medium">#takeabreaksets</span>.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-[#00f0ff] rounded-full"></div>
                    </div>
                    <p>
                      Unauthorised professional recording, live rebroadcasting, or commercial use of the stream or event content is strictly prohibited.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-[#00f0ff] rounded-full"></div>
                    </div>
                    <p>
                      The live stream may be subject to technical interruptions, delays, or changes beyond the organisers' control. No guarantees are made regarding stream availability or quality.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-[#00f0ff] rounded-full"></div>
                    </div>
                    <p>
                      The organisers reserve the right to restrict or prohibit mobile usage if it disrupts the event or streaming process.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-[#00f0ff] rounded-full"></div>
                    </div>
                    <p>
                      These Terms are governed by the laws of England and Wales.
                    </p>
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
                  By attending this event, you confirm that you have read, understood, and agreed to these Live Streaming Terms & Conditions.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
