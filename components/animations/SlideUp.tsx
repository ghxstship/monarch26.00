'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SlideUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function SlideUp({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = '' 
}: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
