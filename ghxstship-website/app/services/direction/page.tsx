'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

export default function DirectionPage() {
  const capabilities = [
    'Operations Management',
    'Logistics Coordination',
    'On-site Execution',
    'Talent Management',
    'Safety Protocols',
    'Real-time Problem Solving',
    'Crew Management',
    'Timeline Management',
  ];

  const process = [
    { step: '01', title: 'Pre-Production', desc: 'Detailed planning and logistics coordination' },
    { step: '02', title: 'Load-In', desc: 'Coordinated installation and setup' },
    { step: '03', title: 'Execution', desc: 'Flawless event operations and management' },
    { step: '04', title: 'Strike', desc: 'Efficient teardown and site restoration' },
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="min-h-screen bg-black text-white flex items-center">
          <Container>
            <SlideUp>
              <Typography variant="hero" className="text-white mb-6" uppercase>
                Direction
              </Typography>
              <Typography variant="h2" uppercase className="text-grey-400 mb-8">
                Operations & Execution
              </Typography>
              <div className="max-w-4xl">
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed">
                  Precision operations across continents. We orchestrate chaos into perfection, managing 
                  every detail from load-in to strike. Our operations teams have executed projects in the 
                  world&apos;s most challenging environments, delivering flawless experiences under any conditions.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        <section className="py-24 bg-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h2" uppercase className="mb-4">
                  Operations Capabilities
                </Typography>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {capabilities.map((capability, index) => (
                <FadeIn key={capability} delay={index * 0.05}>
                  <div className="border-2 border-black p-6 text-center hover:bg-black hover:text-white transition-all">
                    <Typography variant="h6" uppercase>
                      {capability}
                    </Typography>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-24 bg-black text-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h2" uppercase className="text-white mb-4">
                  Execution Process
                </Typography>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <SlideUp key={item.step} delay={index * 0.1}>
                  <div className="border-2 border-white p-8">
                    <Typography variant="hero" className="text-white mb-4">
                      {item.step}
                    </Typography>
                    <Typography variant="h4" uppercase className="text-white mb-4">
                      {item.title}
                    </Typography>
                    <Typography variant="body" className="text-grey-400">
                      {item.desc}
                    </Typography>
                  </div>
                </SlideUp>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-24 bg-white">
          <Container maxWidth="lg">
            <SlideUp>
              <Typography variant="h2" uppercase className="mb-8 text-center">
                Operational Excellence
              </Typography>
              <div className="space-y-6 max-w-3xl mx-auto">
                <Typography variant="body" className="text-lg leading-relaxed text-grey-700">
                  Our operations teams are the backbone of every successful project. With experience 
                  managing events from intimate gatherings to festivals with 100,000+ attendees, we bring 
                  unmatched expertise to every execution.
                </Typography>
                <Typography variant="body" className="text-lg leading-relaxed text-grey-700">
                  We pride ourselves on our ability to adapt in real-time, solving problems before they 
                  become issues and ensuring that every experience runs flawlessly from start to finish.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        <section className="py-24 bg-black text-white">
          <Container>
            <div className="text-center">
              <Typography variant="h1" uppercase className="text-white mb-6">
                Execute with Precision
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-8">
                Let&apos;s orchestrate your next impossible experience.
              </Typography>
              <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                Start Your Project
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
