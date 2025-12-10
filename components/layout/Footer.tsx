import React from 'react';
import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Industries',
      links: [
        { label: 'Concerts, Festivals & Tours', href: '/industries#concerts-festivals-tours' },
        { label: 'Sports & Entertainment', href: '/industries#sports-entertainment' },
        { label: 'Retail', href: '/industries#retail' },
        { label: 'Hospitality', href: '/industries#hospitality' },
        { label: 'Corporate & Private', href: '/industries#corporate-private' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Discover', href: '/services#discover' },
        { label: 'Design', href: '/services#design' },
        { label: 'Develop', href: '/services#develop' },
        { label: 'Deliver', href: '/services#deliver' },
        { label: 'Disrupt', href: '/services#disrupt' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Social', href: '/solutions#social' },
        { label: 'Digital', href: '/solutions#digital' },
        { label: 'Virtual', href: '/solutions#virtual' },
        { label: 'Physical', href: '/solutions#physical' },
        { label: 'Experiential', href: '/solutions#experiential' },
        { label: 'International', href: '/solutions#international' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Story', href: '/about' },
        { label: 'Crew', href: '/crew' },
        { label: 'Museum', href: '/museum' },
        { label: 'Innovations', href: '/innovations' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
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
      <Container className="py-12 sm:py-16">
        {/* Mobile: Brand at top */}
        <div className="text-left mb-10 sm:hidden">
          <Typography variant="h3" className="text-white mb-2" uppercase>
            GHXSTSHIP
          </Typography>
          <Typography variant="body" className="text-grey-400 mb-2">
            Venture Beyond.
          </Typography>
          <Typography variant="meta" className="text-grey-500" uppercase>
            Tampa, FL // Global
          </Typography>
        </div>

        {/* Link Sections Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand Column - Hidden on mobile, shown on lg+ */}
          <div className="hidden lg:block">
            <Typography variant="h3" className="text-white mb-4" uppercase>
              GHXSTSHIP
            </Typography>
            <Typography variant="body" className="text-grey-400 mb-4">
              Venture Beyond.
            </Typography>
            <Typography variant="meta" className="text-grey-500" uppercase>
              Tampa, FL // Global
            </Typography>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <Typography variant="h6" className="text-white mb-3 sm:mb-4 text-sm sm:text-base" uppercase>
                {section.title}
              </Typography>
              <ul className="space-y-1.5 sm:space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-share text-grey-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider & Copyright */}
        <div className="border-t-2 border-grey-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
            <Typography variant="meta" className="text-grey-500 text-xs sm:text-sm text-center" uppercase>
              © {currentYear} GHXSTSHIP Industries LLC. All rights reserved.
            </Typography>
          </div>
        </div>
      </Container>
    </footer>
  );
}
