'use client';

import React from 'react';
import { Search, Pencil, Hammer, Truck, Clapperboard, Zap, Crown } from 'lucide-react';
import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';
import { FadeIn } from '../animations/FadeIn';

const services = [
  { title: 'DISCOVER', subtitle: 'Research & Strategy', icon: Search },
  { title: 'DESIGN', subtitle: 'Creative & Concept', icon: Pencil },
  { title: 'DEVELOP', subtitle: 'Pre-Production', icon: Hammer },
  { title: 'DELIVER', subtitle: 'Production & Logistics', icon: Truck },
  { title: 'DIRECT', subtitle: 'Operations & Execution', icon: Clapperboard },
  { title: 'DISRUPT', subtitle: 'Innovation & Tech', icon: Zap },
  { title: 'DOMINATE', subtitle: 'Scale & Optimize', icon: Crown },
];

export function Services() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <Typography variant="h1" uppercase className="mb-4">
              The Itinerary
            </Typography>
            <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto">
              Seven waypoints from vision to victory. Our operational methodology refined through 
              13 years of charting impossible courses.
            </Typography>
          </div>
        </FadeIn>

        {/* Itinerary Timeline - Vertical Scroll Reveal */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-black" />

            {/* Vertical Layout */}
            <div className="space-y-8 md:space-y-12">
              {services.map((service, index) => (
                <FadeIn key={service.title} delay={index * 0.1}>
                  <div className="flex items-start gap-6 md:gap-8 group">
                    {/* Step Marker */}
                    <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 bg-black text-white flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black group-hover:border-2 group-hover:border-black transition-all">
                      <service.icon className="w-5 h-5 md:w-7 md:h-7" strokeWidth={1.5} />
                    </div>
                    {/* Content */}
                    <div className="pt-1 md:pt-3">
                      <Typography variant="h4" uppercase className="mb-1">
                        {service.title}
                      </Typography>
                      <Typography variant="body" className="text-grey-500">
                        {service.subtitle}
                      </Typography>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        <FadeIn delay={0.8}>
          <div className="text-center mt-16">
            <Link href="/services">
              <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-black text-black hover:bg-black hover:text-white transition-all">
                View Full Itinerary
              </button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
