'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';
import { FadeIn } from '../animations/FadeIn';

const solutions = [
  {
    title: 'Digital',
    description: 'Web platforms, mobile applications, and digital experiences that scale across devices and audiences.',
  },
  {
    title: 'Virtual',
    description: 'AR/VR experiences, virtual events, and immersive digital environments that transcend physical limitations.',
  },
  {
    title: 'Physical',
    description: 'Installations, fabrications, and built environments that transform spaces into experiences.',
  },
  {
    title: 'Musical Experiential',
    description: 'Brand activations, pop-ups, and interactive experiences that create lasting impressions.',
  },
  {
    title: 'Theatrical',
    description: 'Live performances, staged productions, and entertainment experiences that captivate audiences.',
  },
];

export function Solutions() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <Typography variant="h1" uppercase className="mb-4">
              The Destinations
            </Typography>
            <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto">
              We deliver experiences across multiple platforms and mediums. From digital interfaces to physical 
              installations, virtual environments to theatrical productions—we navigate every avenue with precision.
            </Typography>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {solutions.map((solution, index) => (
            <FadeIn key={solution.title} delay={index * 0.1}>
              <div className="border-2 border-black p-8 h-full hover:bg-black hover:text-white transition-all group">
                <Typography variant="h3" uppercase className="mb-4 group-hover:text-white">
                  {solution.title}
                </Typography>
                <Typography variant="body" className="text-grey-700 group-hover:text-grey-400">
                  {solution.description}
                </Typography>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="text-center">
            <Link href="/solutions">
              <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-black text-black hover:bg-black hover:text-white transition-all">
                Explore All Destinations
              </button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
