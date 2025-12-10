'use client';

import React from 'react';
import { Search, Pencil, Hammer, Truck, Clapperboard, Zap, Crown } from 'lucide-react';
import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';
import { SlideUp } from '../animations/SlideUp';
import { FadeIn } from '../animations/FadeIn';

const services = [
  {
    title: 'DISCOVER',
    description: 'Strategic discovery and market analysis. We map the territory between "I have a crazy idea" and "this might actually work." Understanding objectives, spotting constraints before they become disasters, and designing experiences that move audiences without bankrupting anyone.',
    icon: Search,
  },
  {
    title: 'DESIGN',
    description: 'Concept development backed by actual physics. Environmental design, experience mapping, visual identity creation, and journey architecture. Every element serves strategic objectives while maintaining creative integrity—and structural integrity. Both matter.',
    icon: Pencil,
  },
  {
    title: 'DEVELOP',
    description: 'Production execution where vision becomes tangible. Steel, pixels, fabric, circuits—whatever the medium, we engineer it at scale. Our teams build festival infrastructure, branded environments, and installations that make engineers nervous and audiences lose their minds. In a good way.',
    icon: Hammer,
  },
  {
    title: 'DELIVER',
    description: "Project management as operational excellence. Load-in schedules, vendor coordination, permit acquisition, contingency planning. We've managed simultaneous productions across continents and solved real-time problems that would make lesser crews quit on the spot.",
    icon: Truck,
  },
  {
    title: 'DIRECT',
    description: 'On-site technical direction and real-time problem solving. Our teams supervise every detail from first truck arrival to final strike, ensuring execution matches design intent and client expectations—even when reality has other plans.',
    icon: Clapperboard,
  },
  {
    title: 'DISRUPT',
    description: 'Innovation without recklessness. We deploy emerging technologies ahead of adoption curves, create experiences that set new industry standards, and push boundaries with proper engineering documentation and adequate insurance coverage. Because chaos is fun, lawsuits are not.',
    icon: Zap,
  },
  {
    title: 'DOMINATE',
    description: 'Post-event analysis and continuous improvement. Performance metrics, lessons learned, evolution planning. Results that speak louder than promises—delivered on time, within budget, as specified. Revolutionary concept in this industry, apparently.',
    icon: Crown,
  },
];

export function Services() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <Typography variant="h1" uppercase className="mb-4">
              The Services
            </Typography>
            <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto">
              Seven D&apos;s. Zero shortcuts. Our operational methodology refined through 13 years of 
              high-stakes production. Discover. Design. Develop. Deliver. Direct. Disrupt. Dominate.
            </Typography>
          </div>
        </FadeIn>

        {/* Vertical Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-black transform md:-translate-x-1/2" />

            {/* Timeline Items */}
            {services.map((service, index) => (
              <SlideUp key={service.title} delay={index * 0.1}>
                <div className={`relative mb-12 md:mb-16 ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                }`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-black rounded-full transform -translate-x-1/2 md:translate-x-0 md:-translate-x-1/2" />
                  
                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                  }`}>
                    <div className="border-2 border-black p-4 sm:p-6 bg-white">
                      {/* Icon */}
                      <div className={`mb-3 ${
                        index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                      }`}>
                        <service.icon className="w-10 h-10 inline-block" strokeWidth={1.5} />
                      </div>
                      
                      {/* Title */}
                      <Typography 
                        variant="h4" 
                        uppercase 
                        className={`mb-4 ${
                          index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                        }`}
                      >
                        {service.title}
                      </Typography>
                      
                      {/* Description */}
                      <Typography 
                        variant="body" 
                        className={`text-grey-700 ${
                          index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                        }`}
                      >
                        {service.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>

        <FadeIn delay={0.8}>
          <div className="text-center mt-16">
            <Link href="/services">
              <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-black text-black hover:bg-black hover:text-white transition-all">
                Explore All Services
              </button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
