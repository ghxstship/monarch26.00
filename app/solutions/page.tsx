'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';

const solutions = [
  {
    title: 'Digital',
    subtitle: 'Web // Mobile // Digital Experiences',
    description: 'Web platforms, mobile applications, and digital experiences that scale across devices and audiences. From responsive websites to native applications, we create digital touchpoints that engage users wherever they are.',
    capabilities: [
      'Web Platforms',
      'Mobile Applications',
      'Responsive Design',
      'User Experience',
      'Digital Strategy',
      'Cross-device Integration',
    ],
  },
  {
    title: 'Virtual',
    subtitle: 'AR/VR // Virtual Events // Immersive Digital',
    description: 'AR/VR experiences, virtual events, and immersive digital environments that transcend physical limitations. We create virtual worlds that feel tangible and experiences that push the boundaries of reality.',
    capabilities: [
      'AR/VR Experiences',
      'Virtual Events',
      'Immersive Environments',
      'Digital Twins',
      '3D Modeling',
      'Interactive Simulations',
    ],
  },
  {
    title: 'Physical',
    subtitle: 'Installations // Fabrications // Built Environments',
    description: 'Installations, fabrications, and built environments that transform spaces into experiences. Steel, wood, fabric, and light—we engineer physical structures that shouldn\'t work but absolutely do.',
    capabilities: [
      'Custom Installations',
      'Fabrication',
      'Environmental Design',
      'Structural Engineering',
      'Material Innovation',
      'Space Transformation',
    ],
  },
  {
    title: 'Experiential',
    subtitle: 'Brand Activations // Pop-ups // Interactive',
    description: 'Brand activations, pop-ups, and interactive experiences that create lasting impressions. We design moments that audiences remember long after the event ends.',
    capabilities: [
      'Brand Activations',
      'Pop-up Experiences',
      'Interactive Installations',
      'Engagement Design',
      'Audience Journey',
      'Memorable Moments',
    ],
  },
  {
    title: 'Theatrical',
    subtitle: 'Live Performances // Staged Productions // Entertainment',
    description: 'Live performances, staged productions, and entertainment experiences that captivate audiences. From intimate shows to grand spectacles, we create theatrical moments that move people.',
    capabilities: [
      'Live Performances',
      'Staged Productions',
      'Show Design',
      'Entertainment Systems',
      'Audience Experience',
      'Production Management',
    ],
  },
  {
    title: 'Global',
    subtitle: 'Multi-market // International // Cross-continental',
    description: 'Multi-market campaigns, international tours, and cross-continental operations spanning six continents. We navigate cultural nuances, logistical complexities, and regulatory requirements with precision.',
    capabilities: [
      'Multi-market Campaigns',
      'International Tours',
      'Cross-continental Ops',
      'Cultural Adaptation',
      'Global Logistics',
      'Regulatory Navigation',
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
                  The Endgame
                </Typography>
                <Typography variant="h3" className="text-grey-400 mb-6">
                  Where &quot;impossible&quot; goes to get humbled.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  We deliver experiences across multiple platforms and mediums, ensuring your vision 
                  reaches audiences wherever they are. From digital interfaces to physical installations, 
                  we navigate every avenue with precision.
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
                Chart Your Course
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-8">
                Let&apos;s discuss which destinations align with your vision and how we can navigate 
                the journey together.
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
