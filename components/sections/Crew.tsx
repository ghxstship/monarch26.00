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
              The Misfits
            </Typography>
            <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto">
              The people who navigate the impossible. Every crew member brings battle-tested expertise from 
              high-stakes productions where failure wasn&apos;t an option. We&apos;ve built teams that deliver 
              under pressure, solve problems at 3 AM, and turn &quot;that can&apos;t be done&quot; into 
              &quot;when do you need it by?&quot;
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
                From production managers to technical directors, creative designers to fabricators—our crew 
                brings decades of combined experience across festivals, brand activations, and global operations.
              </Typography>
              <Link href="/team">
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
                We&apos;re always looking for talented people who thrive under pressure and excel at solving 
                impossible problems. If you&apos;ve got production experience and creative vision, we want to hear from you.
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
