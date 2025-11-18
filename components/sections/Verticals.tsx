'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';
import { Card } from '../ui/Card';
import { FadeIn } from '../animations/FadeIn';

const verticals = [
  {
    title: 'Immersive Entertainment',
    metadata: 'Stages That Defy Physics // Festivals That Become Legends // Experiences That Break Reality',
    image: '/images/verticals/immersive.jpg',
    href: '/verticals/immersive-entertainment',
  },
  {
    title: 'Experiential Marketing',
    metadata: 'Brand Activations That Move Markets // Fortune 500 Trust // Global Execution',
    image: '/images/verticals/experiential.jpg',
    href: '/verticals/experiential-marketing',
  },
  {
    title: 'Creative Media',
    metadata: 'Capturing The Impossible // Strategic Storytelling // Content That Converts',
    image: '/images/verticals/media.jpg',
    href: '/verticals/creative-media',
  },
  {
    title: 'Integrated Technology',
    metadata: 'Digital Infrastructure // Immersive Tech // Systems That Scale Globally',
    image: '/images/verticals/technology.jpg',
    href: '/verticals/integrated-technology',
  },
];

export function Verticals() {
  const router = useRouter();
  return (
    <section className="py-24 bg-white">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <Typography variant="h1" uppercase className="mb-4">
              The Fleet
            </Typography>
            <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto">
              Four operational verticals. Festival production that shouldn&apos;t stand up but does. Theatrical 
              installations that make people question reality. Pop-up experiences that redefine spaces. We create 
              the moments that become legends—executed with precision that makes the impossible look easy. It&apos;s not.
            </Typography>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {verticals.map((vertical, index) => (
            <FadeIn key={vertical.title} delay={index * 0.1}>
              <Card
                type="project"
                title={vertical.title}
                metadata={vertical.metadata}
                image={vertical.image}
                onClick={() => router.push(vertical.href)}
              />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="text-center">
            <Link href="/verticals">
              <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-black text-black hover:bg-black hover:text-white transition-all">
                Explore The Full Fleet
              </button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
