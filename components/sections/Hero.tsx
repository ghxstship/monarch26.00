'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';

export function Hero() {
  return (
    <section className="relative min-h-screen bg-black text-white flex items-center justify-center">
      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="hero" className="text-white mb-6" uppercase>
            GHXSTSHIP
          </Typography>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography variant="h1" className="text-white mb-8" uppercase>
              Navigate the Impossible
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-12">
              Thirteen years. Fifty-two countries. More 3 AM crisis calls than we care to count. 
              We&apos;ve built festival stages that defied physics, managed hospitality operations where failure 
              wasn&apos;t an option, and turned &quot;that&apos;s impossible&quot; into &quot;when do you need it by?&quot;
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Typography variant="meta" className="text-grey-500" uppercase>
              Tampa, FL // Global Remote
            </Typography>
            <Typography variant="meta" className="text-grey-500" uppercase>
              Est. 2022
            </Typography>
            <Typography variant="meta" className="text-grey-500" uppercase>
              52 Countries
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="/contact">
              <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all">
                Start a Project
              </button>
            </a>
            <a href="/work">
              <button className="font-bebas uppercase tracking-wide px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all">
                View Our Passport
              </button>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
