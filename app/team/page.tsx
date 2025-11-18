'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'Captain Jay Sea',
      role: 'CXO',
      bio: 'Founder. 13 years operating at the intersection of hospitality, live entertainment, and experiential marketing across 52 countries. Former F&B Operations Manager for Formula 1 Las Vegas Grand Prix. Production experience with Insomniac, F1, PATRÓN, Heineken, and Red Bull.',
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-black text-white">
          <Container>
            <SlideUp>
              <div className="text-center max-w-3xl mx-auto">
                <Typography variant="hero" className="text-white mb-6" uppercase>
                  The Crew
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  The people who navigate the impossible. Every crew member brings battle-tested expertise 
                  from high-stakes productions where failure wasn&apos;t an option. We&apos;ve built teams 
                  that deliver under pressure, solve problems at 3 AM, and turn &quot;that can&apos;t be done&quot; 
                  into &quot;when do you need it by?&quot;
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Team Members */}
        <section className="py-24 bg-white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {teamMembers.map((member, index) => (
                <FadeIn key={member.name} delay={index * 0.1}>
                  <div className="border-2 border-black p-8 h-full flex flex-col">
                    {/* Placeholder for team member photo */}
                    <div className="w-full aspect-square bg-grey-200 mb-6 flex items-center justify-center">
                      <Typography variant="h4" className="text-grey-500" uppercase>
                        Photo
                      </Typography>
                    </div>
                    
                    <Typography variant="h3" uppercase className="mb-2">
                      {member.name}
                    </Typography>
                    
                    <Typography variant="h6" uppercase className="text-grey-600 mb-4">
                      {member.role}
                    </Typography>
                    
                    <Typography variant="body" className="text-grey-700 leading-relaxed">
                      {member.bio}
                    </Typography>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* Careers Section */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SlideUp>
                <div className="text-center mb-12">
                  <Typography variant="h1" uppercase className="text-white mb-6">
                    Join the Crew
                  </Typography>
                  <Typography variant="body" className="text-grey-400 text-lg leading-relaxed mb-8">
                    We&apos;re building a crew of problem-solvers, innovators, and operators who thrive under pressure. 
                    If you&apos;ve got production experience, technical expertise, or creative vision—and you&apos;re ready 
                    to work on projects that push boundaries—we want to hear from you.
                  </Typography>
                </div>
              </SlideUp>

              <SlideUp delay={0.2}>
                <div className="border-2 border-white p-8 md:p-12">
                  <Typography variant="h3" uppercase className="text-white mb-6">
                    What We&apos;re Looking For
                  </Typography>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      'Production managers who&apos;ve managed multi-site operations',
                      'Technical directors with festival and event experience',
                      'Creative designers who understand feasibility constraints',
                      'Project coordinators who excel at logistics',
                      'Fabricators and builders who solve impossible problems',
                      'AV technicians with integrated systems expertise',
                    ].map((item) => (
                      <li key={item}>
                        <Typography variant="body" className="text-grey-400">
                          • {item}
                        </Typography>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center">
                    <Link href="/careers">
                      <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all">
                        View Open Positions
                      </button>
                    </Link>
                  </div>
                </div>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* Culture Section */}
        <section className="py-24 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <SlideUp>
                <Typography variant="h2" uppercase className="mb-6">
                  Our Culture
                </Typography>
                <Typography variant="body" className="text-grey-700 text-lg leading-relaxed mb-8">
                  We operate at the intersection of precision and creativity. Every project demands technical 
                  excellence, operational discipline, and creative problem-solving. We value crew members who 
                  bring expertise, take ownership, and deliver results—especially when the timeline seems impossible 
                  and the budget is tight.
                </Typography>
                <Typography variant="body" className="text-grey-700 text-lg leading-relaxed">
                  Remote-friendly for the right roles. Global operations mean flexible schedules. But when it&apos;s 
                  showtime, we show up. Every time. No exceptions.
                </Typography>
              </SlideUp>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
