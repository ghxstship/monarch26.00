'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

export default function AboutPage() {
  const stats = [
    { value: '52', label: 'Countries Traveled' },
    { value: '13+', label: 'Years Experience' },
    { value: '100+', label: 'Projects Delivered' },
  ];

  const partners = [
    'Red Bull',
    'Celebrity Cruise Line',
    'Insomniac',
    'Carnival Cruise Line',
    'PATRÓN',
    'Live Nation',
    'Formula 1',
    'Norwegian Cruise Line',
    'Heineken',
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="min-h-screen bg-black text-white flex items-center">
          <Container>
            <SlideUp>
              <Typography variant="hero" className="text-white mb-8" uppercase>
                Forged By Failure
              </Typography>
              <div className="max-w-4xl">
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed mb-6">
                  Every legend starts somewhere. This one started with a kid who could read sheet music before 
                  he could read maps—and ended up navigating experiences across 52 countries. This is how 
                  impossible became inevitable. Also how we learned that sleep is optional.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed">
                  Thirteen years operating at the intersection of hospitality, live entertainment, and experiential 
                  marketing taught us that the difference between epic and disaster is usually just better planning, 
                  a crew that&apos;s seen it before, and knowing which rules are suggestions.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <FadeIn key={stat.label} delay={index * 0.1}>
                  <div className="text-center border-2 border-black p-8">
                    <Typography variant="hero" className="mb-2">
                      {stat.value}
                    </Typography>
                    <Typography variant="h5" uppercase>
                      {stat.label}
                    </Typography>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* Captain Jay Sea Section */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-white mb-6">
                  Captain Jay Sea - CXO
                </Typography>
                <Typography variant="body" className="text-grey-400 text-lg leading-relaxed mb-6">
                  Founder. 13 years operating at the intersection of hospitality, live entertainment, and 
                  experiential marketing across 52 countries. Former F&B Operations Manager for Formula 1 
                  Las Vegas Grand Prix. Production experience with Insomniac, F1, PATRÓN, Heineken, and Red Bull.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-lg leading-relaxed">
                  Every challenging install taught something. Every impossible deadline revealed what&apos;s 
                  actually possible. Every 3 AM crisis call added another story we probably shouldn&apos;t tell clients. 
                  That accumulated knowledge became GHXSTSHIP. From classical musician to cruise director to festival 
                  producer to brand strategist to technical architect—every chapter built the next. Every lesson compounded. 
                  Every gray hair earned.
                </Typography>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* The Journey Framework */}
        <section className="py-24 bg-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h1" uppercase className="mb-4">
                  The Journey
                </Typography>
                <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto">
                  From classical concert halls to cruise ships to festival grounds to motorsport hospitality—every 
                  chapter taught lessons that became operational advantages. Also taught us that Murphy&apos;s Law is real 
                  and has excellent timing.
                </Typography>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'INDIANA UNIVERSITY', desc: 'Classical musician learning precision and adaptability under pressure' },
                { title: 'CARNIVAL CRUISE LINES', desc: 'Entertainment at scale—systems that work across floating cities' },
                { title: 'INSOMNIAC EVENTS', desc: 'Festival production mastery—50,000+ capacity venues and impossible logistics' },
                { title: 'F1 // PATRÓN // RED BULL', desc: 'Brand activations across 52 countries where excellence is mandatory' },
              ].map((item, index) => (
                <SlideUp key={item.title} delay={index * 0.1}>
                  <div className="border-2 border-black p-8">
                    <Typography variant="h3" uppercase className="mb-4">
                      {item.title}
                    </Typography>
                    <Typography variant="body" className="text-grey-700">
                      {item.desc}
                    </Typography>
                  </div>
                </SlideUp>
              ))}
            </div>
          </Container>
        </section>

        {/* Partners Section */}
        <section className="py-24 bg-black text-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h2" uppercase className="text-white mb-4">
                  We&apos;ve Navigated With
                </Typography>
                <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto">
                  Production experience with brands that demand operational excellence and zero margin for error. 
                  We delivered. They came back. That&apos;s the whole pitch.
                </Typography>
              </div>
            </FadeIn>
            <div className="flex flex-wrap justify-center gap-12">
              {partners.map((partner, index) => (
                <FadeIn key={partner} delay={index * 0.1}>
                  <Typography variant="h3" uppercase className="text-white">
                    {partner}
                  </Typography>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
