'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';
import Link from 'next/link';
import { 
  Music, 
  Trophy, 
  ShoppingBag, 
  Hotel, 
  UtensilsCrossed, 
  Plane, 
  Heart, 
  Building2, 
  GraduationCap 
} from 'lucide-react';

const industries = [
  {
    id: 'concerts-festivals-tours',
    title: 'Concerts, Festivals & Tours',
    description: 'Live music production at every scale. From intimate club shows to stadium spectacles, multi-day festivals to world tours. We\'ve called cues at 3 AM, managed impossible changeovers, and delivered experiences that audiences remember for life.',
    capabilities: [
      'Concert Production',
      'Festival Design & Operations',
      'Tour Management & Logistics',
      'Artist Hospitality',
      'Stage & Sound Design',
      'Multi-Venue Coordination',
    ],
    icon: Music,
  },
  {
    id: 'sports-entertainment',
    title: 'Sports & Entertainment',
    description: 'Stadium activations, arena experiences, and fan engagement that matches the energy of game day. We understand the stakes, the timelines, and the pressure of live sports production.',
    capabilities: [
      'Stadium Activations',
      'Fan Experience Design',
      'Athlete Appearances',
      'Sponsorship Activations',
      'Broadcast Integration',
      'Game Day Operations',
    ],
    icon: Trophy,
  },
  {
    id: 'retail',
    title: 'Retail',
    description: 'In-store experiences, pop-ups, and brand retail environments that drive traffic and conversion. We build spaces that turn browsers into buyers and customers into advocates.',
    capabilities: [
      'Pop-Up Retail Experiences',
      'In-Store Activations',
      'Brand Retail Environments',
      'Product Launch Events',
      'Flagship Installations',
      'Seasonal Campaigns',
    ],
    icon: ShoppingBag,
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    description: 'Hotels, resorts, cruise lines, and guest experiences that elevate every touchpoint. We\'ve worked the high seas and the highest-end properties—hospitality without borders.',
    capabilities: [
      'Hotel & Resort Experiences',
      'Cruise Line Entertainment',
      'Guest Journey Design',
      'Lobby & Common Area Activations',
      'VIP & Concierge Experiences',
      'Property-Wide Programming',
    ],
    icon: Hotel,
  },
  {
    id: 'food-beverage',
    title: 'Food & Beverage',
    description: 'Culinary experiences, brand activations, and F&B programs that understand food is theater, not just fuel. From pop-up dining to large-scale catering operations.',
    capabilities: [
      'Culinary Experiences',
      'Brand Activations',
      'Pop-Up Dining Concepts',
      'Festival F&B Operations',
      'Tasting Events & Launches',
      'Chef Collaborations',
    ],
    icon: UtensilsCrossed,
  },
  {
    id: 'travel',
    title: 'Travel',
    description: 'Destination experiences and tourism activations that put places on the map. We create reasons to visit and memories worth sharing.',
    capabilities: [
      'Destination Marketing',
      'Tourism Activations',
      'Travel Brand Experiences',
      'Airport & Transit Activations',
      'Cultural Programming',
      'Visitor Center Design',
    ],
    icon: Plane,
  },
  {
    id: 'health-wellness',
    title: 'Health & Wellness',
    description: 'Wellness events, retreats, and spaces that prioritize wellbeing. Thoughtful experiences that restore, inspire, and transform.',
    capabilities: [
      'Wellness Events & Retreats',
      'Spa & Wellness Spaces',
      'Fitness Brand Activations',
      'Health-Focused Programming',
      'Mindfulness Experiences',
      'Recovery & Restoration Spaces',
    ],
    icon: Heart,
  },
  {
    id: 'corporate-private',
    title: 'Corporate & Private Events',
    description: 'Summits, launches, galas, and private functions that don\'t feel corporate. Because your audience can tell the difference between genuine and going through the motions.',
    capabilities: [
      'Executive Summits',
      'Product Launches',
      'Corporate Galas',
      'Private Functions',
      'Team Building Experiences',
      'Shareholder & Investor Events',
    ],
    icon: Building2,
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Universities, conferences, training programs, and academic events that engage and inspire. Learning experiences that stick.',
    capabilities: [
      'University Events',
      'Academic Conferences',
      'Training & Development',
      'Graduation Ceremonies',
      'Campus Activations',
      'Educational Programming',
    ],
    icon: GraduationCap,
  },
];

export default function IndustriesPage() {
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
                  The Industries
                </Typography>
                <Typography variant="h3" className="text-grey-400 mb-6">
                  Different waters. Same standards.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  Every industry has its own language, its own politics, its own way of measuring success. 
                  We&apos;ve learned them all—not from textbooks, but from 3 AM problem-solving sessions and 
                  post-mortems that actually meant something.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Industries Grid */}
        <section className="py-24 bg-white">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, index) => (
                <FadeIn key={industry.id} delay={index * 0.05}>
                  <div className="border-2 border-black p-8 h-full hover:bg-black hover:text-white transition-all group">
                    <industry.icon className="w-10 h-10 mb-6" strokeWidth={1.5} />
                    <Typography variant="h4" uppercase className="mb-3 group-hover:text-white">
                      {industry.title}
                    </Typography>
                    <Typography variant="body" className="text-grey-700 group-hover:text-grey-300 mb-6">
                      {industry.description}
                    </Typography>
                    <div className="pt-4 border-t border-grey-200 group-hover:border-grey-700">
                      <Typography variant="meta" uppercase className="text-grey-500 group-hover:text-grey-400 mb-3">
                        Capabilities
                      </Typography>
                      <ul className="space-y-1">
                        {industry.capabilities.slice(0, 4).map((capability) => (
                          <li key={capability}>
                            <Typography variant="body" className="text-grey-600 group-hover:text-grey-400 text-sm">
                              • {capability}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <SlideUp>
                <Typography variant="h2" uppercase className="text-white mb-6">
                  Your Industry. Our Expertise.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-lg mb-8">
                  Don&apos;t see your industry? We&apos;ve probably worked in it. Let&apos;s talk about what you&apos;re building.
                </Typography>
                <Link href="/contact">
                  <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all">
                    Start a Conversation
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
