'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';
import { TeamMemberCard } from '@/components/ui/TeamMemberCard';

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'Julian Clarkson',
      alias: 'Captain J. Sea',
      role: 'Founder & Captain, Operations',
      location: 'Tampa, FL',
      yearsExperience: '13+',
      founded: 'July 2023',
      bio: 'Survived 13 years in the trenches where hospitality, live entertainment, and experiential marketing collide—across 52 countries and counting. Fluent in chaos management, deadline alchemy, and the ancient art of making impossible timelines work. Powered by basslines, passport stamps, and an inexplicable talent for throwing axes with alarming accuracy. Builds systems, breaks personal records, and founded this ship because someone had to.',
    },
    {
      name: 'Position Vacant',
      alias: 'The Ledger Keeper',
      role: 'Captain, Finance',
      location: 'Last seen: The Bermuda Triangle',
      yearsExperience: '???',
      bio: 'Our finance captain vanished mid-audit, leaving only a perfectly balanced spreadsheet and a cryptic note: "The numbers don\'t lie, but they do hide." We seek someone who can navigate treacherous fiscal waters and find treasure where others see only red ink.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Signal Flare',
      role: 'Captain, Marketing',
      location: 'Last transmission: Unknown coordinates',
      yearsExperience: '???',
      bio: 'Disappeared while chasing the perfect campaign into uncharted digital waters. Their final message spoke of "viral currents" and "engagement storms." We need a navigator who can chart courses through the noise and make our signal impossible to ignore.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Code Keeper',
      role: 'Captain, Technology',
      location: 'Last ping: Deep in the cloud',
      yearsExperience: '???',
      bio: 'Went searching for the mythical "zero-bug deployment" and never returned. Legend says they\'re still out there, debugging the fabric of reality itself. We seek a technologist brave enough to build systems that don\'t just work—they transcend.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Deal Hunter',
      role: 'Director, Business Development',
      location: 'Last known: Networking event, dimension unknown',
      yearsExperience: '???',
      bio: 'Followed a promising lead through a door that shouldn\'t have existed. Rumor has it they\'re closing deals in parallel universes. We need someone who can forge alliances, open doors, and bring opportunities back from the impossible.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Crew Whisperer',
      role: 'Director, Human Resources',
      location: 'Last seen: Between the lines of a contract',
      yearsExperience: '???',
      bio: 'Vanished while mediating a dispute between past and future selves. Left behind a handbook titled "Managing Chaos with Compassion." We seek someone who understands that our greatest asset walks out the door every night—and chooses to return.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Vision Weaver',
      role: 'Director, Creative',
      location: 'Last sighting: The edge of imagination',
      yearsExperience: '???',
      bio: 'Chased a concept so beautiful it pulled them into the abstract. Their sketchbook remains, filled with ideas that seem to move when you\'re not looking. We need a creative force who can translate the impossible into the unforgettable.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Timeline Tamer',
      role: 'Director, Production',
      location: 'Last report: Somewhere between load-in and strike',
      yearsExperience: '???',
      bio: 'Disappeared into a production schedule so complex it created its own gravity. Some say they\'re still there, eternally optimizing. We seek a production master who can bend timelines, wrangle chaos, and deliver the impossible on schedule.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Moment Architect',
      role: 'Director, Experience',
      location: 'Last known: Inside a perfect moment',
      yearsExperience: '???',
      bio: 'Stepped into an experience so immersive they became part of it. Witnesses report seeing them in the corner of extraordinary moments worldwide. We need someone who designs feelings, engineers wonder, and makes memories that last lifetimes.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Welcome Keeper',
      role: 'Director, Hospitality',
      location: 'Last seen: The perfect guest experience',
      yearsExperience: '???',
      bio: 'Created a welcome so warm guests never wanted to leave—including themselves. They say the best hospitality makes you feel at home anywhere. We seek someone who turns strangers into guests and guests into family.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Flavor Seeker',
      role: 'Director, Food & Beverage',
      location: 'Last tasted: A recipe lost to time',
      yearsExperience: '???',
      bio: 'Followed a legendary recipe into the mists of culinary history. Their last dispatch mentioned "the perfect pairing" and "flavors that tell stories." We need someone who understands that every bite and sip is part of the experience.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Canvas Commander',
      role: 'Director, Art',
      location: 'Last brushstroke: Beyond the frame',
      yearsExperience: '???',
      bio: 'Painted a doorway and walked through it. Their installations still hum with energy, waiting for direction. We seek an artist who can transform spaces, challenge perceptions, and make the invisible visible.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Star Finder',
      role: 'Director, Talent',
      location: 'Last spotted: Backstage, everywhere',
      yearsExperience: '???',
      bio: 'Went searching for undiscovered talent and found a constellation of performers in an unmarked dimension. We need someone who can spot brilliance before it knows itself and build rosters that define eras.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Order Keeper',
      role: 'Coordinator, Administration',
      location: 'Last filed: Cabinet 7, Row Unknown',
      yearsExperience: '???',
      bio: 'Organized a filing system so efficient it achieved sentience and absorbed them. Their systems still run flawlessly. We seek someone who finds peace in process, beauty in organization, and keeps the ship running while others chase glory.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Schedule Sage',
      role: 'Coordinator, Production',
      location: 'Last update: Call sheet from tomorrow',
      yearsExperience: '???',
      bio: 'Synchronized so many moving parts they became one with the production timeline. Occasionally spotted in the margins of call sheets. We need someone who thrives in controlled chaos and makes complexity look effortless.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Path Finder',
      role: 'Coordinator, Logistics',
      location: 'Last tracked: En route, always',
      yearsExperience: '???',
      bio: 'Optimized a delivery route so perfectly they looped into a logistics paradox. Packages they sent still arrive exactly on time. We seek someone who sees solutions in supply chains and finds the fastest path through any obstacle.',
      vacant: true,
    },
    {
      name: 'Position Vacant',
      alias: 'The Journey Planner',
      role: 'Coordinator, Travel',
      location: 'Last itinerary: Destination redacted',
      yearsExperience: '???',
      bio: 'Booked a flight with no return date and found something worth staying for. Their travel hacks are still whispered in airport lounges worldwide. We need someone who turns logistics nightmares into seamless journeys.',
      vacant: true,
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
                <Typography variant="hero" className="text-white mb-4" uppercase>
                  The Skeleton Crew
                </Typography>
                <Typography variant="h3" className="text-grey-400 mb-6">
                  Overqualified. Underestimated. Dangerously caffeinated.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  Every crew member brings battle-tested expertise from high-stakes productions where failure wasn&apos;t 
                  an option. We deliver under pressure, know what&apos;s worth fighting for and what&apos;s not worth the risk.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Team Members */}
        <section className="py-24 bg-white">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {teamMembers.map((member, index) => (
                <FadeIn key={`${member.role}-${index}`} delay={index * 0.1}>
                  <TeamMemberCard
                    name={member.name}
                    alias={member.alias}
                    role={member.role}
                    location={member.location}
                    yearsExperience={member.yearsExperience}
                    founded={member.founded}
                    bio={member.bio}
                    vacant={member.vacant}
                  />
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
                <div className="border-2 border-white p-6 sm:p-8 md:p-12">
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
                  showtime, we show up. Every time. No exceptions. We&apos;re not a family. We&apos;re a crew. 
                  Families have to keep you. Crews choose to sail together.
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
