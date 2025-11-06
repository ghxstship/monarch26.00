import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { Container } from '../layout/Container';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';
import { SlideUp } from '../animations/SlideUp';
import { FadeIn } from '../animations/FadeIn';

interface VerticalTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  services: string[];
  examples: Array<{
    title: string;
    client: string;
    description: string;
  }>;
}

export function VerticalTemplate({ title, subtitle, description, services, examples }: VerticalTemplateProps) {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="min-h-screen bg-black text-white flex items-center">
          <Container>
            <SlideUp>
              <Typography variant="hero" className="text-white mb-6" uppercase>
                {title}
              </Typography>
              <Typography variant="h2" uppercase className="text-grey-400 mb-8">
                {subtitle}
              </Typography>
              <div className="max-w-4xl">
                <Typography variant="body" className="text-grey-400 text-xl leading-relaxed">
                  {description}
                </Typography>
              </div>
            </SlideUp>
          </Container>
        </section>

        {/* Services */}
        <section className="py-24 bg-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h2" uppercase className="mb-4">
                  What We Deliver
                </Typography>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <FadeIn key={service} delay={index * 0.05}>
                  <div className="border-2 border-black p-8 text-center hover:bg-black hover:text-white transition-all">
                    <Typography variant="h5" uppercase>
                      {service}
                    </Typography>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* Examples */}
        <section className="py-24 bg-black text-white">
          <Container>
            <FadeIn>
              <div className="text-center mb-16">
                <Typography variant="h2" uppercase className="text-white mb-4">
                  Project Examples
                </Typography>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-8">
              {examples.map((example, index) => (
                <SlideUp key={example.title} delay={index * 0.1}>
                  <div className="border-2 border-white p-8">
                    <Typography variant="h3" uppercase className="text-white mb-2">
                      {example.title}
                    </Typography>
                    <Typography variant="meta" uppercase className="text-grey-500 mb-4">
                      Client: {example.client}
                    </Typography>
                    <Typography variant="body" className="text-grey-400">
                      {example.description}
                    </Typography>
                  </div>
                </SlideUp>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white">
          <Container>
            <div className="text-center">
              <Typography variant="h1" uppercase className="mb-6">
                Let&apos;s Create Together
              </Typography>
              <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto mb-8">
                Ready to bring your vision to life in the {title.toLowerCase()} space?
              </Typography>
              <Button variant="filled" size="lg">
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
