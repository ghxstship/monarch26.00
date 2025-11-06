'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

export default function ATLVSPage() {
  const features = [
    {
      title: 'Project Management',
      description: 'Comprehensive tools for managing complex experiential projects from concept to completion.',
    },
    {
      title: 'Resource Allocation',
      description: 'Intelligent resource management and scheduling across multiple projects and teams.',
    },
    {
      title: 'Budget Tracking',
      description: 'Real-time budget monitoring and financial reporting for complete cost control.',
    },
    {
      title: 'Team Collaboration',
      description: 'Seamless collaboration tools for distributed teams working across time zones.',
    },
    {
      title: 'Vendor Management',
      description: 'Centralized vendor database with performance tracking and contract management.',
    },
    {
      title: 'Timeline Visualization',
      description: 'Interactive Gantt charts and timeline views for project planning and tracking.',
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
                ATLVS
              </Typography>
              <Typography variant="h2" uppercase className="text-grey-400 mb-8">
                Experiential Project Management Platform
              </Typography>
              <div className="max-w-4xl">
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed mb-8">
                  ATLVS is the industry&apos;s most comprehensive project management platform designed 
                  specifically for experiential production. Built by producers, for producers, ATLVS 
                  streamlines every aspect of project management from initial concept to final strike.
                </Typography>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                    Visit ATLVS.one
                  </Button>
                  <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                    Request Demo
                  </Button>
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
                  Everything you need to manage complex experiential projects in one powerful platform.
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
                  Built for Professionals
                </Typography>
                <Typography variant="body" className="text-grey-400 text-lg leading-relaxed mb-6">
                  ATLVS is designed for experiential production professionals who demand precision, 
                  efficiency, and control. Whether you&apos;re managing a single activation or coordinating 
                  a global tour, ATLVS scales to meet your needs.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-lg leading-relaxed">
                  Join leading production companies, agencies, and brands who trust ATLVS to manage 
                  their most critical projects.
                </Typography>
              </SlideUp>
              <SlideUp delay={0.2}>
                <div className="space-y-4">
                  {['Production Companies', 'Event Agencies', 'Brand Teams', 'Venue Operators', 'Festival Producers'].map((user) => (
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
                  ATLVS was born from GHXSTSHIP&apos;s need for a better way to manage complex experiential 
                  projects. Today, it powers our operations and is available to the industry. When you work 
                  with GHXSTSHIP, you get direct access to ATLVS for seamless project collaboration.
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
                Ready to Transform Your Workflow?
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-8">
                Experience the power of ATLVS with a personalized demo.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                  Request Demo
                </Button>
                <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                  Visit ATLVS.one
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
