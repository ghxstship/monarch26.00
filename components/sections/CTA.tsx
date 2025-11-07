'use client';

import React from 'react';
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
            Ready to Disrupt?
          </Typography>
          
          <Typography variant="body" className="text-grey-600 max-w-2xl mx-auto mb-12">
            Let&apos;s create something impossible together. From concept to reality, 
            we handle everything.
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="filled" size="lg">
              Start a Project
            </Button>
            <Button variant="outlined" size="lg">
              View Our Work
            </Button>
          </div>

          <div className="mt-12 pt-12 border-t-2 border-grey-200">
            <Typography variant="meta" className="text-grey-500 mb-4" uppercase>
              Headquarters
            </Typography>
            <Typography variant="body" className="text-grey-700">
              Tampa, FL // Global Remote Team
            </Typography>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
