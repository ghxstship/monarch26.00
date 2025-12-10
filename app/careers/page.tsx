'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';
import { 
  Crown, 
  Palette, 
  Megaphone, 
  TrendingUp, 
  Code, 
  Hammer, 
  Settings, 
  Sparkles, 
  UtensilsCrossed, 
  Music,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';

export default function CareersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const values = [
    {
      title: 'Relentless',
      description: 'We don\'t stop when it gets hard. We stop when it\'s done.',
    },
    {
      title: 'Resourceful',
      description: 'Duct tape, prayer, and problem-solving. Whatever it takes.',
    },
    {
      title: 'Real',
      description: 'No politics, no ego. Just work that matters.',
    },
    {
      title: 'Resilient',
      description: '3 AM load-ins build character. So does failure.',
    },
    {
      title: 'Ready',
      description: 'Plans change. We adapt faster.',
    },
  ];

  const realities = [
    {
      reality: 'High-stakes deadlines',
      meaning: 'When the doors open, everything works. Period.',
    },
    {
      reality: 'Travel-heavy roles',
      meaning: 'You\'ll see the world—from the loading dock.',
    },
    {
      reality: 'Controlled chaos',
      meaning: 'Plans change hourly. Flexibility isn\'t optional.',
    },
    {
      reality: 'Small team, big impact',
      meaning: 'Your decisions matter. So do your mistakes.',
    },
    {
      reality: 'Post-event recovery',
      meaning: 'We work hard, then we rest. Shore leave is real.',
    },
  ];

  const departments = [
    {
      name: 'Executive',
      description: 'The bridge. Strategy, vision, and steering the ship through uncharted waters.',
      icon: Crown,
    },
    {
      name: 'Creative',
      description: 'The visionaries. Concepts, environments, and experiences that don\'t exist yet.',
      icon: Palette,
    },
    {
      name: 'Marketing',
      description: 'The storytellers. Brand voice, campaigns, and making noise that matters.',
      icon: Megaphone,
    },
    {
      name: 'Revenue',
      description: 'The dealmakers. Partnerships, sales, and sustainable growth.',
      icon: TrendingUp,
    },
    {
      name: 'Technology',
      description: 'The architects. Systems, platforms, and digital infrastructure.',
      icon: Code,
    },
    {
      name: 'Production',
      description: 'The orchestrators. Timelines, budgets, logistics, and vendor relationships.',
      icon: Hammer,
    },
    {
      name: 'Operations',
      description: 'The backbone. Crew management, compliance, safety, and keeping the machine running.',
      icon: Settings,
    },
    {
      name: 'Experience',
      description: 'The designers. Guest journeys, activations, and moments that resonate.',
      icon: Sparkles,
    },
    {
      name: 'Hospitality',
      description: 'The hosts. VIP services, catering coordination, and white-glove execution.',
      icon: UtensilsCrossed,
    },
    {
      name: 'Entertainment',
      description: 'The curators. Talent, programming, and performances that captivate.',
      icon: Music,
    },
  ];

  const openPositions = [
    {
      title: 'Production Manager',
      department: 'Production',
      location: 'Remote / On-site',
      type: 'Full-time',
      description: 'Lead multi-site production operations for festivals, brand activations, and experiential events. Manage timelines, budgets, and crews across complex installations.',
    },
    {
      title: 'Technical Director',
      department: 'Technology',
      location: 'Remote / On-site',
      type: 'Full-time',
      description: 'Oversee technical execution from load-in to strike. AV systems, lighting, staging, and integrated technology for large-scale events.',
    },
    {
      title: 'Creative Designer',
      department: 'Creative',
      location: 'Remote',
      type: 'Contract',
      description: 'Concept development and environmental design for experiential activations. Must understand technical feasibility and production constraints.',
    },
  ];

  const benefits = [
    {
      title: 'Fair Pay for Hard Work',
      description: 'We know what this industry pays. We pay better.',
    },
    {
      title: 'Work From Anywhere',
      description: 'Office optional when you\'re not on-site. Site days aren\'t negotiable.',
    },
    {
      title: 'The Armory',
      description: 'Budget for tools, training, and certifications that make you dangerous.',
    },
    {
      title: 'Shore Leave',
      description: 'After the show closes, take the time you need to recover.',
    },
    {
      title: 'Passport Stamps',
      description: 'Six continents and counting. Your frequent flyer status will thank us.',
    },
    {
      title: 'Front Row Access',
      description: 'See the shows you help build. Experience what you create.',
    },
    {
      title: 'Mental Health Support',
      description: 'Production is high-pressure. We provide resources to handle it.',
    },
    {
      title: 'Gear Allowance',
      description: 'Tools of the trade, on us. Get what you need to do the job right.',
    },
  ];

  const faqs = [
    {
      question: 'Do I need industry experience?',
      answer: 'Helpful, not required. We care more about how you solve problems than where you learned to solve them.',
    },
    {
      question: 'How much travel is involved?',
      answer: 'Depends on the role. Some positions are 80% on-site. Others are mostly remote with occasional site visits. We\'ll be upfront about expectations.',
    },
    {
      question: 'What\'s the interview process like?',
      answer: 'Conversational, not adversarial. We\'re trying to figure out if we\'d want to be stuck in a production office with you at 2 AM. You should be figuring out the same about us.',
    },
    {
      question: 'I don\'t see a role that fits. Should I still apply?',
      answer: 'Yes. We\'re always looking for talented people. Tell us what you bring.',
    },
    {
      question: 'What does "controlled chaos" actually mean?',
      answer: 'It means plans change constantly, priorities shift, and you need to be comfortable making decisions with incomplete information. If you need a playbook for everything, this isn\'t it.',
    },
  ];

  const thrivesHere = [
    'Problem-solvers who see obstacles as puzzles, not roadblocks',
    'Calm under pressure—panic is contagious, composure is too',
    'Ego-free collaborators—no room for "that\'s not my job"',
    'Detail-obsessed generalists—see the big picture, sweat the small stuff',
    'Comfortable with ambiguity—if you need a playbook for everything, this isn\'t it',
  ];

  const notForYou = [
    'You need predictable hours',
    'You can\'t handle last-minute changes',
    'You take feedback personally',
    'You wait to be told what to do',
    'You think "that\'s not my department"',
  ];

  const isForYou = [
    'You thrive under pressure',
    'You find solutions before problems are fully explained',
    'You\'d rather be on-site than in an office',
    'You want your work to matter',
    'You\'re ready to build something real',
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
                  Join the Crew
                </Typography>
                <Typography variant="h3" className="text-grey-400 mb-6">
                  We can&apos;t promise work-life balance. We can promise it won&apos;t be boring.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  We&apos;re building teams that deliver world-class experiences under pressure, solve problems 
                  that shouldn&apos;t have solutions, and turn ambitious visions into operational reality.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* The Ship's Code */}
        <section className="py-24 bg-white">
          <Container>
            <div className="max-w-5xl mx-auto">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-center mb-4">
                  The Ship&apos;s Code
                </Typography>
                <Typography variant="body" className="text-grey-600 text-center mb-12 text-lg">
                  One crew. No passengers.
                </Typography>
                
                <div className="grid md:grid-cols-5 gap-6">
                  {values.map((value, index) => (
                    <FadeIn key={value.title} delay={index * 0.1}>
                      <div className="border-2 border-black p-6 text-center h-full">
                        <Typography variant="h4" uppercase className="mb-3">
                          {value.title}
                        </Typography>
                        <Typography variant="body" className="text-grey-700 text-sm">
                          {value.description}
                        </Typography>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* Life on the Ship */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-white text-center mb-4">
                  Life on the Ship
                </Typography>
                <Typography variant="body" className="text-grey-400 text-center mb-12 text-lg">
                  We said we can&apos;t promise work-life balance. Here&apos;s what we can promise.
                </Typography>
                
                <div className="space-y-4">
                  {realities.map((item, index) => (
                    <FadeIn key={item.reality} delay={index * 0.1}>
                      <div className="border-2 border-white p-6 flex flex-col md:flex-row md:items-center gap-4">
                        <Typography variant="h5" uppercase className="text-white md:w-1/3">
                          {item.reality}
                        </Typography>
                        <Typography variant="body" className="text-grey-400 md:w-2/3">
                          {item.meaning}
                        </Typography>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* Who Thrives Here */}
        <section className="py-24 bg-white">
          <Container>
            <div className="max-w-5xl mx-auto">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-center mb-12">
                  Who Thrives Here
                </Typography>
                
                <div className="grid md:grid-cols-2 gap-12">
                  {/* This IS for you */}
                  <div>
                    <Typography variant="h4" uppercase className="mb-6 text-center md:text-left">
                      This Role IS for You If...
                    </Typography>
                    <div className="space-y-3">
                      {isForYou.map((item, index) => (
                        <FadeIn key={item} delay={index * 0.05}>
                          <div className="flex items-start gap-3">
                            <span className="text-black font-bold mt-1">✓</span>
                            <Typography variant="body" className="text-grey-700">
                              {item}
                            </Typography>
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                  </div>

                  {/* This is NOT for you */}
                  <div>
                    <Typography variant="h4" uppercase className="mb-6 text-center md:text-left">
                      This Role Isn&apos;t for You If...
                    </Typography>
                    <div className="space-y-3">
                      {notForYou.map((item, index) => (
                        <FadeIn key={item} delay={index * 0.05}>
                          <div className="flex items-start gap-3">
                            <span className="text-grey-400 font-bold mt-1">✗</span>
                            <Typography variant="body" className="text-grey-600">
                              {item}
                            </Typography>
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-8 border-2 border-black bg-grey-50">
                  <Typography variant="h5" uppercase className="mb-4">
                    We Look For:
                  </Typography>
                  <div className="grid md:grid-cols-2 gap-3">
                    {thrivesHere.map((trait, index) => (
                      <Typography key={index} variant="body" className="text-grey-700">
                        • {trait}
                      </Typography>
                    ))}
                  </div>
                </div>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* Departments */}
        <section className="py-24 bg-black text-white">
          <Container>
            <SlideUp>
              <Typography variant="h2" uppercase className="text-white text-center mb-4">
                The Departments
              </Typography>
              <Typography variant="body" className="text-grey-400 text-center mb-12 text-lg max-w-2xl mx-auto">
                Every role has a place. Find where you fit.
              </Typography>
            </SlideUp>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {departments.map((dept, index) => (
                <FadeIn key={dept.name} delay={index * 0.05}>
                  <div className="border-2 border-white p-6 hover:bg-white hover:text-black transition-all group h-full">
                    <dept.icon className="w-8 h-8 mb-4" strokeWidth={1.5} />
                    <Typography variant="h5" uppercase className="mb-2 group-hover:text-black">
                      {dept.name}
                    </Typography>
                    <Typography variant="body" className="text-grey-400 group-hover:text-grey-700 text-sm">
                      {dept.description}
                    </Typography>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* Open Positions */}
        <section className="py-24 bg-white">
          <Container>
            <SlideUp>
              <Typography variant="h2" uppercase className="text-center mb-12">
                Open Positions
              </Typography>
            </SlideUp>

            <div className="max-w-4xl mx-auto space-y-6">
              {openPositions.map((position, index) => (
                <FadeIn key={position.title} delay={index * 0.1}>
                  <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all group cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <Typography variant="h3" uppercase className="mb-2 group-hover:text-white">
                          {position.title}
                        </Typography>
                        <div className="flex flex-wrap gap-4">
                          <span className="inline-block px-3 py-1 bg-black text-white text-xs uppercase tracking-wider group-hover:bg-white group-hover:text-black">
                            {position.department}
                          </span>
                          <Typography variant="meta" uppercase className="text-grey-600 group-hover:text-grey-400">
                            {position.location}
                          </Typography>
                          <Typography variant="meta" uppercase className="text-grey-600 group-hover:text-grey-400">
                            {position.type}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <Typography variant="body" className="text-grey-700 group-hover:text-grey-300 mb-6">
                      {position.description}
                    </Typography>
                    <button className="font-bebas uppercase tracking-wide px-6 py-3 border-2 border-black text-black group-hover:border-white group-hover:text-white transition-all">
                      Apply Now
                    </button>
                  </div>
                </FadeIn>
              ))}
            </div>

            {openPositions.length === 0 && (
              <div className="text-center max-w-2xl mx-auto">
                <Typography variant="body" className="text-grey-600 text-lg">
                  No open positions at the moment. Check back soon or send us your resume for future opportunities.
                </Typography>
              </div>
            )}
          </Container>
        </section>

        {/* Benefits */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="max-w-5xl mx-auto">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-white text-center mb-12">
                  Benefits & Perks
                </Typography>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {benefits.map((benefit, index) => (
                    <FadeIn key={benefit.title} delay={index * 0.05}>
                      <div className="border-2 border-white p-6 h-full">
                        <Typography variant="h5" uppercase className="text-white mb-2">
                          {benefit.title}
                        </Typography>
                        <Typography variant="body" className="text-grey-400 text-sm">
                          {benefit.description}
                        </Typography>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* Application Process */}
        <section className="py-24 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-center mb-12">
                  How to Board
                </Typography>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <FadeIn delay={0.1}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bebas">
                        1
                      </div>
                      <Typography variant="h5" uppercase className="mb-3">
                        Raise the Flag
                      </Typography>
                      <Typography variant="body" className="text-grey-700">
                        Send your resume and portfolio. Skip the cover letter fluff—show us what you&apos;ve built.
                      </Typography>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bebas">
                        2
                      </div>
                      <Typography variant="h5" uppercase className="mb-3">
                        The Conversation
                      </Typography>
                      <Typography variant="body" className="text-grey-700">
                        No trick questions. We want to know how you think, how you work, and what you&apos;ve learned from failure.
                      </Typography>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.3}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bebas">
                        3
                      </div>
                      <Typography variant="h5" uppercase className="mb-3">
                        Board the Ship
                      </Typography>
                      <Typography variant="body" className="text-grey-700">
                        Onboarding, introductions, and your first project. Sink or swim starts now.
                      </Typography>
                    </div>
                  </FadeIn>
                </div>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="max-w-3xl mx-auto">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-white text-center mb-12">
                  Questions?
                </Typography>
                
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <FadeIn key={faq.question} delay={index * 0.1}>
                      <div 
                        className="border-2 border-white overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaq(openFaq === index ? null : index)}
                          className="w-full p-6 flex items-center justify-between text-left hover:bg-white hover:text-black transition-all group"
                        >
                          <Typography variant="h5" uppercase className="group-hover:text-black">
                            {faq.question}
                          </Typography>
                          {openFaq === index ? (
                            <ChevronUp className="w-6 h-6 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-6 h-6 flex-shrink-0" />
                          )}
                        </button>
                        {openFaq === index && (
                          <div className="px-6 pb-6">
                            <Typography variant="body" className="text-grey-400">
                              {faq.answer}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </SlideUp>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <SlideUp>
                <Typography variant="h2" uppercase className="mb-6">
                  Don&apos;t See Your Role?
                </Typography>
                <Typography variant="body" className="text-grey-700 text-lg mb-8">
                  We&apos;re always looking for talented people. Send us your resume and tell us what you bring to the crew.
                </Typography>
                <Link href="/contact">
                  <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-black text-black hover:bg-black hover:text-white transition-all">
                    Get in Touch
                  </button>
                </Link>
              </SlideUp>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
