'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Production Manager',
      location: 'Remote / On-site',
      type: 'Full-time',
      description: 'Lead multi-site production operations for festivals, brand activations, and experiential events. Manage timelines, budgets, and crews across complex installations.',
    },
    {
      title: 'Technical Director',
      location: 'Remote / On-site',
      type: 'Full-time',
      description: 'Oversee technical execution from load-in to strike. AV systems, lighting, staging, and integrated technology for large-scale events.',
    },
    {
      title: 'Creative Designer',
      location: 'Remote',
      type: 'Contract',
      description: 'Concept development and environmental design for experiential activations. Must understand technical feasibility and production constraints.',
    },
  ];

  const benefits = [
    'Competitive compensation',
    'Remote-friendly for applicable roles',
    'Global project opportunities',
    'Professional development budget',
    'Flexible scheduling',
    'Travel opportunities',
  ];

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
                  Careers
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  Join a crew that navigates the impossible. We&apos;re building teams that deliver world-class 
                  experiences under pressure, solve problems that shouldn&apos;t have solutions, and turn ambitious 
                  visions into operational reality.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Why GHXSTSHIP */}
        <section className="py-24 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-center mb-12">
                  Why GHXSTSHIP?
                </Typography>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="border-2 border-black p-8">
                    <Typography variant="h4" uppercase className="mb-4">
                      High-Stakes Projects
                    </Typography>
                    <Typography variant="body" className="text-grey-700">
                      Work on productions for Red Bull, Formula 1, Insomniac, PATRÓN, and other brands 
                      that demand operational excellence.
                    </Typography>
                  </div>

                  <div className="border-2 border-black p-8">
                    <Typography variant="h4" uppercase className="mb-4">
                      Global Operations
                    </Typography>
                    <Typography variant="body" className="text-grey-700">
                      Projects across six continents. Experience different markets, cultures, and production 
                      environments.
                    </Typography>
                  </div>

                  <div className="border-2 border-black p-8">
                    <Typography variant="h4" uppercase className="mb-4">
                      Technical Innovation
                    </Typography>
                    <Typography variant="body" className="text-grey-700">
                      Push boundaries with emerging technology, custom fabrication, and integrated systems 
                      that set industry standards.
                    </Typography>
                  </div>

                  <div className="border-2 border-black p-8">
                    <Typography variant="h4" uppercase className="mb-4">
                      Ownership & Impact
                    </Typography>
                    <Typography variant="body" className="text-grey-700">
                      Small team means your work matters. Take ownership, make decisions, see direct impact 
                      on project success.
                    </Typography>
                  </div>
                </div>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* Open Positions */}
        <section className="py-24 bg-black text-white">
          <Container>
            <SlideUp>
              <Typography variant="h2" uppercase className="text-white text-center mb-12">
                Open Positions
              </Typography>
            </SlideUp>

            <div className="max-w-4xl mx-auto space-y-6">
              {openPositions.map((position, index) => (
                <FadeIn key={position.title} delay={index * 0.1}>
                  <div className="border-2 border-white p-8 hover:bg-white hover:text-black transition-all group cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <Typography variant="h3" uppercase className="mb-2 group-hover:text-black">
                          {position.title}
                        </Typography>
                        <div className="flex flex-wrap gap-4">
                          <Typography variant="meta" uppercase className="text-grey-400 group-hover:text-grey-600">
                            {position.location}
                          </Typography>
                          <Typography variant="meta" uppercase className="text-grey-400 group-hover:text-grey-600">
                            {position.type}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <Typography variant="body" className="text-grey-400 group-hover:text-grey-700 mb-6">
                      {position.description}
                    </Typography>
                    <button className="font-bebas uppercase tracking-wide px-6 py-3 border-2 border-white text-white group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
                      Apply Now
                    </button>
                  </div>
                </FadeIn>
              ))}
            </div>

            {openPositions.length === 0 && (
              <div className="text-center max-w-2xl mx-auto">
                <Typography variant="body" className="text-grey-400 text-lg">
                  No open positions at the moment. Check back soon or send us your resume for future opportunities.
                </Typography>
              </div>
            )}
          </Container>
        </section>

        {/* Benefits */}
        <section className="py-24 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-center mb-12">
                  Benefits & Perks
                </Typography>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <FadeIn key={benefit} delay={index * 0.05}>
                      <div className="border-2 border-black p-6 flex items-center">
                        <Typography variant="body" className="text-grey-700">
                          • {benefit}
                        </Typography>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* Application Process */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-white text-center mb-12">
                  Application Process
                </Typography>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white text-black flex items-center justify-center mx-auto mb-4 text-2xl font-bebas">
                      1
                    </div>
                    <Typography variant="h5" uppercase className="text-white mb-3">
                      Apply
                    </Typography>
                    <Typography variant="body" className="text-grey-400">
                      Submit your resume and portfolio. Tell us about relevant experience and why you want to join the crew.
                    </Typography>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-white text-black flex items-center justify-center mx-auto mb-4 text-2xl font-bebas">
                      2
                    </div>
                    <Typography variant="h5" uppercase className="text-white mb-3">
                      Interview
                    </Typography>
                    <Typography variant="body" className="text-grey-400">
                      Initial conversation about your background, skills, and project experience. We want to understand how you work.
                    </Typography>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-white text-black flex items-center justify-center mx-auto mb-4 text-2xl font-bebas">
                      3
                    </div>
                    <Typography variant="h5" uppercase className="text-white mb-3">
                      Join
                    </Typography>
                    <Typography variant="body" className="text-grey-400">
                      Onboarding and integration with the team. Start working on projects that push boundaries.
                    </Typography>
                  </div>
                </div>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <SlideUp>
                <Typography variant="h2" uppercase className="mb-6">
                  Don&apos;t See Your Role?
                </Typography>
                <Typography variant="body" className="text-grey-700 text-lg mb-8">
                  We&apos;re always looking for talented people. Send us your resume and tell us what you bring to the crew.
                </Typography>
                <Link href="/contact">
                  <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-black text-black hover:bg-black hover:text-white transition-all">
                    Get in Touch
                  </button>
                </Link>
              </SlideUp>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
