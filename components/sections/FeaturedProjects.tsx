'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';
import { SlideUp } from '../animations/SlideUp';
import { FadeIn } from '../animations/FadeIn';

const projects = [
  {
    title: 'Salvage City Supper Club at EDC Las Vegas',
    metadata: 'Client: Insomniac // Year: 2024 // Location: Las Vegas, NV',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  },
  {
    title: 'Heineken Turn4 Nightclub at F1 Las Vegas Grand Prix',
    metadata: 'Client: Heineken // Year: 2023 // Location: Las Vegas, NV',
    image: 'https://images.unsplash.com/photo-1541447270888-83e8494f9c07?w=800&q=80',
  },
  {
    title: 'Red Bull Unforeseen Motel Nightclub at III Points Miami',
    metadata: 'Client: Red Bull // Year: 2023 // Location: Miami, FL',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  },
  {
    title: 'PATRÓN Cristalino North American Launch with Becky G',
    metadata: 'Client: PATRÓN // Year: 2023 // Location: Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=800&q=80',
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-24 bg-black text-white">
      <Container>
        <SlideUp>
          <div className="text-center mb-16">
            <Typography variant="h1" uppercase className="mb-4 text-white">
              The Museum
            </Typography>
            <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto">
              Case studies from festival production, brand activations, and experiential marketing campaigns 
              across 52 countries. Every project a masterclass in event logistics, creative execution, and 
              making the impossible look inevitable.
            </Typography>
          </div>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <SlideUp key={project.title} delay={index * 0.1}>
              <div className="border-2 border-white bg-black overflow-hidden hover:scale-[1.02] transition-transform duration-200 cursor-pointer h-full flex flex-col">
                <div className="relative w-full aspect-[16/9] bg-grey-900 flex-shrink-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 sm:p-6 flex-grow flex flex-col">
                  <Typography variant="h4" uppercase className="mb-2 text-white text-sm sm:text-base md:text-lg leading-tight">
                    {project.title}
                  </Typography>
                  <Typography variant="meta" uppercase className="text-grey-500 text-xs sm:text-sm mt-auto">
                    {project.metadata}
                  </Typography>
                </div>
              </div>
            </SlideUp>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="text-center">
            <Link href="/museum">
              <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all">
                Explore The Museum
              </button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
