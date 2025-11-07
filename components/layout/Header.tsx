'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';
import { Container } from './Container';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Innovations', href: '/innovations' },
    { label: 'Verticals', href: '/verticals' },
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Passport', href: '/work' },
    { label: 'Team', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 bg-black text-white border-b-2 border-white"
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Typography variant="h3" className="text-white" uppercase>
              GHXSTSHIP
            </Typography>
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-bebas text-lg uppercase tracking-wide hover:text-grey-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact">
              <Button variant="outlined" size="sm" className="border-white text-white hover:bg-white hover:text-black">
                Start a Project
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              className="w-6 h-0.5 bg-white"
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-white"
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-white"
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 top-20 bg-black z-40 lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Container className="py-8">
              <nav 
                className="flex flex-col gap-6"
                aria-label="Mobile navigation"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-bebas text-3xl uppercase tracking-wide text-white hover:text-grey-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/contact">
                  <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white hover:text-black mt-4">
                    Start a Project
                  </Button>
                </Link>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
