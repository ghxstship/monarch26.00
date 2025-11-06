import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-24 bg-white">
          <Container maxWidth="lg">
            <Typography variant="h1" uppercase className="mb-8">
              Privacy Policy
            </Typography>
            <Typography variant="meta" uppercase className="text-grey-600 mb-12">
              Last Updated: November 2024
            </Typography>

            <div className="space-y-8 max-w-3xl">
              <div>
                <Typography variant="h3" uppercase className="mb-4">
                  Introduction
                </Typography>
                <Typography variant="body" className="text-grey-700 leading-relaxed">
                  GHXSTSHIP Industries LLC (&quot;GHXSTSHIP,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy 
                  and is committed to protecting your personal information. This Privacy Policy explains how we 
                  collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" uppercase className="mb-4">
                  Information We Collect
                </Typography>
                <Typography variant="body" className="text-grey-700 leading-relaxed mb-4">
                  We may collect information about you in a variety of ways, including:
                </Typography>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <Typography variant="body" className="text-grey-700">
                      <strong>Personal Data:</strong> Name, email address, phone number, company information, 
                      and other contact details you provide when contacting us or using our services.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body" className="text-grey-700">
                      <strong>Usage Data:</strong> Information about how you access and use our website, 
                      including your IP address, browser type, pages visited, and time spent on pages.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body" className="text-grey-700">
                      <strong>Cookies:</strong> We use cookies and similar tracking technologies to track 
                      activity on our website and hold certain information.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div>
                <Typography variant="h3" uppercase className="mb-4">
                  How We Use Your Information
                </Typography>
                <Typography variant="body" className="text-grey-700 leading-relaxed mb-4">
                  We use the information we collect to:
                </Typography>
                <ul className="list-disc pl-6 space-y-2">
                  <li><Typography variant="body" className="text-grey-700">Provide and maintain our services</Typography></li>
                  <li><Typography variant="body" className="text-grey-700">Respond to your inquiries and requests</Typography></li>
                  <li><Typography variant="body" className="text-grey-700">Send you marketing communications (with your consent)</Typography></li>
                  <li><Typography variant="body" className="text-grey-700">Improve our website and services</Typography></li>
                  <li><Typography variant="body" className="text-grey-700">Comply with legal obligations</Typography></li>
                </ul>
              </div>

              <div>
                <Typography variant="h3" uppercase className="mb-4">
                  Data Security
                </Typography>
                <Typography variant="body" className="text-grey-700 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information. However, no method of transmission over the Internet or electronic 
                  storage is 100% secure, and we cannot guarantee absolute security.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" uppercase className="mb-4">
                  Your Rights
                </Typography>
                <Typography variant="body" className="text-grey-700 leading-relaxed">
                  You have the right to access, correct, or delete your personal information. You may also 
                  object to or restrict certain processing of your data. To exercise these rights, please 
                  contact us at hello@ghxstship.com.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" uppercase className="mb-4">
                  Contact Us
                </Typography>
                <Typography variant="body" className="text-grey-700 leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at:<br />
                  Email: hello@ghxstship.com<br />
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
