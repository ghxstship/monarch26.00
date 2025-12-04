'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="min-h-screen bg-black text-white flex items-center justify-center">
          <Container>
            <div className="text-center">
              <Typography variant="hero" className="text-white mb-4" uppercase>
                You&apos;re Lost
              </Typography>
              <Typography variant="h2" uppercase className="text-grey-400 mb-8">
                We Get It.
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-12">
                Even the best navigators hit dead ends. This page doesn&apos;t exist—or we moved it 
                and forgot to leave a forwarding address. Let&apos;s get you back on course.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                    Go Home
                  </Button>
                </Link>
                <Link href="/work">
                  <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                    View Our Showcase
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
