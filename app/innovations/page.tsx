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
    id: 'gvteway',
    name: 'GVTEWAY',
    tagline: 'Experiential Ticketing (Memberships) & Communities',
    description: 'Seamless client collaboration platform that keeps everyone aligned. Share updates, approve deliverables, and track progress in real-time.',
    features: [
      'Client Dashboard',
      'File Sharing',
      'Approval Workflows',
      'Communication Hub',
      'Project Timeline',
      'Asset Library',
    ],
    status: 'Coming Soon',
    href: '/innovations/gvteway',
  },
  {
    id: 'atlvs',
    name: 'ATLVS',
    tagline: 'Experiential Project (Production) Management',
    description: 'Enterprise-grade production management software designed for experiential agencies. Streamline your workflow from concept to strike.',
    features: [
      'Project Management',
      'Resource Allocation',
      'Budget Tracking',
      'Team Collaboration',
      'Real-time Updates',
      'Analytics Dashboard',
    ],
    status: 'Coming Soon',
    href: '/innovations/atlvs',
  },
  {
    id: 'compvss',
    name: 'COMPVSS',
    tagline: 'Experiential Team (Operations) Management',
    description: 'Comprehensive operations management platform for experiential teams. Optimize crew scheduling, track certifications, and manage logistics seamlessly.',
    features: [
      'Crew Scheduling',
      'Certification Tracking',
      'Equipment Management',
      'Logistics Coordination',
      'Time Tracking',
      'Performance Analytics',
    ],
    status: 'Coming Soon',
    href: '/innovations/compvss',
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
                  R&amp;D for the Restless
                </Typography>
                <Typography variant="h3" className="text-grey-400 mb-6">
                  If it already existed, we&apos;d be bored.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  Production management platforms that understand reality, not just project theory. Tools built 
                  by crews who&apos;ve managed load-in at 3 AM, solved problems with duct tape and prayer, and know 
                  what actually matters when everything&apos;s on fire. Metaphorically. Usually.
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
                  <div className="border-2 border-black bg-white p-8 hover:scale-[1.02] transition-transform duration-200">
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

                    <div className="mb-8">
                      <Typography variant="h6" uppercase className="mb-4">
                        Key Features
                      </Typography>
                      <ul className="grid grid-cols-2 gap-3">
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
