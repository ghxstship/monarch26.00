'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../ui/Typography';
import { Container } from '../layout/Container';

export function Hero() {
  return (
    <section className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 border-2 border-white"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 bg-white"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

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
              Charter the Uncharted
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography variant="body" className="text-grey-400 max-w-2xl mx-auto mb-12">
              Global experiential production agency specializing in immersive entertainment, 
              experiential marketing, creative media, and integrated technology.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Typography variant="meta" className="text-grey-500" uppercase>
              Tampa, FL // Global Remote
            </Typography>
            <Typography variant="meta" className="text-grey-500" uppercase>
              Est. 2022
            </Typography>
            <Typography variant="meta" className="text-grey-500" uppercase>
              52+ Countries
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
