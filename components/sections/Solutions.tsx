'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';
import { FadeIn } from '../animations/FadeIn';
import { 
  Share2, 
  Monitor, 
  Video, 
  MapPin, 
  Sparkles, 
  Globe 
} from 'lucide-react';

const solutions = [
  {
    title: 'Social',
    description: 'Social media strategy, content production, influencer marketing, and community management.',
    icon: Share2,
  },
  {
    title: 'Digital',
    description: 'Website design, UX/UI development, digital marketing, and interactive brand experiences.',
    icon: Monitor,
  },
  {
    title: 'Virtual',
    description: 'Virtual event production, livestream management, webinar hosting, and hybrid experiences.',
    icon: Video,
  },
  {
    title: 'Physical',
    description: 'Live event production, scenic fabrication, stage design, and turnkey event management.',
    icon: MapPin,
  },
  {
    title: 'Experiential',
    description: 'Brand activations, immersive installations, interactive technology, and VIP experience design.',
    icon: Sparkles,
  },
  {
    title: 'International',
    description: 'Global event touring, multi-city campaign rollouts, and international production coordination.',
    icon: Globe,
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
              Six integrated delivery platforms spanning social media marketing, digital experience design, 
              virtual event production, live event management, experiential activations, and global campaign 
              execution. Your vision, every channel, zero excuses.
            </Typography>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <FadeIn key={solution.title} delay={index * 0.1}>
                <div className="border-2 border-black p-8 h-full hover:bg-black hover:text-white transition-all group">
                  <Icon className="w-8 h-8 mb-4 text-black group-hover:text-white transition-colors" strokeWidth={1.5} />
                  <Typography variant="h3" uppercase className="mb-4 group-hover:text-white">
                    {solution.title}
                  </Typography>
                  <Typography variant="body" className="text-grey-700 group-hover:text-grey-400">
                    {solution.description}
                  </Typography>
                </div>
              </FadeIn>
            );
          })}
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
