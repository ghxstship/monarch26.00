'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';
import { Container } from '../layout/Container';
import { motion } from 'framer-motion';

export function CTA() {
  return (
    <section className="py-32 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Typography variant="hero" uppercase className="mb-8">
            Where To Next?
          </Typography>
          
          <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto mb-12">
            Thirteen years of turning constraints into creative advantages. We&apos;ve delivered festival 
            infrastructure for 50,000+ attendees, managed F1 hospitality operations, and built brand 
            activations for Fortune 500s. If you&apos;ve got the vision and the budget, we&apos;ve got the 
            operational expertise and creative audacity to make it real.
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="filled" size="lg">
                Start a Project
              </Button>
            </Link>
            <Link href="/work">
              <Button variant="outlined" size="lg">
                View Our Work
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-12 border-t-2 border-grey-200">
            <Typography variant="meta" className="text-grey-500 mb-4" uppercase>
              Headquarters
            </Typography>
            <Typography variant="body" className="text-grey-700">
              Tampa, FL // Global Team
            </Typography>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
