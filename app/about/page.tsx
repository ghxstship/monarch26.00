'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';
import { Waves, Snowflake, Music, Ship, Palmtree, Tent, Ghost, Anchor } from 'lucide-react';
import { TeamMemberCard } from '@/components/ui/TeamMemberCard';

export default function AboutPage() {
  const stats = [
    { value: '13+', label: 'Years Experience' },
    { value: '52', label: 'Countries Traveled' },
    { value: '1000+', label: 'Experiences Created' },
    { value: '5M+', label: 'Memories Made' },
  ];

  const partners = [
    'Red Bull',
    'Celebrity Cruise Line',
    'Insomniac',
    'Carnival Cruise Line',
    'PATRÓN',
    'Live Nation',
    'Formula 1',
    'Norwegian Cruise Line',
    'Heineken',
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="min-h-screen py-24 bg-black text-white flex items-center">
          <Container>
            <SlideUp>
              <Typography variant="hero" className="text-white mb-4" uppercase>
                The Origin Story
              </Typography>
              <Typography variant="h3" className="text-grey-400 mb-12">
                Every empire starts somewhere. Ours started with a &quot;hold my beer&quot; moment.
              </Typography>
              
              {/* Prologue Section */}
              <div className="max-w-4xl mb-16">
                <Typography variant="h2" className="text-white mb-8 italic">
                  Prologue | Forged by Failure
                </Typography>
                
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed mb-6">
                  Every legend starts somewhere. This one started with a kid who could read sheet music before 
                  he could read maps—and ended up navigating experiences across continents. Five woodwinds mastered 
                  at Indiana University. Classical training that taught precision, discipline, and the art of performing 
                  under pressure. But concert halls don&apos;t prepare you for festival grounds at 3 AM when the main 
                  stage rigging fails and thousands of people are waiting.
                </Typography>
                
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed mb-6">
                  The cruise ships came first. Carnival, Celebrity, Norwegian—floating cities where entertainment never 
                  stops and failure isn&apos;t an option. Started as a musician. Became a DJ. Then somehow ended up 
                  supervising talent acquisition across oceans and time zones. Built a casting system that turned 
                  weeks into minutes. Not because we were smart—because we had to. When you&apos;re sourcing talent 
                  across dozens of countries and the old system is drowning, you either innovate or quit. We didn&apos;t quit.
                </Typography>
                
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed mb-6">
                  Then came the festivals. Insomniac. EDC. Massive crowds. Bigger productions. Audio, lighting, video, 
                  staging—all the technical systems that make or break a show. Learned that festival production is just 
                  controlled chaos with better insurance. Streamlined operations. Built communication platforms. Connected 
                  internal teams with external contractors. Reduced timelines. Maintained world-class standards. And discovered 
                  that sleep is optional when showtime is non-negotiable.
                </Typography>
                
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed mb-6">
                  Formula 1 Las Vegas changed everything. Managing hospitality operations across premium venues for the 
                  inaugural Grand Prix. International clientele. Celebrities. Athletes. Entertainment executives. The kind 
                  of high-stakes environment where one mistake becomes international news. Where perfect execution isn&apos;t 
                  celebrated—it&apos;s expected. We didn&apos;t make mistakes. We made memories.
                </Typography>
                
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed mb-6">
                  The brand activations taught us scale. Heineken&apos;s Turn 4 Nightclub at F1. Red Bull&apos;s Unforeseen 
                  Motel at III Points Miami. PATRÓN Cristalino&apos;s North American launch with Becky G. Fortune 500 brands 
                  that demand operational excellence and zero margin for error. Each activation a masterclass in logistics, 
                  creativity, and making the impossible look inevitable. Each one a reminder that the difference between 
                  legendary and forgotten is usually just better execution.
                </Typography>
                
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed mb-6">
                  Factory Town and Salvage City Supper Club became the proving grounds. Venues that never sleep. Operations 
                  that run around the clock. Integrating live entertainment with luxury dining for festival crowds that expect 
                  perfection. Every failure taught something. Every impossible deadline revealed what&apos;s actually possible. 
                  Every 3 AM emergency added another story we probably shouldn&apos;t tell clients. Every crisis became a case 
                  study in what happens when you refuse to accept &quot;it can&apos;t be done.&quot;
                </Typography>
                
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed">
                  That accumulated knowledge became GHXSTSHIP. Founded April 2023. From classical musician to cruise line 
                  casting supervisor to festival producer to brand strategist to technical architect—every chapter built the 
                  next. Every lesson compounded. Every gray hair earned. Every failure forged the foundation for what comes next. 
                  This is how impossible became inevitable. This is how we learned to navigate the uncharted.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-white">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <FadeIn key={stat.label} delay={index * 0.1}>
                  <div className="text-center border-2 border-black p-4 sm:p-6 md:p-8 flex flex-col justify-center min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
                    <Typography variant="hero" className="mb-3 leading-none">
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" uppercase className="text-sm md:text-base leading-tight">
                      {stat.label}
                    </Typography>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* Founder Section */}
        <section className="py-24 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SlideUp>
                <Typography variant="h2" uppercase className="mb-12 text-center">
                  The Founder
                </Typography>
                <TeamMemberCard
                  name="Julian Clarkson"
                  alias="Captain J. Sea"
                  role="CXO & Founder"
                  location="Tampa, FL"
                  yearsExperience="13+"
                  founded="July 2023"
                  bio="13 years operating at the intersection of hospitality, live entertainment, and experiential marketing across 52 countries. Former F&B Operations Manager for Formula 1 Las Vegas Grand Prix. Production experience with Insomniac, F1, PATRÓN, Heineken, and Red Bull. Every challenging install taught something. Every impossible deadline revealed what's actually possible. That accumulated knowledge became GHXSTSHIP. From classical musician to cruise director to festival producer to brand strategist to technical architect—every chapter built the next."
                />
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* The Journey Timeline */}
        <section className="py-24 bg-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h1" uppercase className="mb-4">
                  The Journey
                </Typography>
                <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto">
                  From classical concert halls to cruise ships to festival grounds to motorsport hospitality—every 
                  port of call taught lessons that became operational advantages. This is the voyage that forged GHXSTSHIP.
                </Typography>
              </div>
            </FadeIn>

            {/* Vertical Timeline */}
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-black transform md:-translate-x-1/2" />

                {/* Timeline Items */}
                {[
                  {
                    date: 'June 1990',
                    location: 'California',
                    title: 'First Port: San Diego',
                    description: 'The vessel launched. A kid who could read sheet music before maps set sail.',
                    Icon: Waves,
                  },
                  {
                    date: 'January 1996',
                    location: 'Minnesota',
                    title: 'Northern Waters',
                    description: 'Navigated to colder climates. Learned that ice and snow build character.',
                    Icon: Snowflake,
                  },
                  {
                    date: 'August 2008',
                    location: 'Indiana',
                    title: 'Indiana University',
                    description: 'Classical musician learning precision and adaptability under pressure. Concert halls became the first stage.',
                    Icon: Music,
                  },
                  {
                    date: 'January 2012',
                    location: 'Cruise Ships',
                    title: 'Open Ocean',
                    description: 'Entertainment at scale—systems that work across floating cities. Carnival taught us hospitality without borders.',
                    Icon: Ship,
                  },
                  {
                    date: 'December 2015',
                    location: 'Miami',
                    title: 'Gateway Port',
                    description: 'Docked in the cruise capital. Where the Caribbean meets production excellence.',
                    Icon: Palmtree,
                  },
                  {
                    date: 'December 2018',
                    location: 'Orlando',
                    title: 'Festival Grounds',
                    description: 'Festival production mastery with Insomniac. 50,000+ capacity venues and impossible logistics became routine.',
                    Icon: Tent,
                  },
                  {
                    date: 'July 2023',
                    location: 'Dry Dock',
                    title: 'GHXSTSHIP Launches',
                    description: 'Every lesson, every failure, every impossible deadline—all distilled into something new. The ship sets sail.',
                    Icon: Ghost,
                  },
                  {
                    date: 'October 2025',
                    location: 'Tampa',
                    title: 'Current Coordinates',
                    description: 'Home port established. Building the future of experiential innovation from the Gulf Coast.',
                    Icon: Anchor,
                  },
                ].map((milestone, index) => (
                  <SlideUp key={milestone.date} delay={index * 0.1}>
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
                            index % 2 === 0 ? 'md:flex md:justify-end' : 'md:flex md:justify-start'
                          }`}>
                            <milestone.Icon size={40} className="text-black" strokeWidth={1.5} />
                          </div>
                          
                          {/* Date & Location */}
                          <div className={`mb-2 ${
                            index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                          }`}>
                            <Typography variant="meta" className="text-grey-500 uppercase tracking-wider">
                              {milestone.date}
                            </Typography>
                          </div>
                          
                          {/* Title */}
                          <Typography 
                            variant="h4" 
                            uppercase 
                            className={`mb-2 ${
                              index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                            }`}
                          >
                            {milestone.title}
                          </Typography>
                          
                          {/* Location Badge */}
                          <div className={`mb-3 ${
                            index % 2 === 0 ? 'md:flex md:justify-end' : 'md:flex md:justify-start'
                          }`}>
                            <span className="inline-block px-3 py-1 bg-black text-white text-xs uppercase tracking-wider">
                              {milestone.location}
                            </span>
                          </div>
                          
                          {/* Description */}
                          <Typography 
                            variant="body" 
                            className={`text-grey-700 ${
                              index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                            }`}
                          >
                            {milestone.description}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </SlideUp>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Partners Section */}
        <section className="py-24 bg-black text-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h2" uppercase className="text-white mb-4">
                  We&apos;ve Navigated With
                </Typography>
                <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto">
                  Production experience with brands that demand operational excellence and zero margin for error. 
                  We delivered. They came back. That&apos;s the whole pitch.
                </Typography>
              </div>
            </FadeIn>
            <div className="flex flex-wrap justify-center gap-12">
              {partners.map((partner, index) => (
                <FadeIn key={partner} delay={index * 0.1}>
                  <Typography variant="h3" uppercase className="text-white">
                    {partner}
                  </Typography>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
