'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';

const services = [
  {
    title: 'DISCOVER',
    subtitle: 'Strategic Discovery & Market Analysis',
    description: 'We map territory between ambitious vision and executable reality—understanding objectives, identifying constraints, designing experiences that move audiences while staying operationally achievable.',
    capabilities: [
      'Strategic Discovery',
      'Market Analysis',
      'Constraint Mapping',
      'Feasibility Studies',
      'Objective Alignment',
      'Experience Design',
    ],
  },
  {
    title: 'DESIGN',
    subtitle: 'Concept Development & Technical Feasibility',
    description: 'Concept development backed by technical feasibility. Environmental design, experience mapping, visual identity creation, and journey architecture. Every element serves strategic objectives while maintaining creative integrity.',
    capabilities: [
      'Environmental Design',
      'Experience Mapping',
      'Visual Identity',
      'Journey Architecture',
      'Technical Planning',
      'Creative Strategy',
    ],
  },
  {
    title: 'DEVELOP',
    subtitle: 'Production Execution at Scale',
    description: 'Production execution where vision becomes tangible. Steel, pixels, fabric, circuits—whatever the medium, we engineer it at scale. Our teams build festival infrastructure, branded environments, custom platforms, and installations that shouldn&apos;t technically work but absolutely do.',
    capabilities: [
      'Festival Infrastructure',
      'Branded Environments',
      'Custom Platforms',
      'Technical Fabrication',
      'Installation Build',
      'Production Management',
    ],
  },
  {
    title: 'DELIVER',
    subtitle: 'Project Management as Operational Excellence',
    description: 'Load-in schedules, vendor coordination, permit acquisition, contingency planning. We&apos;ve managed simultaneous productions across continents and solved 3 AM problems that would break other crews.',
    capabilities: [
      'Load-in Management',
      'Vendor Coordination',
      'Permit Acquisition',
      'Contingency Planning',
      'Multi-site Operations',
      'Crisis Management',
    ],
  },
  {
    title: 'DIRECT',
    subtitle: 'On-site Technical Direction',
    description: 'Our teams supervise every detail from first truck arrival to final strike, ensuring execution matches design intent and client expectations.',
    capabilities: [
      'Technical Direction',
      'On-site Supervision',
      'Quality Assurance',
      'Real-time Problem Solving',
      'Crew Management',
      'Strike Coordination',
    ],
  },
  {
    title: 'DISRUPT',
    subtitle: 'Innovation Without Recklessness',
    description: 'We deploy emerging technologies ahead of adoption curves, create experiences that set new industry standards, and push boundaries with proper engineering documentation and adequate insurance coverage.',
    capabilities: [
      'Emerging Technology',
      'Industry Innovation',
      'Standards Setting',
      'R&D Implementation',
      'Risk Management',
      'Future-forward Design',
    ],
  },
  {
    title: 'DOMINATE',
    subtitle: 'Post-event Analysis & Continuous Improvement',
    description: 'Performance metrics, lessons learned, evolution planning. Results that speak louder than promises—delivered on time, within budget, as specified.',
    capabilities: [
      'Performance Metrics',
      'Post-event Analysis',
      'Lessons Documentation',
      'Evolution Planning',
      'ROI Reporting',
      'Continuous Improvement',
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
                <Typography variant="hero" className="text-white mb-4" uppercase>
                  The Itinerary
                </Typography>
                <Typography variant="h3" className="text-grey-400 mb-6">
                  Seven milestones. Zero shortcuts. Unlimited &quot;I told you so&quot; moments when it works.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  Our operational process refined through 13 years of solving problems that emerge at 3 AM during setup. 
                  Also refined through countless moments of &quot;this shouldn&apos;t work&quot; followed by &quot;but it does.&quot; 
                  Discover. Design. Develop. Deliver. Direct. Disrupt. Dominate.
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

        {/* CTA */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="text-center">
              <Typography variant="h1" uppercase className="text-white mb-6">
                Ready to Start?
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-8">
                Let&apos;s discuss how our operational process can bring your vision to life.
              </Typography>
              <Link href="/contact">
                <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all">
                  Contact Us
                </button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
