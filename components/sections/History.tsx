'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';
import { SlideUp } from '../animations/SlideUp';
import { FadeIn } from '../animations/FadeIn';

export function History() {
  const stats = [
    { value: '13+', label: 'Years Experience' },
    { value: '52', label: 'Countries Traveled' },
    { value: '1000+', label: 'Experiences Created' },
    { value: '5M+', label: 'Memories Made' },
  ];

  return (
    <section className="py-24 bg-black text-white">
      <Container>
        <SlideUp>
          <div className="text-center mb-16">
            <Typography variant="h1" uppercase className="mb-4 text-white">
              The History
            </Typography>
            <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto">
              Thirteen years of event production experience spanning hospitality management, live entertainment, 
              and experiential marketing. From cruise ship entertainment to 50,000-capacity festival production 
              to motorsport VIP hospitality—every project refined our operational methodology.
            </Typography>
          </div>
        </SlideUp>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1}>
              <div className="text-center border-2 border-white p-6 md:p-8">
                <Typography variant="h1" className="mb-3 leading-none text-white">
                  {stat.value}
                </Typography>
                <Typography variant="h6" uppercase className="text-grey-400 text-sm md:text-base">
                  {stat.label}
                </Typography>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="text-center">
            <Link href="/about">
              <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all">
                Explore The Full History
              </button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
