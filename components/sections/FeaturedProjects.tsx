'use client';

import React from 'react';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';
import { SlideUp } from '../animations/SlideUp';

const projects = [
  {
    title: 'Formula 1 Miami Grand Prix',
    metadata: 'Client: Formula 1 // Year: 2024 // Location: Miami',
    image: '/images/projects/f1.jpg',
  },
  {
    title: 'Insomniac EDC Experience',
    metadata: 'Client: Insomniac // Year: 2024 // Location: Las Vegas',
    image: '/images/projects/edc.jpg',
  },
  {
    title: 'PATRÓN Brand Activation',
    metadata: 'Client: PATRÓN // Year: 2023 // Location: Multiple',
    image: '/images/projects/patron.jpg',
  },
  {
    title: 'Heineken Global Tour',
    metadata: 'Client: Heineken // Year: 2023 // Location: Global',
    image: '/images/projects/heineken.jpg',
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-24 bg-black text-white">
      <Container>
        <SlideUp>
          <div className="text-center mb-16">
            <Typography variant="h1" uppercase className="mb-4 text-white">
              Featured Work
            </Typography>
            <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto">
              A selection of our most ambitious projects, pushing the boundaries of 
              what&apos;s possible in experiential production.
            </Typography>
          </div>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <SlideUp key={project.title} delay={index * 0.1}>
              <div className="border-2 border-white bg-black overflow-hidden hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                <div className="relative w-full aspect-[16/9] bg-grey-900">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Typography variant="h3" className="text-grey-700" uppercase>
                      Image
                    </Typography>
                  </div>
                </div>
                <div className="p-6">
                  <Typography variant="h4" uppercase className="mb-2 text-white">
                    {project.title}
                  </Typography>
                  <Typography variant="meta" uppercase className="text-grey-500">
                    {project.metadata}
                  </Typography>
                </div>
              </div>
            </SlideUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
