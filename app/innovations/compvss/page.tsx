'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

export default function COMPVSSPage() {
  const features = [
    {
      title: 'Crew Scheduling',
      description: 'Advanced scheduling system for managing crew availability, shifts, and assignments across multiple events.',
    },
    {
      title: 'Certification Tracking',
      description: 'Automated tracking of crew certifications, licenses, and training requirements with expiration alerts.',
    },
    {
      title: 'Equipment Management',
      description: 'Comprehensive inventory management for tracking equipment, maintenance schedules, and deployment.',
    },
    {
      title: 'Logistics Coordination',
      description: 'Streamlined logistics planning for transportation, accommodation, and on-site operations.',
    },
    {
      title: 'Time Tracking',
      description: 'Accurate time tracking and payroll integration for crew hours, overtime, and project costing.',
    },
    {
      title: 'Performance Analytics',
      description: 'Data-driven insights into crew performance, utilization rates, and operational efficiency.',
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="min-h-screen bg-black text-white flex items-center">
          <Container>
            <SlideUp>
              <Typography variant="hero" className="text-white mb-6" uppercase>
                COMPVSS
              </Typography>
              <Typography variant="h2" uppercase className="text-grey-400 mb-8">
                Experiential Team (Operations) Management
              </Typography>
              <div className="max-w-4xl">
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed mb-8">
                  COMPVSS is the comprehensive operations management platform designed for experiential 
                  teams. Built to handle the complexities of crew management, equipment tracking, and 
                  logistics coordination, COMPVSS ensures your operations run smoothly from load-in to strike.
                </Typography>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                      Request Demo
                    </Button>
                  </Link>
                  <Link href="/innovations">
                    <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                      View All Products
                    </Button>
                  </Link>
                </div>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Features */}
        <section className="py-24 bg-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h2" uppercase className="mb-4">
                  Platform Features
                </Typography>
                <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto">
                  Everything you need to manage experiential operations and teams in one powerful platform.
                </Typography>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <SlideUp key={feature.title} delay={index * 0.1}>
                  <div className="border-2 border-black p-8">
                    <Typography variant="h4" uppercase className="mb-4">
                      {feature.title}
                    </Typography>
                    <Typography variant="body" className="text-grey-700">
                      {feature.description}
                    </Typography>
                  </div>
                </SlideUp>
              ))}
            </div>
          </Container>
        </section>

        {/* Target Users */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-white mb-6">
                  Built for Operations Teams
                </Typography>
                <Typography variant="body" className="text-grey-400 text-lg leading-relaxed mb-6">
                  COMPVSS is designed for operations managers, crew coordinators, and logistics professionals 
                  who need to manage complex teams and resources. Whether you&apos;re coordinating a single 
                  event or managing operations across multiple venues, COMPVSS scales to meet your needs.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-lg leading-relaxed">
                  Join leading production companies and event teams who trust COMPVSS to manage their 
                  operations and crew.
                </Typography>
              </SlideUp>
              <SlideUp delay={0.2}>
                <div className="space-y-4">
                  {['Operations Managers', 'Crew Coordinators', 'Logistics Teams', 'Production Companies', 'Event Venues'].map((user) => (
                    <div key={user} className="border-2 border-white p-6">
                      <Typography variant="h5" uppercase className="text-white">
                        {user}
                      </Typography>
                    </div>
                  ))}
                </div>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* Integration */}
        <section className="py-24 bg-white">
          <Container maxWidth="lg">
            <SlideUp>
              <div className="text-center">
                <Typography variant="h2" uppercase className="mb-6">
                  GHXSTSHIP Integration
                </Typography>
                <Typography variant="body" className="text-grey-700 text-lg leading-relaxed max-w-3xl mx-auto">
                  COMPVSS was developed from GHXSTSHIP&apos;s need to efficiently manage crew, equipment, 
                  and operations across multiple projects. Today, it powers our operations management and 
                  is available to the industry. When you work with GHXSTSHIP, you get direct access to 
                  COMPVSS for seamless operations coordination.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="text-center">
              <Typography variant="h1" uppercase className="text-white mb-6">
                Ready to Optimize Your Operations?
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-8">
                Experience the power of COMPVSS with a personalized demo.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                    Request Demo
                  </Button>
                </Link>
                <Link href="/innovations">
                  <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                    View All Products
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
