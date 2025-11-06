import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

export default function DesignPage() {
  const capabilities = [
    'Creative Concepting',
    'Brand Experiences',
    'Spatial Design',
    'Content Strategy',
    'Visual Identity',
    'Experience Mapping',
    'Storyboarding',
    'Concept Development',
  ];

  const process = [
    { step: '01', title: 'Discovery', desc: 'Understanding your vision, audience, and objectives' },
    { step: '02', title: 'Ideation', desc: 'Brainstorming concepts and exploring possibilities' },
    { step: '03', title: 'Refinement', desc: 'Developing and iterating on selected concepts' },
    { step: '04', title: 'Presentation', desc: 'Delivering comprehensive design documentation' },
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="min-h-screen bg-black text-white flex items-center">
          <Container>
            <SlideUp>
              <Typography variant="hero" className="text-white mb-6" uppercase>
                Design
              </Typography>
              <Typography variant="h2" uppercase className="text-grey-400 mb-8">
                Conceptual Development & Creative Strategy
              </Typography>
              <div className="max-w-4xl">
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed">
                  We architect the impossible, transforming abstract ideas into tangible experiences 
                  that move audiences. Every concept begins with a question: what if? From there, we 
                  explore the boundaries of creativity, technology, and human connection to deliver 
                  experiences that transcend expectations.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Capabilities */}
        <section className="py-24 bg-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h2" uppercase className="mb-4">
                  Core Capabilities
                </Typography>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {capabilities.map((capability, index) => (
                <FadeIn key={capability} delay={index * 0.05}>
                  <div className="border-2 border-black p-6 text-center hover:bg-black hover:text-white transition-all">
                    <Typography variant="h6" uppercase>
                      {capability}
                    </Typography>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* Process */}
        <section className="py-24 bg-black text-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h2" uppercase className="text-white mb-4">
                  Our Design Process
                </Typography>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <SlideUp key={item.step} delay={index * 0.1}>
                  <div className="border-2 border-white p-8">
                    <Typography variant="hero" className="text-white mb-4">
                      {item.step}
                    </Typography>
                    <Typography variant="h4" uppercase className="text-white mb-4">
                      {item.title}
                    </Typography>
                    <Typography variant="body" className="text-grey-400">
                      {item.desc}
                    </Typography>
                  </div>
                </SlideUp>
              ))}
            </div>
          </Container>
        </section>

        {/* Philosophy */}
        <section className="py-24 bg-white">
          <Container maxWidth="lg">
            <SlideUp>
              <Typography variant="h2" uppercase className="mb-8 text-center">
                Design Philosophy
              </Typography>
              <div className="space-y-6 max-w-3xl mx-auto">
                <Typography variant="body" className="text-lg leading-relaxed text-grey-700">
                  We believe that great design starts with asking the right questions. What if we could 
                  create an experience that no one has seen before? What if we could make the impossible 
                  possible? These questions drive our creative process.
                </Typography>
                <Typography variant="body" className="text-lg leading-relaxed text-grey-700">
                  Our design approach is rooted in understanding human behavior, cultural context, and 
                  technological possibilities. We don&apos;t just create beautiful visuals—we architect 
                  experiences that resonate on an emotional level and leave lasting impressions.
                </Typography>
                <Typography variant="body" className="text-lg leading-relaxed text-grey-700">
                  Every project is an opportunity to push boundaries, challenge conventions, and set new 
                  standards for what experiential design can achieve.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 bg-black text-white">
          <Container>
            <div className="text-center">
              <Typography variant="h1" uppercase className="text-white mb-6">
                Ready to Design the Impossible?
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-8">
                Let&apos;s start with a conversation about your vision.
              </Typography>
              <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                Start Your Project
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
