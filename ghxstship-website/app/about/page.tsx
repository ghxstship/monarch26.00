'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

export default function AboutPage() {
  const stats = [
    { value: '52+', label: 'Countries' },
    { value: '13+', label: 'Years Experience' },
    { value: '100+', label: 'Projects Delivered' },
    { value: '4', label: 'Core Verticals' },
  ];

  const partners = [
    'Formula 1',
    'Insomniac',
    'PATRÓN',
    'Heineken',
    'Red Bull',
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
                The Story
              </Typography>
              <div className="max-w-4xl">
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed mb-6">
                  Founded in December 2022 and legally organized in July 2023, GHXSTSHIP Industries 
                  emerged from a vision to transform the experiential production landscape. We&apos;re not 
                  just another agency—we&apos;re architects of the impossible.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed">
                  Operating from Tampa, FL with a global remote team, we&apos;ve delivered experiences 
                  across 52+ countries, pushing the boundaries of what&apos;s possible in immersive 
                  entertainment, experiential marketing, creative media, and integrated technology.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-white">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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

        {/* Mission Section */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="grid md:grid-cols-2 gap-16">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-white mb-6">
                  Mission
                </Typography>
                <Typography variant="body" className="text-grey-400 text-lg leading-relaxed">
                  To create impossible experiences that transcend expectations, pushing the boundaries 
                  of technology, creativity, and human connection. We don&apos;t follow trends—we create them.
                </Typography>
              </SlideUp>
              <SlideUp delay={0.2}>
                <Typography variant="h2" uppercase className="text-white mb-6">
                  Vision
                </Typography>
                <Typography variant="body" className="text-grey-400 text-lg leading-relaxed">
                  To be the global leader in experiential production, known for delivering the impossible 
                  and setting new standards for what audiences can experience.
                </Typography>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* The 4 D's Framework */}
        <section className="py-24 bg-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h1" uppercase className="mb-4">
                  The 4 D&apos;s Framework
                </Typography>
                <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto">
                  Our comprehensive service framework that guides every project from concept to completion.
                </Typography>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'DESIGN', desc: 'Conceptual development & creative strategy' },
                { title: 'DEVELOPMENT', desc: 'Build, fabricate, produce' },
                { title: 'DIRECTION', desc: 'Execute, manage, deliver' },
                { title: 'DISRUPTION', desc: 'Push boundaries, create the future' },
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
                  Trusted By Industry Leaders
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
