import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SlideUp } from '@/components/animations/SlideUp';
import { FadeIn } from '@/components/animations/FadeIn';

export default function DevelopmentPage() {
  const capabilities = [
    'Production Management',
    'Fabrication',
    'Build-out',
    'Technical Integration',
    'Vendor Management',
    'Quality Control',
    'Project Coordination',
    'Resource Allocation',
  ];

  const process = [
    { step: '01', title: 'Planning', desc: 'Detailed production planning and resource allocation' },
    { step: '02', title: 'Fabrication', desc: 'Building and manufacturing all physical elements' },
    { step: '03', title: 'Integration', desc: 'Combining all technical and physical components' },
    { step: '04', title: 'Testing', desc: 'Rigorous quality control and system testing' },
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="min-h-screen bg-black text-white flex items-center">
          <Container>
            <SlideUp>
              <Typography variant="hero" className="text-white mb-6" uppercase>
                Development
              </Typography>
              <Typography variant="h2" uppercase className="text-grey-400 mb-8">
                Production & Build
              </Typography>
              <div className="max-w-4xl">
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed">
                  From steel and stage to pixels and platforms, we build what others say can&apos;t be done. 
                  Our production teams turn visions into reality at global scale, managing every aspect of 
                  fabrication, integration, and delivery with precision and excellence.
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
                  Production Capabilities
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
                  Production Process
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
                Production Excellence
              </Typography>
              <div className="space-y-6 max-w-3xl mx-auto">
                <Typography variant="body" className="text-lg leading-relaxed text-grey-700">
                  Our production capabilities span the full spectrum of experiential build-out, from 
                  custom fabrication to large-scale installations. We maintain partnerships with the 
                  world&apos;s leading fabricators, technical providers, and specialty manufacturers.
                </Typography>
                <Typography variant="body" className="text-lg leading-relaxed text-grey-700">
                  Every project is managed with military precision, ensuring that timelines are met, 
                  budgets are respected, and quality never compromised. Our production teams have 
                  delivered projects in 52+ countries, adapting to local regulations, customs, and logistics.
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        <section className="py-24 bg-black text-white">
          <Container>
            <div className="text-center">
              <Typography variant="h1" uppercase className="text-white mb-6">
                Build the Impossible
              </Typography>
              <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-8">
                Let&apos;s turn your vision into reality.
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
