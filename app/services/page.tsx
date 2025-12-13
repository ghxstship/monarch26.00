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
    subtitle: 'Insight Development • Strategic Planning • Research & Consulting',
    description: 'Comprehensive market, trend, and audience research for experiential campaigns. Brand audits, competitive benchmarking, and cultural intelligence analysis. Experience strategy, customer journey mapping, and opportunity modeling. Data-driven insights that define creative direction and campaign objectives.',
    capabilities: [
      'Market & Audience Research',
      'Brand Audits & Benchmarking',
      'Experience Strategy',
      'Customer Journey Mapping',
      'Stakeholder Interviews',
      'Strategic Roadmaps',
    ],
  },
  {
    title: 'DESIGN',
    subtitle: 'Creative Direction • Concept Development • Experience Design',
    description: 'High-impact creative ideation for live events, brand activations, and digital campaigns. Visual language creation, spatial and environmental design, storyboarding and narrative architecture. UX/UI for interactive content and hybrid platforms. Technical, scenic, lighting, and AV design integrated into cohesive concepts.',
    capabilities: [
      'Creative Ideation',
      'Visual Language & Moodboards',
      'Spatial & Environmental Design',
      'Storyboarding & Narrative',
      'UX/UI Design',
      'Technical & Scenic Design',
    ],
  },
  {
    title: 'DEVELOP',
    subtitle: 'Contracting & Planning • Technical Development • Pre-Production',
    description: 'Production budgeting, scoping, and contracting for events and experiential builds. End-to-end pre-production planning, schedules, runbooks, and workflow mapping. Vendor sourcing, procurement, and supply-chain coordination. Technical design integration: staging, AV, XR/AR, projection, lighting, and effects.',
    capabilities: [
      'Production Budgeting & Scoping',
      'Pre-Production Planning',
      'Vendor Sourcing & Procurement',
      'Technical Design Integration',
      'Fabrication Documentation',
      'Logistics & Compliance Planning',
    ],
  },
  {
    title: 'DELIVER',
    subtitle: 'Production Management • Logistics Coordination • Site Operations',
    description: 'Turnkey production management for events, activations, and branded experiences. On-site build supervision, installation oversight, and engineering coordination. Technical rehearsals, programming sessions, and cue walkthroughs. Load-in/load-out management, guest flow, and operational readiness.',
    capabilities: [
      'Turnkey Production Management',
      'On-Site Build Supervision',
      'Vendor & Team Alignment',
      'Technical Rehearsals',
      'Load-In/Load-Out Management',
      'QA & Safety Oversight',
    ],
  },
  {
    title: 'DIRECT',
    subtitle: 'Operations Leadership • Technical Direction • Event Staffing',
    description: 'Live show calling, technical directing, and editorial execution. Real-time operational oversight for productions, stages, and experiences. Stage management, broadcast direction, and digital control room operations. Live troubleshooting, crisis management, and maintaining operational continuity from open to close.',
    capabilities: [
      'Live Show Calling',
      'Technical Directing',
      'Stage Management',
      'Broadcast Direction',
      'Live Troubleshooting',
      'Operational Continuity',
    ],
  },
  {
    title: 'DISRUPT',
    subtitle: 'Innovation Development • Emerging Technology • Creative Experimentation',
    description: 'Pioneering experiential concepts using emerging tech, XR/AR, and interactive systems. Development of multisensory installations, immersive activations, and digital layers. Proprietary tools, custom software, and next-gen engagement mechanics. Category-defying creative R&D that challenges industry norms.',
    capabilities: [
      'Emerging Tech & XR/AR',
      'Multisensory Installations',
      'Proprietary Tools & Software',
      'Rapid Prototyping',
      'Experimental Storytelling',
      'Creative R&D',
    ],
  },
  {
    title: 'DOMINATE',
    subtitle: 'Scaling & Optimization • Performance Growth • Amplification',
    description: 'Multi-market campaign rollout, touring systems, and scalable event models. Analytics dashboards, performance insights, and data-driven optimization. Conversion funnels, community development, and lifecycle engagement. Always-on content production and audience expansion for long-term growth.',
    capabilities: [
      'Multi-Market Rollout',
      'Analytics & Performance Insights',
      'Conversion Optimization',
      'Community Development',
      'Always-On Content',
      'Postmortems & Continuous Improvement',
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
                  Services
                </Typography>
                <Typography variant="h3" className="text-grey-400 mb-6">
                  Seven D&apos;s. Zero shortcuts.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  Our operational methodology refined through 13 years of solving curveballs that would break lesser crews. 
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
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
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
                  <div className={`border-2 p-6 sm:p-8 ${index % 2 === 0 ? 'border-black' : 'border-white'}`}>
                    <Typography 
                      variant="h5" 
                      uppercase 
                      className={`mb-4 sm:mb-6 ${index % 2 === 0 ? 'text-black' : 'text-white'}`}
                    >
                      Core Capabilities
                    </Typography>
                    <ul className="space-y-2 sm:space-y-3">
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
