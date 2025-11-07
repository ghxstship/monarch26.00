'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { FadeIn } from '@/components/animations/FadeIn';
import { SlideUp } from '@/components/animations/SlideUp';

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
                <Typography variant="hero" className="text-white mb-6" uppercase>
                  Our Destinations
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

        {/* Delivery Avenues */}
        <section className="py-24 bg-white">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {[
                {
                  title: 'Digital',
                  description: 'Web platforms, mobile applications, and digital experiences that scale across devices and audiences.'
                },
                {
                  title: 'Virtual',
                  description: 'AR/VR experiences, virtual events, and immersive digital environments that transcend physical limitations.'
                },
                {
                  title: 'Physical',
                  description: 'Installations, fabrications, and built environments that transform spaces into experiences.'
                },
                {
                  title: 'Experiential',
                  description: 'Brand activations, pop-ups, and interactive experiences that create lasting impressions.'
                },
                {
                  title: 'Theatrical',
                  description: 'Live performances, staged productions, and entertainment experiences that captivate audiences.'
                },
                {
                  title: 'Global',
                  description: 'Multi-market campaigns, international tours, and cross-continental operations across 52 countries and counting.'
                }
              ].map((avenue, index) => (
                <FadeIn key={avenue.title} delay={index * 0.1}>
                  <div className="border-2 border-black p-4 sm:p-6 md:p-8 h-full flex flex-col min-h-[280px] sm:min-h-[320px]">
                    <Typography variant="h3" uppercase className="mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl leading-tight">
                      {avenue.title}
                    </Typography>
                    <Typography variant="body" className="text-grey-700 text-sm sm:text-base leading-relaxed">
                      {avenue.description}
                    </Typography>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* Integration Section */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-white mb-6">
                  Seamless Integration
                </Typography>
                <Typography variant="body" className="text-grey-400 text-lg leading-relaxed mb-8">
                  The best experiences don&apos;t live in silos. We architect solutions that work across 
                  all five avenues—creating cohesive journeys that meet audiences wherever they are. 
                  Digital campaigns that drive physical attendance. Virtual experiences that enhance 
                  theatrical productions. Experiential activations captured through creative media. 
                  Every touchpoint connected, every moment intentional.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-lg leading-relaxed">
                  Thirteen years of solving 3 AM problems taught us that the difference between good and 
                  legendary is usually just better integration and a crew that understands how all the 
                  pieces fit together. We&apos;ve built that crew. We&apos;ve solved those problems. 
                  Now we make the impossible look inevitable.
                </Typography>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white">
          <Container>
            <div className="text-center">
              <Typography variant="h1" uppercase className="mb-6">
                Chart Your Course
              </Typography>
              <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto mb-8">
                Let&apos;s discuss which destinations align with your vision and how we can navigate 
                the journey together.
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
