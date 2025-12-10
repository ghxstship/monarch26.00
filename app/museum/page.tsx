'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

const projects = [
  {
    id: 1,
    title: 'Salvage City Supper Club at EDC Las Vegas',
    client: 'Insomniac',
    year: '2024',
    vertical: 'Immersive Entertainment',
    location: 'Las Vegas, NV',
    image: 'https://source.unsplash.com/t05q7TZObzc/600x450',
  },
  {
    id: 2,
    title: 'Heineken Turn4 Nightclub at Formula 1 Las Vegas Grand Prix',
    client: 'Heineken',
    year: '2023',
    vertical: 'Experiential Marketing',
    location: 'Las Vegas, NV',
    image: 'https://source.unsplash.com/3uu5_kn1k_Y/600x450',
  },
  {
    id: 3,
    title: 'Red Bull Unforeseen Motel Nightclub at III Points Miami',
    client: 'Red Bull',
    year: '2023',
    vertical: 'Immersive Entertainment',
    location: 'Miami, FL',
    image: 'https://source.unsplash.com/SQXEO9iGNtg/600x450',
  },
  {
    id: 4,
    title: 'PATRÓN Cristalino North American Launch with Becky G at Olvera Street',
    client: 'PATRÓN',
    year: '2023',
    vertical: 'Experiential Marketing',
    location: 'Los Angeles, CA',
    image: 'https://source.unsplash.com/ISz9aojNEjM/600x450',
  },
  {
    id: 5,
    title: 'Factory Town Miami',
    client: 'Factory Town',
    year: '2023-2024',
    vertical: 'Immersive Entertainment',
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80',
  },
  {
    id: 6,
    title: 'Formula 1 Las Vegas Grand Prix',
    client: 'Formula 1',
    year: '2023',
    vertical: 'Experiential Marketing',
    location: 'Las Vegas, NV',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80',
  },
  {
    id: 7,
    title: 'Maiden Voyage of Celebrity Cruises Celebrity Beyond',
    client: 'Celebrity Cruises',
    year: '2022',
    vertical: 'Immersive Entertainment',
    location: 'Caribbean',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80',
  },
];

export default function WorkPage() {
  const [filter, setFilter] = useState('All');
  
  const verticals = ['All', 'Immersive Entertainment', 'Experiential Marketing', 'Creative Media', 'Integrated Technology'];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.vertical === filter);

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
                  The Museum
                </Typography>
                <Typography variant="h3" className="text-grey-400 mb-6">
                  Artifacts from voyages past. Proof the legends are real.
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  From 50,000+ capacity festival production to intimate brand activations, we&apos;ve delivered experiences 
                  that push boundaries and exceed expectations. Every project solved problems that shouldn&apos;t technically work. 
                  But they do. Because we made them.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Filter Section */}
        <section className="py-6 sm:py-8 md:py-12 bg-white border-b-2 border-black sticky top-20 z-40">
          <Container>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
              {verticals.map((vertical) => (
                <button
                  key={vertical}
                  onClick={() => setFilter(vertical)}
                  className={`
                    font-bebas uppercase tracking-wide 
                    px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5
                    text-xs sm:text-sm md:text-base lg:text-lg
                    border-2 transition-all
                    whitespace-nowrap
                    ${filter === vertical 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-black border-black hover:bg-black hover:text-white'
                    }
                  `}
                >
                  {vertical}
                </button>
              ))}
            </div>
          </Container>
        </section>

        {/* Projects Grid */}
        <section className="py-24 bg-white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <FadeIn key={project.id} delay={index * 0.05}>
                  <div className="border-2 border-black bg-white overflow-hidden hover:scale-[1.02] transition-transform duration-200 cursor-pointer h-full flex flex-col">
                    <div className="relative w-full aspect-[4/3] bg-grey-200 flex-shrink-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4 sm:p-6 flex-grow flex flex-col">
                      <Typography variant="h4" uppercase className="mb-2 min-h-[3em] leading-tight text-sm sm:text-base">
                        {project.title}
                      </Typography>
                      <div className="mt-auto">
                        <Typography variant="meta" uppercase className="text-grey-600 block mb-1 text-xs sm:text-sm">
                          Client: {project.client}
                        </Typography>
                        <Typography variant="meta" uppercase className="text-grey-600 block mb-1 text-xs sm:text-sm">
                          {project.vertical}
                        </Typography>
                        <Typography variant="meta" uppercase className="text-grey-600 block text-xs sm:text-sm">
                          {project.year} {'//'} {project.location}
                        </Typography>
                      </div>
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
            <div className="text-center">
              <Typography variant="h1" uppercase className="text-white mb-6">
                Ready to Add to the Collection?
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-8">
                These are just the highlights. The full archive includes projects we can&apos;t talk about 
                yet and a few we&apos;re legally required to pretend never happened. Let&apos;s discuss yours.
              </Typography>
              <Link href="/contact">
                <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all">
                  Get in Touch
                </button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
