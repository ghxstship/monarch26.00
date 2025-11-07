import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-24 bg-white">
          <Container maxWidth="lg">
            <Typography variant="h1" uppercase className="mb-8">
              Terms of Service
            </Typography>
            <Typography variant="meta" uppercase className="text-grey-600 mb-12">
              Last Updated: November 2024
            </Typography>

            <div className="space-y-8 max-w-3xl">
              <div>
                <Typography variant="h3" uppercase className="mb-4">
                  Agreement to Terms
                </Typography>
                <Typography variant="body" className="text-grey-700 leading-relaxed">
                  By accessing or using the GHXSTSHIP Industries LLC website and services, you agree to be 
                  bound by these Terms of Service. If you disagree with any part of these terms, you may not 
                  access our website or use our services.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" uppercase className="mb-4">
                  Use of Services
                </Typography>
                <Typography variant="body" className="text-grey-700 leading-relaxed mb-4">
                  You agree to use our services only for lawful purposes and in accordance with these Terms. 
                  You agree not to:
                </Typography>
                <ul className="list-disc pl-6 space-y-2">
                  <li><Typography variant="body" className="text-grey-700">Use our services in any way that violates applicable laws or regulations</Typography></li>
                  <li><Typography variant="body" className="text-grey-700">Engage in any conduct that restricts or inhibits anyone&apos;s use of our services</Typography></li>
                  <li><Typography variant="body" className="text-grey-700">Attempt to gain unauthorized access to our systems or networks</Typography></li>
                  <li><Typography variant="body" className="text-grey-700">Use our services to transmit any harmful or malicious code</Typography></li>
                </ul>
              </div>

              <div>
                <Typography variant="h3" uppercase className="mb-4">
                  Intellectual Property
                </Typography>
                <Typography variant="body" className="text-grey-700 leading-relaxed">
                  The content, features, and functionality of our website and services are owned by GHXSTSHIP 
                  Industries LLC and are protected by international copyright, trademark, and other intellectual 
                  property laws. You may not reproduce, distribute, modify, or create derivative works without 
                  our express written permission.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" uppercase className="mb-4">
                  Service Agreements
                </Typography>
                <Typography variant="body" className="text-grey-700 leading-relaxed">
                  Any services provided by GHXSTSHIP Industries LLC are subject to separate service agreements. 
                  These Terms of Service govern your use of our website and general interactions with our company.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" uppercase className="mb-4">
                  Limitation of Liability
                </Typography>
                <Typography variant="body" className="text-grey-700 leading-relaxed">
                  To the fullest extent permitted by law, GHXSTSHIP Industries LLC shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages resulting from your use of 
                  or inability to use our services.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" uppercase className="mb-4">
                  Changes to Terms
                </Typography>
                <Typography variant="body" className="text-grey-700 leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. We will notify you of any 
                  changes by posting the new Terms on this page and updating the &quot;Last Updated&quot; date.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" uppercase className="mb-4">
                  Contact Information
                </Typography>
                <Typography variant="body" className="text-grey-700 leading-relaxed">
                  For questions about these Terms of Service, please contact us at:<br />
                  Email: greetings@ghxstship.pro<br />
                  Address: Tampa, FL
                </Typography>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
