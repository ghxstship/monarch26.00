'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

const services = [
  {
    title: 'DESIGN',
    subtitle: 'Conceptual Development & Creative Strategy',
    description: 'We architect the impossible, transforming abstract ideas into tangible experiences that move audiences. Every concept begins with a question: what if?',
    capabilities: [
      'Creative Concepting',
      'Brand Experiences',
      'Spatial Design',
      'Content Strategy',
      'Visual Identity',
      'Experience Mapping',
    ],
  },
  {
    title: 'DEVELOPMENT',
    subtitle: 'Production & Build',
    description: 'From steel and stage to pixels and platforms, we build what others say can\'t be done. Our production teams turn visions into reality at global scale.',
    capabilities: [
      'Production Management',
      'Fabrication',
      'Build-out',
      'Technical Integration',
      'Vendor Management',
      'Quality Control',
    ],
  },
  {
    title: 'DIRECTION',
    subtitle: 'Operations & Execution',
    description: 'Precision operations across continents. We orchestrate chaos into perfection, managing every detail from load-in to strike.',
    capabilities: [
      'Operations Management',
      'Logistics',
      'On-site Execution',
      'Talent Management',
      'Safety Protocols',
      'Real-time Problem Solving',
    ],
  },
  {
    title: 'DISRUPTION',
    subtitle: 'Innovation & Future Tech',
    description: 'Tomorrow\'s experiences, delivered today. We don\'t follow trends—we create them, pushing technology and creativity to their absolute limits.',
    capabilities: [
      'Innovation Lab',
      'Emerging Tech',
      'R&D',
      'Future-forward Concepts',
      'Experimental Design',
      'Technology Integration',
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-black text-white">
          <Container>
            <SlideUp>
              <div className="text-center max-w-3xl mx-auto">
                <Typography variant="hero" className="text-white mb-6" uppercase>
                  The 4 D&apos;s
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  Our comprehensive service framework that guides every project from concept to completion. 
                  Design. Develop. Direct. Disrupt.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Services Detail */}
        {services.map((service, index) => (
          <section 
            key={service.title} 
            className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-black text-white'}`}
          >
            <Container>
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <SlideUp>
                  <Typography 
                    variant="h1" 
                    uppercase 
                    className={`mb-4 ${index % 2 === 0 ? 'text-black' : 'text-white'}`}
                  >
                    {service.title}
                  </Typography>
                  <Typography 
                    variant="h4" 
                    uppercase 
                    className={`mb-6 ${index % 2 === 0 ? 'text-grey-600' : 'text-grey-400'}`}
                  >
                    {service.subtitle}
                  </Typography>
                  <Typography 
                    variant="body" 
                    className={`text-lg leading-relaxed ${index % 2 === 0 ? 'text-grey-700' : 'text-grey-400'}`}
                  >
                    {service.description}
                  </Typography>
                </SlideUp>

                <SlideUp delay={0.2}>
                  <div className={`border-2 p-8 ${index % 2 === 0 ? 'border-black' : 'border-white'}`}>
                    <Typography 
                      variant="h5" 
                      uppercase 
                      className={`mb-6 ${index % 2 === 0 ? 'text-black' : 'text-white'}`}
                    >
                      Core Capabilities
                    </Typography>
                    <ul className="space-y-3">
                      {service.capabilities.map((capability) => (
                        <li key={capability}>
                          <Typography 
                            variant="body" 
                            className={index % 2 === 0 ? 'text-grey-700' : 'text-grey-400'}
                          >
                            • {capability}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SlideUp>
              </div>
            </Container>
          </section>
        ))}

        {/* Delivery Avenues */}
        <section className="py-24 bg-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h2" uppercase className="mb-4">
                  Avenues of Delivery
                </Typography>
                <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto">
                  We deliver experiences across multiple platforms and mediums, 
                  ensuring your vision reaches audiences wherever they are.
                </Typography>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {['Digital', 'Virtual', 'Physical', 'Experiential', 'Theatrical'].map((avenue, index) => (
                <FadeIn key={avenue} delay={index * 0.1}>
                  <div className="border-2 border-black p-6 text-center">
                    <Typography variant="h5" uppercase>
                      {avenue}
                    </Typography>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="text-center">
              <Typography variant="h1" uppercase className="text-white mb-6">
                Ready to Start?
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-8">
                Let&apos;s discuss how our 4 D&apos;s framework can bring your vision to life.
              </Typography>
              <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all">
                Contact Us
              </button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
