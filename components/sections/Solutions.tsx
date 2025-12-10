'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';
import { FadeIn } from '../animations/FadeIn';

const solutions = [
  {
    title: 'Social',
    description: 'Strategy, content production, community building, and always-on content studios.',
  },
  {
    title: 'Digital',
    description: 'Web design, UX development, performance marketing, and interactive experiences.',
  },
  {
    title: 'Virtual',
    description: 'Virtual events, livestreams, podcasts, webinars, and on-demand content.',
  },
  {
    title: 'Physical',
    description: 'Live events, fabrication, scenic builds, and turnkey production management.',
  },
  {
    title: 'Experiential',
    description: 'Brand activations, installations, interactive tech, and VIP experience design.',
  },
  {
    title: 'International',
    description: 'Global touring, multi-city rollouts, and cross-market campaign localization.',
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
              Six platforms. Infinite possibilities. We deliver experiences across every medium—ensuring your vision 
              reaches audiences wherever they are.
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
                Explore All Solutions
              </button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
