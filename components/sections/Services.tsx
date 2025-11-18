'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';
import { SlideUp } from '../animations/SlideUp';
import { FadeIn } from '../animations/FadeIn';

const services = [
  {
    title: 'DISCOVER',
    description: 'Strategic discovery and market analysis. We map the territory between "I have a crazy idea" and "this might actually work." Understanding objectives, spotting constraints before they become disasters, and designing experiences that move audiences without bankrupting anyone.',
    bg: 'bg-white text-black',
  },
  {
    title: 'DESIGN',
    description: 'Concept development backed by actual physics. Environmental design, experience mapping, visual identity creation, and journey architecture. Every element serves strategic objectives while maintaining creative integrity—and structural integrity. Both matter.',
    bg: 'bg-black text-white',
  },
  {
    title: 'DEVELOP',
    description: 'Production execution where vision becomes tangible. Steel, pixels, fabric, circuits—whatever the medium, we engineer it at scale. Our teams build festival infrastructure, branded environments, and installations that make engineers nervous and audiences lose their minds. In a good way.',
    bg: 'bg-white text-black',
  },
  {
    title: 'DELIVER',
    description: 'Project management as operational excellence. Load-in schedules, vendor coordination, permit acquisition, contingency planning. We&apos;ve managed simultaneous productions across continents and solved real-time problems that would make lesser crews quit on the spot.',
    bg: 'bg-black text-white',
  },
  {
    title: 'DIRECT',
    description: 'On-site technical direction and real-time problem solving. Our teams supervise every detail from first truck arrival to final strike, ensuring execution matches design intent and client expectations—even when reality has other plans.',
    bg: 'bg-white text-black',
  },
  {
    title: 'DISRUPT',
    description: 'Innovation without recklessness. We deploy emerging technologies ahead of adoption curves, create experiences that set new industry standards, and push boundaries with proper engineering documentation and adequate insurance coverage. Because chaos is fun, lawsuits are not.',
    bg: 'bg-black text-white',
  },
  {
    title: 'DOMINATE',
    description: 'Post-event analysis and continuous improvement. Performance metrics, lessons learned, evolution planning. Results that speak louder than promises—delivered on time, within budget, as specified. Revolutionary concept in this industry, apparently.',
    bg: 'bg-white text-black',
  },
];

export function Services() {
  return (
    <section className="py-0">
      {/* Header Section */}
      <div className="min-h-screen flex items-center bg-black text-white">
        <Container>
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <Typography variant="h1" uppercase className="mb-6 text-white">
                The Itinerary
              </Typography>
              <Typography variant="body" className="text-grey-400 text-xl mb-12">
                Seven phases from vision to victory. Our operational process refined through 13 years of 
                high-stakes production. Discover. Design. Develop. Deliver. Direct. Disrupt. Dominate.
              </Typography>
              <Link href="/services">
                <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all">
                  Explore The Full Itinerary
                </button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </div>

      {/* Services Preview - First 3 */}
      {services.slice(0, 3).map((service) => (
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
