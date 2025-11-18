'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Verticals } from '@/components/sections/Verticals';
import { Solutions } from '@/components/sections/Solutions';
import { Services } from '@/components/sections/Services';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { History } from '@/components/sections/History';
import { Crew } from '@/components/sections/Crew';
import { CTA } from '@/components/sections/CTA';
import { CookieConsent } from '@/components/compliance/CookieConsent';
import { SkipNavigation } from '@/components/ui/SkipNavigation';

export default function Home() {
  return (
    <>
      <SkipNavigation />
      <Header />
      <main 
        id="main-content"
        role="main"
        className="pt-20"
      >
        <Hero />
        <Verticals />
        <Solutions />
        <Services />
        <FeaturedProjects />
        <History />
        <Crew />
        <CTA />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
