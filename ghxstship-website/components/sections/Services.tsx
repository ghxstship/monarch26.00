'use client';

import React from 'react';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';
import { SlideUp } from '../animations/SlideUp';

const services = [
  {
    title: 'DESIGN',
    description: 'We architect the impossible, transforming abstract ideas into tangible experiences that move audiences. Every concept begins with a question: what if?',
    bg: 'bg-white text-black',
  },
  {
    title: 'DEVELOPMENT',
    description: 'From steel and stage to pixels and platforms, we build what others say can\'t be done. Our production teams turn visions into reality at global scale.',
    bg: 'bg-black text-white',
  },
  {
    title: 'DIRECTION',
    description: 'Precision operations across continents. We orchestrate chaos into perfection, managing every detail from load-in to strike.',
    bg: 'bg-white text-black',
  },
  {
    title: 'DISRUPTION',
    description: 'Tomorrow\'s experiences, delivered today. We don\'t follow trends—we create them, pushing technology and creativity to their absolute limits.',
    bg: 'bg-black text-white',
  },
];

export function Services() {
  return (
    <section className="py-0">
      {services.map((service) => (
        <div key={service.title} className={`min-h-screen flex items-center ${service.bg}`}>
          <Container>
            <SlideUp delay={0.2}>
              <div className="max-w-4xl">
                <Typography variant="h1" uppercase className="mb-8">
                  {service.title}
                </Typography>
                <Typography variant="body" className="text-xl leading-relaxed">
                  {service.description}
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </div>
      ))}
    </section>
  );
}
