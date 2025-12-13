'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';
import { SlideUp } from '../animations/SlideUp';
import { FadeIn } from '../animations/FadeIn';

export function Crew() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <SlideUp>
          <div className="text-center mb-16">
            <Typography variant="h1" uppercase className="mb-4">
              The Crew
            </Typography>
            <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto">
              Event production professionals, technical directors, and creative strategists who navigate the 
              impossible. Battle-tested expertise from high-stakes festival production, brand activations, and 
              global operations. We deliver what we commit to—nothing more, nothing less.
            </Typography>
          </div>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <FadeIn delay={0.1}>
            <div className="border-2 border-black p-6 sm:p-8 h-full flex flex-col">
              <Typography variant="h3" uppercase className="mb-4">
                Meet The Crew
              </Typography>
              <Typography variant="body" className="text-grey-700 mb-6 flex-grow">
                Production managers, technical directors, creative designers, scenic fabricators, and AV 
                technicians—decades of combined experience across festival production, experiential marketing, 
                and international event operations.
              </Typography>
              <Link href="/crew">
                <button className="font-bebas uppercase tracking-wide px-6 py-3 text-base border-2 border-black text-black hover:bg-black hover:text-white transition-all w-full sm:w-auto">
                  Meet The Crew
                </button>
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="border-2 border-black p-6 sm:p-8 bg-black text-white h-full flex flex-col">
              <Typography variant="h3" uppercase className="mb-4 text-white">
                Join The Crew
              </Typography>
              <Typography variant="body" className="text-grey-400 mb-6 flex-grow">
                Seeking event production talent: stage managers, lighting designers, audio engineers, and 
                logistics coordinators who thrive under pressure. If you&apos;ve got production experience and 
                creative vision, we want to hear from you.
              </Typography>
              <Link href="/careers">
                <button className="font-bebas uppercase tracking-wide px-6 py-3 text-base border-2 border-white text-white hover:bg-white hover:text-black transition-all w-full sm:w-auto">
                  View Open Positions
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
