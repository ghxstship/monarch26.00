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
              <Typography variant="hero" className="text-white mb-6" uppercase>
                404
              </Typography>
              <Typography variant="h2" uppercase className="text-white mb-8">
                Page Not Found
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-12">
                The page you&apos;re looking for doesn&apos;t exist or has been moved. 
                Let&apos;s get you back on track.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                    Go Home
                  </Button>
                </Link>
                <Link href="/work">
                  <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                    View Our Work
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
