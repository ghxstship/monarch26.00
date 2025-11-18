'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';
import Link from 'next/link';

const verticals = [
  {
    id: 'immersive-entertainment',
    title: 'Immersive Entertainment',
    subtitle: 'Concerts // Festivals // Tours // Theatrical',
    description: 'From intimate club shows to stadium spectacles, we create unforgettable live experiences. Our production expertise spans concerts, festivals, world tours, and theatrical productions that captivate audiences worldwide.',
    capabilities: [
      'Concert Production',
      'Festival Design & Build',
      'Tour Management',
      'Stage Design',
      'Lighting & Visual Systems',
      'Audio Engineering',
    ],
    href: '/verticals/immersive-entertainment',
  },
  {
    id: 'experiential-marketing',
    title: 'Experiential Marketing',
    subtitle: 'Brand Activations // Pop-ups // Installations',
    description: 'Transform brands into experiences. We design and execute activations that create lasting impressions, drive engagement, and generate measurable results for the world\'s leading brands.',
    capabilities: [
      'Brand Activations',
      'Pop-up Experiences',
      'Interactive Installations',
      'Product Launches',
      'Guerrilla Marketing',
      'Sponsorship Activations',
    ],
    href: '/verticals/experiential-marketing',
  },
  {
    id: 'creative-media',
    title: 'Creative Media',
    subtitle: 'Film // Video // Photography // Content',
    description: 'Capture the impossible. Our creative media team produces stunning visual content that tells your story across all platforms, from cinematic productions to social media content.',
    capabilities: [
      'Video Production',
      'Photography',
      'Content Creation',
      'Post-Production',
      'Motion Graphics',
      'Social Media Content',
    ],
    href: '/verticals/creative-media',
  },
  {
    id: 'integrated-technology',
    title: 'Integrated Technology',
    subtitle: 'AV Systems // Interactive Tech // Digital',
    description: 'Push the boundaries of what\'s possible. We integrate cutting-edge technology into physical spaces, creating interactive experiences that blur the line between digital and physical.',
    capabilities: [
      'AV System Design',
      'Interactive Technology',
      'Projection Mapping',
      'LED Systems',
      'Control Systems',
      'Technical Integration',
    ],
    href: '/verticals/integrated-technology',
  },
];

export default function VerticalsPage() {
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
                  The Fleet
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  Four core verticals where we deliver impossible experiences across 
                  digital, virtual, physical, experiential, and theatrical avenues.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Verticals Detail */}
        {verticals.map((vertical, index) => (
          <section 
            key={vertical.id} 
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
                    {vertical.title}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    uppercase 
                    className={`mb-6 ${index % 2 === 0 ? 'text-grey-600' : 'text-grey-400'}`}
                  >
                    {vertical.subtitle}
                  </Typography>
                  <Typography 
                    variant="body" 
                    className={`text-lg leading-relaxed mb-8 ${index % 2 === 0 ? 'text-grey-700' : 'text-grey-400'}`}
                  >
                    {vertical.description}
                  </Typography>
                  <Link href={vertical.href}>
                    <button 
                      className={`font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 transition-all ${
                        index % 2 === 0 
                          ? 'border-black text-black hover:bg-black hover:text-white' 
                          : 'border-white text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      Learn More
                    </button>
                  </Link>
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
                      {vertical.capabilities.map((capability) => (
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

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <Container>
            <div className="text-center">
              <Typography variant="h1" uppercase className="mb-6">
                Ready to Create?
              </Typography>
              <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto mb-8">
                Let&apos;s discuss how our vertical expertise can bring your vision to life.
              </Typography>
              <Link href="/contact">
                <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-black text-black hover:bg-black hover:text-white transition-all">
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
