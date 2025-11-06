'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

export default function GVTEWAYPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="min-h-screen bg-black text-white flex items-center justify-center">
          <Container>
            <div className="text-center">
              <SlideUp>
                <Typography variant="hero" className="text-white mb-6" uppercase>
                  GVTEWAY
                </Typography>
                <Typography variant="h1" uppercase className="text-white mb-8">
                  Coming Soon
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl max-w-3xl mx-auto mb-12">
                  The next evolution in experiential community management and access control. 
                  GVTEWAY will revolutionize how audiences discover, access, and engage with 
                  experiential events and activations.
                </Typography>
              </SlideUp>

              {/* Geometric Teaser */}
              <SlideUp delay={0.2}>
                <div className="relative w-64 h-64 mx-auto mb-12">
                  <div className="absolute inset-0 border-2 border-white animate-pulse" />
                  <div className="absolute inset-8 border-2 border-white animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute inset-16 border-2 border-white animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* Problem/Solution */}
        <section className="py-24 bg-white">
          <Container>
            <div className="grid md:grid-cols-2 gap-16">
              <FadeIn>
                <Typography variant="h2" uppercase className="mb-6">
                  The Problem
                </Typography>
                <Typography variant="body" className="text-grey-700 text-lg leading-relaxed mb-4">
                  Current ticketing and access systems are fragmented, impersonal, and fail to capture 
                  the full potential of experiential events. Audiences struggle to discover relevant 
                  experiences, and organizers lack tools to build lasting community connections.
                </Typography>
                <Typography variant="body" className="text-grey-700 text-lg leading-relaxed">
                  The experiential industry deserves better.
                </Typography>
              </FadeIn>

              <FadeIn delay={0.2}>
                <Typography variant="h2" uppercase className="mb-6">
                  The Solution
                </Typography>
                <Typography variant="body" className="text-grey-700 text-lg leading-relaxed mb-4">
                  GVTEWAY will be a comprehensive platform that combines ticketing, access control, 
                  community management, and discovery—all designed specifically for the experiential 
                  industry.
                </Typography>
                <Typography variant="body" className="text-grey-700 text-lg leading-relaxed">
                  More than just tickets. A gateway to unforgettable experiences.
                </Typography>
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* Vision */}
        <section className="py-24 bg-black text-white">
          <Container maxWidth="lg">
            <SlideUp>
              <div className="text-center mb-16">
                <Typography variant="h2" uppercase className="text-white mb-6">
                  Our Vision
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed max-w-3xl mx-auto">
                  GVTEWAY will transform how people discover and access experiential events, creating 
                  a seamless connection between audiences and the experiences they crave. Built on the 
                  same principles that power ATLVS—by industry professionals, for the industry.
                </Typography>
              </div>
            </SlideUp>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Discovery', desc: 'Personalized recommendations for experiential events' },
                { title: 'Access', desc: 'Seamless ticketing and entry management' },
                { title: 'Community', desc: 'Build lasting connections with your audience' },
              ].map((item, index) => (
                <FadeIn key={item.title} delay={index * 0.1}>
                  <div className="border-2 border-white p-8 text-center">
                    <Typography variant="h4" uppercase className="text-white mb-4">
                      {item.title}
                    </Typography>
                    <Typography variant="body" className="text-grey-400">
                      {item.desc}
                    </Typography>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* Email Signup */}
        <section className="py-24 bg-white">
          <Container maxWidth="md">
            <SlideUp>
              <div className="text-center mb-12">
                <Typography variant="h2" uppercase className="mb-4">
                  Be the First to Know
                </Typography>
                <Typography variant="body" className="text-grey-600">
                  Join the waitlist to get early access and exclusive updates on GVTEWAY&apos;s development.
                </Typography>
              </div>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="Your first name"
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Your last name"
                  />
                </div>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                />
                <Input
                  label="Company"
                  name="company"
                  type="text"
                  placeholder="Your company (optional)"
                />
                <Button type="submit" variant="filled" size="lg" className="w-full">
                  Join Waitlist
                </Button>
              </form>
            </SlideUp>
          </Container>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="text-center">
              <Typography variant="h2" uppercase className="text-white mb-6">
                Launch Timeline
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-12">
                We&apos;re building GVTEWAY with the same attention to detail and industry expertise 
                that defines all GHXSTSHIP products. Stay tuned for updates.
              </Typography>
              <Typography variant="meta" uppercase className="text-grey-500">
                Expected Launch: 2025
              </Typography>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
