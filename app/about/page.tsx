'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';
import { Waves, Snowflake, Music, Ship, Palmtree, Tent, Ghost, Anchor, HelpCircle } from 'lucide-react';
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
                  The cruise ships came first. Floating cities where entertainment never stops and failure 
                  isn&apos;t an option. Started as a musician. Became a DJ. Then somehow ended up 
                  supervising talent acquisition across oceans and time zones. Built a casting system that turned 
                  weeks into minutes. Not because we were smart—because we had to. When you&apos;re sourcing talent 
                  across dozens of countries and the old system is drowning, you either innovate or quit. We didn&apos;t quit.
                </Typography>
                
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed mb-6">
                  Then came the festivals. Massive crowds. Bigger productions. Audio, lighting, video, 
                  staging—all the technical systems that make or break a show. Learned that festival production is just 
                  controlled chaos with better insurance. Streamlined operations. Built communication platforms. Connected 
                  internal teams with external contractors. Reduced timelines. Maintained world-class standards. And discovered 
                  that sleep is optional when showtime is non-negotiable.
                </Typography>
                
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed mb-6">
                  Motorsport hospitality changed everything. Managing operations across premium venues for an 
                  inaugural Grand Prix. International clientele. Celebrities. Athletes. Entertainment executives. The kind 
                  of high-stakes environment where one mistake becomes international news. Where perfect execution isn&apos;t 
                  celebrated—it&apos;s expected. We didn&apos;t make mistakes. We made memories.
                </Typography>
                
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed mb-6">
                  The brand activations taught us scale. Nightclubs at motorsport events. Immersive experiences 
                  at music festivals. Product launches with global artists. Fortune 500 brands that demand 
                  operational excellence and zero margin for error. Each activation a masterclass in logistics, 
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
                    <Typography variant="h1" className="mb-3 leading-none text-4xl sm:text-5xl md:text-6xl">
                      {stat.value}
                    </Typography>
                    <Typography variant="meta" uppercase className="text-xs sm:text-sm tracking-wider">
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
            <div className="max-w-sm mx-auto">
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

            {/* Journey Timeline */}
            <div className="max-w-6xl mx-auto">
              {/* Timeline Track */}
              <div className="relative">
                {/* Vertical Line - Mobile */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-black lg:hidden" />
                
                {/* Horizontal Line - Desktop */}
                <div className="hidden lg:block absolute left-0 right-0 top-8 h-0.5 bg-black" />

                {/* Desktop: Horizontal Layout */}
                <div className="hidden lg:grid lg:grid-cols-9 gap-2">
                  {[
                    { title: 'Origin', subtitle: 'Newport Beach', date: '1990', Icon: Waves },
                    { title: 'Viking Territory', subtitle: 'Minnesota', date: '1996', Icon: Snowflake },
                    { title: 'The Conservatory', subtitle: 'Indiana', date: '2008', Icon: Music },
                    { title: 'The High Seas', subtitle: 'Intl. Waters', date: '2012', Icon: Ship },
                    { title: 'The 305', subtitle: 'Miami', date: '2015', Icon: Palmtree },
                    { title: 'The Site Yard', subtitle: 'Orlando', date: '2018', Icon: Tent },
                    { title: 'The Ship Yard', subtitle: 'Beyond the Sea', date: '2023', Icon: Ghost },
                    { title: 'Current', subtitle: 'Tampa', date: '2025', Icon: Anchor },
                    { title: 'Unknown', subtitle: 'Classified', date: 'TBD', Icon: HelpCircle },
                  ].map((stop, index) => (
                    <FadeIn key={stop.title} delay={index * 0.1}>
                      <div className="flex flex-col items-center group cursor-pointer">
                        {/* Step Icon */}
                        <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black group-hover:border-2 group-hover:border-black transition-all">
                          <stop.Icon className="w-7 h-7" strokeWidth={1.5} />
                        </div>
                        {/* Title */}
                        <Typography variant="meta" uppercase className="text-center mb-1 text-xs font-bold">
                          {stop.title}
                        </Typography>
                        {/* Subtitle */}
                        <Typography variant="meta" className="text-grey-500 text-center text-[10px]">
                          {stop.subtitle}
                        </Typography>
                        {/* Date */}
                        <Typography variant="meta" className="text-grey-400 text-center text-[10px] mt-1">
                          {stop.date}
                        </Typography>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                {/* Mobile/Tablet: Vertical Layout */}
                <div className="lg:hidden space-y-8">
                  {[
                    { title: 'Origin: Newport Beach', location: 'California', date: 'June 1990', description: 'The vessel launched. A kid who could read sheet music before maps set sail.', Icon: Waves },
                    { title: 'Viking Territory', location: 'Minnesota', date: 'January 1996', description: 'Navigated to colder climates. Learned that ice and snow build character.', Icon: Snowflake },
                    { title: 'The Conservatory', location: 'Indiana', date: 'August 2008', description: 'Classical musician learning precision and adaptability under pressure. Concert halls became the first stage.', Icon: Music },
                    { title: 'The High Seas', location: 'International Waters', date: 'January 2012', description: 'Entertainment at scale—systems that work across floating cities. Cruise lines taught us hospitality without borders.', Icon: Ship },
                    { title: 'The 305', location: 'Miami', date: 'December 2015', description: 'Docked in the cruise capital. Where the Caribbean meets production excellence.', Icon: Palmtree },
                    { title: 'The Site Yard', location: 'Orlando', date: 'December 2018', description: 'Festival production mastery. 50,000+ capacity venues and impossible logistics became routine.', Icon: Tent },
                    { title: 'The Ship Yard', location: 'Somewhere Beyond the Sea', date: 'July 2023', description: 'Every lesson, every failure, every impossible deadline—all distilled into something new. The ship sets sail.', Icon: Ghost },
                    { title: 'Current Coordinates', location: 'Tampa', date: 'October 2025', description: 'Home port established. Building the future of experiential innovation from the Gulf Coast.', Icon: Anchor },
                    { title: 'Destination: Unknown', location: 'Classified', date: 'TBD', description: 'The voyage continues. New waters to chart. New impossibilities to make possible.', Icon: HelpCircle },
                  ].map((milestone, index) => (
                    <FadeIn key={milestone.title} delay={index * 0.05}>
                      <div className="flex items-start gap-6 group">
                        {/* Step Marker */}
                        <div className="relative z-10 w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black group-hover:border-2 group-hover:border-black transition-all">
                          <milestone.Icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        {/* Content */}
                        <div className="pt-1">
                          <Typography variant="meta" className="text-grey-500 uppercase tracking-wider text-xs">
                            {milestone.date}
                          </Typography>
                          <Typography variant="h5" uppercase className="mb-1">
                            {milestone.title}
                          </Typography>
                          <span className="inline-block px-2 py-0.5 bg-black text-white text-[10px] uppercase tracking-wider mb-2">
                            {milestone.location}
                          </span>
                          <Typography variant="body" className="text-grey-600 text-sm">
                            {milestone.description}
                          </Typography>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
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

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <SlideUp>
                <Typography variant="h1" uppercase className="mb-6">
                  Ready to Set Sail?
                </Typography>
                <Typography variant="body" className="text-grey-700 text-lg mb-8">
                  We don&apos;t do &quot;let&apos;s circle back.&quot; We do &quot;let&apos;s make it happen.&quot; 
                  If you&apos;ve got an impossible idea, we&apos;ve got the crew to build it.
                </Typography>
                <a href="/contact">
                  <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-black text-black hover:bg-black hover:text-white transition-all">
                    Board the Ship
                  </button>
                </a>
              </SlideUp>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
