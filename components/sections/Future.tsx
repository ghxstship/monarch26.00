'use client';

import React from 'react';
import { Key, Globe, Compass } from 'lucide-react';
import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';
import { SlideUp } from '../animations/SlideUp';
import { FadeIn } from '../animations/FadeIn';

const apps = [
  {
    name: 'ATLVS',
    type: 'Internal',
    description: 'Internal operations platform powering our production workflow. The backbone of operational excellence.',
    icon: Globe,
  },
  {
    name: 'COMPVSS',
    type: 'B2B',
    description: 'Enterprise solution for brands and partners. Navigate complex productions with confidence.',
    icon: Compass,
  },
  {
    name: 'GVTEWAY',
    type: 'B2C',
    description: 'Consumer-facing platform connecting audiences to unforgettable experiences. Your gateway to the extraordinary.',
    icon: Key,
  },
];

export function Future() {
  return (
    <section className="py-24 bg-black text-white">
      <Container>
        <SlideUp>
          <div className="text-center mb-16">
            <Typography variant="h1" uppercase className="mb-4 text-white">
              The Tools
            </Typography>
            <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto">
              Innovation meets execution. We&apos;re building the next generation of experiential technology—platforms 
              that scale operations, connect audiences, and transform how brands create unforgettable moments.
            </Typography>
          </div>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {apps.map((app, index) => (
            <FadeIn key={app.name} delay={index * 0.1}>
              <div className="border-2 border-white p-8 h-full hover:bg-white hover:text-black transition-all group">
                <app.icon className="w-12 h-12 mb-4" strokeWidth={1.5} />
                <Typography variant="h3" uppercase className="mb-2 group-hover:text-black">
                  {app.name}
                </Typography>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-white text-black text-xs uppercase tracking-wider group-hover:bg-black group-hover:text-white">
                    {app.type}
                  </span>
                </div>
                <Typography variant="body" className="text-grey-400 group-hover:text-grey-700">
                  {app.description}
                </Typography>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="text-center">
            <Link href="/innovations">
              <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all">
                Explore Innovations
              </button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
