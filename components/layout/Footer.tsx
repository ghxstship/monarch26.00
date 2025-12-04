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
        { label: 'Discover', href: '/services#discover' },
        { label: 'Design', href: '/services#design' },
        { label: 'Develop', href: '/services#develop' },
        { label: 'Deliver', href: '/services#deliver' },
        { label: 'Direct', href: '/services#direct' },
        { label: 'Disrupt', href: '/services#disrupt' },
        { label: 'Dominate', href: '/services#dominate' },
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
        { label: 'Story', href: '/about' },
        { label: 'Crew', href: '/team' },
        { label: 'Careers', href: '/careers' },
        { label: 'Showcase', href: '/work' },
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
              Tampa, FL // Global
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
          <div className="flex justify-center items-center">
            <Typography variant="meta" className="text-grey-500" uppercase>
              © {currentYear} GHXSTSHIP Industries LLC. All rights reserved.
            </Typography>
          </div>
        </div>
      </Container>
    </footer>
  );
}
