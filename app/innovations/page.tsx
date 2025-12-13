'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';
import Link from 'next/link';

const innovations = [
  {
    id: 'atlvs',
    name: 'ATLVS',
    tagline: 'Experiential Project & Resource Management',
    description: 'Production management built for experiential agencies. From initial concept to final strike, orchestrate every detail with precision—budgets, timelines, resources, and team coordination in perfect sync.',
    features: [
      'End-to-End Project Management',
      'Live Budget Tracking & Forecasting',
      'Instant Status Updates',
      'Intelligent Resource Allocation',
      'Seamless Team Collaboration',
      'Actionable Analytics Dashboard',
    ],
    status: 'Coming Soon',
    href: '/innovations/atlvs',
  },
  {
    id: 'compvss',
    name: 'COMPVSS',
    tagline: 'Experiential Team & Workforce Management',
    description: 'Your crew operations nerve center. Schedule teams, track certifications, coordinate logistics, and monitor performance—everything you need to deploy the right people at the right time.',
    features: [
      'Smart Crew Scheduling',
      'Equipment & Inventory Management',
      'Automated Time Tracking',
      'Certification & Compliance Tracking',
      'Multi-Site Logistics Coordination',
      'Real-Time Performance Analytics',
    ],
    status: 'Coming Soon',
    href: '/innovations/compvss',
  },
  {
    id: 'gvteway',
    name: 'GVTEWAY',
    tagline: 'Experiential Ticketing & Social Communities',
    description: 'The ultimate fan experience platform. Discover events, secure tickets, unlock exclusive memberships, and connect with communities who share your passions—all in one seamless destination.',
    features: [
      'Event Discovery & Search',
      'Ticket Management & Transfers',
      'Membership & Rewards Programs',
      'Community & Fan Engagement',
      'Artist & Venue Profiles',
      'Personalized Recommendations',
    ],
    status: 'Coming Soon',
    href: '/innovations/gvteway',
  },
];

export default function InnovationsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-black text-white">
          <Container>
            <SlideUp>
              <div className="text-center max-w-3xl mx-auto">
                <Typography variant="hero" className="text-white mb-4" uppercase>
                  Innovations
                </Typography>
                <Typography variant="h3" className="text-grey-400 mb-6">
                  If it already existed, we&apos;d be bored.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  Production management platforms that understand reality, not just project theory. Tools built 
                  by veterans who&apos;ve wrangled 47 departments into harmony and know when to say no.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Innovations Grid */}
        <section className="py-24 bg-white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {innovations.map((innovation, index) => (
                <FadeIn key={innovation.id} delay={index * 0.1}>
                  <div className="border-2 border-black bg-white p-8 hover:scale-[1.02] transition-transform duration-200 h-full flex flex-col">
                    <div className="mb-6">
                      <div className="flex items-start justify-between mb-4">
                        <Typography variant="h2" uppercase>
                          {innovation.name}
                        </Typography>
                        <span className="font-bebas uppercase text-sm px-3 py-1 border-2 border-black">
                          {innovation.status}
                        </span>
                      </div>
                      <Typography variant="h5" uppercase className="text-grey-600 mb-4">
                        {innovation.tagline}
                      </Typography>
                      <Typography variant="body" className="text-grey-700 mb-6">
                        {innovation.description}
                      </Typography>
                    </div>

                    <div className="mb-8 flex-grow">
                      <Typography variant="h6" uppercase className="mb-4">
                        Key Features
                      </Typography>
                      <ul className="flex flex-col gap-2">
                        {innovation.features.map((feature) => (
                          <li key={feature}>
                            <Typography variant="body" className="text-grey-700">
                              • {feature}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href={innovation.href}>
                      <Button variant="outlined" size="lg" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="text-center">
              <Typography variant="h1" uppercase className="text-white mb-6">
                Interested in Early Access?
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-8">
                Be among the first to experience our production tools. 
                Join the waitlist and help shape the future of experiential production software.
              </Typography>
              <Link href="/contact">
                <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                  Join Waitlist
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
