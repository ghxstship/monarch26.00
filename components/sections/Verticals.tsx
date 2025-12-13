'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';
import { FadeIn } from '../animations/FadeIn';
import { Music, Trophy, ShoppingBag, Hotel, Building2 } from 'lucide-react';

const industries = [
  {
    title: 'Concerts, Festivals & Tours',
    description: 'Festival production, concert touring, and live music event management at every scale.',
    icon: Music,
  },
  {
    title: 'Sports & Entertainment',
    description: 'Stadium activations, sports marketing, and fan experience design that matches game day energy.',
    icon: Trophy,
  },
  {
    title: 'Retail',
    description: 'Pop-up experiences, retail activations, and brand environments that drive traffic and conversion.',
    icon: ShoppingBag,
  },
  {
    title: 'Hospitality',
    description: 'Hotel entertainment, resort programming, and cruise line production. Hospitality without borders.',
    icon: Hotel,
  },
  {
    title: 'Corporate & Private',
    description: 'Corporate event production, product launches, and executive summits that don\'t feel corporate.',
    icon: Building2,
  },
];

export function Verticals() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <Typography variant="h1" uppercase className="mb-4">
              The Fleet
            </Typography>
            <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto">
              Event production and experiential marketing across every major industry vertical. From concert 
              touring and festival production to corporate event management and hospitality operations—we&apos;ve 
              mastered the unique demands of each sector through hard-won lessons about what works and what&apos;s just wishful thinking.
            </Typography>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          {industries.map((industry, index) => (
            <FadeIn key={industry.title} delay={index * 0.1}>
              <div className="border-2 border-black p-6 h-full hover:bg-black hover:text-white transition-all group text-center">
                <industry.icon className="w-8 h-8 mx-auto mb-4" strokeWidth={1.5} />
                <Typography variant="h5" uppercase className="mb-2 group-hover:text-white">
                  {industry.title}
                </Typography>
                <Typography variant="body" className="text-grey-600 group-hover:text-grey-300 text-sm">
                  {industry.description}
                </Typography>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="text-center">
            <Link href="/industries">
              <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-black text-black hover:bg-black hover:text-white transition-all">
                Explore All Industries
              </button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
