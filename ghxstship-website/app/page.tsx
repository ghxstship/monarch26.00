import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Verticals } from '@/components/sections/Verticals';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
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
        <Services />
        <Verticals />
        <FeaturedProjects />
        <CTA />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
