import React from 'react';
import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'Design', href: '/services/design' },
        { label: 'Development', href: '/services/development' },
        { label: 'Direction', href: '/services/direction' },
        { label: 'Disruption', href: '/services/disruption' },
      ],
    },
    {
      title: 'Verticals',
      links: [
        { label: 'Immersive Entertainment', href: '/verticals/immersive-entertainment' },
        { label: 'Experiential Marketing', href: '/verticals/experiential-marketing' },
        { label: 'Creative Media', href: '/verticals/creative-media' },
        { label: 'Integrated Technology', href: '/verticals/integrated-technology' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Team', href: '/about' },
        { label: 'Passport', href: '/work' },
        { label: 'Solutions', href: '/solutions' },
        { label: 'Innovations', href: '/innovations' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  return (
    <footer 
      role="contentinfo"
      aria-label="Site footer"
      className="bg-black text-white border-t-2 border-white"
    >
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Typography variant="h3" className="text-white mb-4" uppercase>
              GHXSTSHIP
            </Typography>
            <Typography variant="body" className="text-grey-400 mb-4">
              Charter the Uncharted.
            </Typography>
            <Typography variant="meta" className="text-grey-500" uppercase>
              Tampa, FL // Global Remote
            </Typography>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <Typography variant="h6" className="text-white mb-4" uppercase>
                {section.title}
              </Typography>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-share text-grey-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t-2 border-grey-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <Typography variant="meta" className="text-grey-500" uppercase>
              © {currentYear} GHXSTSHIP Industries LLC. All rights reserved.
            </Typography>
            <div className="flex space-x-6">
              <Typography variant="meta" className="text-grey-500" uppercase>
                Est. 2022
              </Typography>
              <Typography variant="meta" className="text-grey-500" uppercase>
                52+ Countries
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
