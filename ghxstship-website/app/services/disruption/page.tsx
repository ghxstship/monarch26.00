import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

export default function DisruptionPage() {
  const capabilities = [
    'Innovation Lab',
    'Emerging Technologies',
    'R&D',
    'Future-forward Concepts',
    'Experimental Design',
    'Technology Integration',
    'Prototype Development',
    'Trend Forecasting',
  ];

  const process = [
    { step: '01', title: 'Research', desc: 'Exploring emerging technologies and trends' },
    { step: '02', title: 'Experimentation', desc: 'Testing new concepts and approaches' },
    { step: '03', title: 'Prototyping', desc: 'Building proof-of-concept experiences' },
    { step: '04', title: 'Implementation', desc: 'Bringing innovation to market' },
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="min-h-screen bg-black text-white flex items-center">
          <Container>
            <SlideUp>
              <Typography variant="hero" className="text-white mb-6" uppercase>
                Disruption
              </Typography>
              <Typography variant="h2" uppercase className="text-grey-400 mb-8">
                Innovation & Future Tech
              </Typography>
              <div className="max-w-4xl">
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed">
                  Tomorrow&apos;s experiences, delivered today. We don&apos;t follow trends—we create them, 
                  pushing technology and creativity to their absolute limits. Our innovation lab explores 
                  the bleeding edge of experiential technology, from AI and XR to spatial computing and beyond.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        <section className="py-24 bg-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h2" uppercase className="mb-4">
                  Innovation Capabilities
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

        <section className="py-24 bg-black text-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h2" uppercase className="text-white mb-4">
                  Innovation Process
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

        <section className="py-24 bg-white">
          <Container maxWidth="lg">
            <SlideUp>
              <Typography variant="h2" uppercase className="mb-8 text-center">
                The Future of Experience
              </Typography>
              <div className="space-y-6 max-w-3xl mx-auto">
                <Typography variant="body" className="text-lg leading-relaxed text-grey-700">
                  Our innovation lab is where impossible becomes possible. We invest in R&D, exploring 
                  emerging technologies and experimental concepts that will define the next generation 
                  of experiential production.
                </Typography>
                <Typography variant="body" className="text-lg leading-relaxed text-grey-700">
                  From AI-powered interactive installations to immersive XR experiences, we&apos;re constantly 
                  pushing the boundaries of what audiences can experience. We don&apos;t wait for the future—we build it.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        <section className="py-24 bg-black text-white">
          <Container>
            <div className="text-center">
              <Typography variant="h1" uppercase className="text-white mb-6">
                Disrupt the Industry
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-8">
                Let&apos;s create tomorrow&apos;s experiences today.
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
