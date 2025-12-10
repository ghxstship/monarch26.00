'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';

const solutions = [
  {
    title: 'Social',
    subtitle: 'Strategy // Content // Community',
    description: 'Social media strategy and management, content production across short-form, motion, and editorial. Community building, influencer and creator programs, campaign development. Always-on content studios that keep your brand in the conversation.',
    capabilities: [
      'Social Media Strategy & Management',
      'Content Production',
      'Community Building & Moderation',
      'Influencer & Creator Programs',
      'Campaign Development',
      'Digital Reputation Tracking',
    ],
  },
  {
    title: 'Digital',
    subtitle: 'Web // Mobile // Performance',
    description: 'Digital campaign strategy, web design and UX development, landing pages and conversion paths. Email marketing, CRM automation, SEO, SEM, and performance marketing. Interactive web experiences that drive results.',
    capabilities: [
      'Digital Campaign Strategy',
      'Web Design & UX Development',
      'Landing Pages & Funnels',
      'Email Marketing & CRM',
      'SEO, SEM & Performance Marketing',
      'Interactive Web Experiences',
    ],
  },
  {
    title: 'Virtual',
    subtitle: 'Events // Livestreams // On-Demand',
    description: 'Virtual events and livestreams, podcasts and talk formats, webinars and masterclasses. Remote studio and recording systems, virtual product launches, on-demand content libraries. Interactive digital experiences that transcend physical limitations.',
    capabilities: [
      'Virtual Events & Livestreams',
      'Podcasts & Talk Formats',
      'Webinars & Masterclasses',
      'Remote Studio Systems',
      'Virtual Product Launches',
      'On-Demand Content Libraries',
    ],
  },
  {
    title: 'Physical',
    subtitle: 'Events // Fabrication // Environments',
    description: 'Live events and productions, environmental design and architecture, fabrication and scenic builds. Retail, pop-up, and in-store environments. Trade shows, exhibits, mobile and roadshow units. Turnkey production management from concept to strike.',
    capabilities: [
      'Live Events & Productions',
      'Environmental Design',
      'Fabrication & Scenic Builds',
      'Retail & Pop-Up Environments',
      'Trade Shows & Exhibits',
      'Turnkey Production Management',
    ],
  },
  {
    title: 'Experiential',
    subtitle: 'Activations // Installations // Immersive',
    description: 'Brand activations and experiential installations, custom venues and pop-up worlds. Interactive technology—RFID, NFC, projection, AR/XR. Gamified experiences, experiential storytelling, immersive photo/video moments. Hospitality and VIP experience design.',
    capabilities: [
      'Brand Activations',
      'Experiential Installations',
      'Custom Venues & Pop-Up Worlds',
      'Interactive Technology',
      'Gamified Experiences',
      'VIP Experience Design',
    ],
  },
  {
    title: 'International',
    subtitle: 'Global // Touring // Multi-Market',
    description: 'Global touring installations and international event production. Cross-market campaign localization, global fabrication and supply chain. Remote and borderless creative operations, artist and talent touring support. Multi-city rollout planning, customs, permitting, and regulatory navigation.',
    capabilities: [
      'Global Touring Installations',
      'International Event Production',
      'Cross-Market Localization',
      'Global Fabrication & Supply Chain',
      'Multi-City Rollout Planning',
      'Customs & Regulatory Navigation',
    ],
  },
];

export default function SolutionsPage() {
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
                  Solutions
                </Typography>
                <Typography variant="h3" className="text-grey-400 mb-6">
                  Six platforms. Infinite possibilities.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  We deliver experiences across every platform and medium—ensuring your vision 
                  reaches audiences wherever they are. Social, digital, virtual, physical, experiential, international.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Solutions Detail */}
        {solutions.map((solution, index) => (
          <section 
            key={solution.title} 
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
                    {solution.title}
                  </Typography>
                  <Typography 
                    variant="h4" 
                    uppercase 
                    className={`mb-6 ${index % 2 === 0 ? 'text-grey-600' : 'text-grey-400'}`}
                  >
                    {solution.subtitle}
                  </Typography>
                  <Typography 
                    variant="body" 
                    className={`text-lg leading-relaxed ${index % 2 === 0 ? 'text-grey-700' : 'text-grey-400'}`}
                  >
                    {solution.description}
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
                      {solution.capabilities.map((capability) => (
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

        {/* Integration Section */}
        <section className="py-24 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-black mb-6">
                  Seamless Integration
                </Typography>
                <Typography variant="body" className="text-grey-700 text-lg leading-relaxed mb-8">
                  The best experiences don&apos;t live in silos. We architect solutions that work across 
                  all six avenues—creating cohesive journeys that meet audiences wherever they are. 
                  Digital campaigns that drive physical attendance. Virtual experiences that enhance 
                  theatrical productions. Experiential activations captured through creative media. 
                  Every touchpoint connected, every moment intentional.
                </Typography>
                <Typography variant="body" className="text-grey-700 text-lg leading-relaxed">
                  Thirteen years of high-stakes production taught us that the difference between good and 
                  legendary is usually just better integration and a crew that understands how all the 
                  pieces fit together. We&apos;ve built that crew. We&apos;ve solved those problems. 
                  Now we make the impossible look inevitable.
                </Typography>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="text-center">
              <Typography variant="h1" uppercase className="text-white mb-6">
                Find Your Platform
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-8">
                Let&apos;s discuss which solutions align with your vision and how we can bring it to life.
              </Typography>
              <Link href="/contact">
                <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all">
                  Start a Project
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
