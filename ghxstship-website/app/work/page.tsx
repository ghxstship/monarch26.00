'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

const projects = [
  {
    id: 1,
    title: 'Formula 1 Miami Grand Prix',
    client: 'Formula 1',
    year: '2024',
    vertical: 'Immersive Entertainment',
    location: 'Miami, FL',
  },
  {
    id: 2,
    title: 'Insomniac EDC Experience',
    client: 'Insomniac',
    year: '2024',
    vertical: 'Immersive Entertainment',
    location: 'Las Vegas, NV',
  },
  {
    id: 3,
    title: 'PATRÓN Brand Activation',
    client: 'PATRÓN',
    year: '2023',
    vertical: 'Experiential Marketing',
    location: 'Multiple Locations',
  },
  {
    id: 4,
    title: 'Heineken Global Tour',
    client: 'Heineken',
    year: '2023',
    vertical: 'Experiential Marketing',
    location: 'Global',
  },
  {
    id: 5,
    title: 'Red Bull Music Festival',
    client: 'Red Bull',
    year: '2023',
    vertical: 'Immersive Entertainment',
    location: 'Multiple Cities',
  },
  {
    id: 6,
    title: 'Tech Conference Production',
    client: 'Various',
    year: '2024',
    vertical: 'Integrated Technology',
    location: 'San Francisco, CA',
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
                <Typography variant="hero" className="text-white mb-6" uppercase>
                  Our Work
                </Typography>
                <Typography variant="body" className="text-grey-400 text-xl">
                  A portfolio of impossible experiences delivered across 52+ countries. 
                  Each project pushes boundaries and sets new standards.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Filter Section */}
        <section className="py-12 bg-white border-b-2 border-black sticky top-20 z-40">
          <Container>
            <div className="flex flex-wrap justify-center gap-4">
              {verticals.map((vertical) => (
                <button
                  key={vertical}
                  onClick={() => setFilter(vertical)}
                  className={`
                    font-bebas uppercase tracking-wide px-6 py-2 border-2 transition-all
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
                  <div className="border-2 border-black bg-white overflow-hidden hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                    <div className="relative w-full aspect-[4/3] bg-grey-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Typography variant="h4" className="text-grey-500" uppercase>
                          Project Image
                        </Typography>
                      </div>
                    </div>
                    <div className="p-6">
                      <Typography variant="h4" uppercase className="mb-2">
                        {project.title}
                      </Typography>
                      <Typography variant="meta" uppercase className="text-grey-600 block mb-1">
                        Client: {project.client}
                      </Typography>
                      <Typography variant="meta" uppercase className="text-grey-600 block mb-1">
                        {project.vertical}
                      </Typography>
                      <Typography variant="meta" uppercase className="text-grey-600 block">
                        {project.year} {'//'} {project.location}
                      </Typography>
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
                Want to See More?
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-8">
                These are just a few highlights. Contact us to learn more about our full portfolio 
                and how we can bring your vision to life.
              </Typography>
              <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all">
                Get in Touch
              </button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
