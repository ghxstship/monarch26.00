import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from './Typography';
import Image from 'next/image';

interface CardProps {
  type: 'project' | 'service' | 'statistic';
  image?: string;
  title: string;
  description?: string;
  metadata?: string;
  icon?: React.ReactNode;
  value?: string | number;
  className?: string;
  onClick?: () => void;
}

export function Card({ 
  type,
  image,
  title,
  description,
  metadata,
  icon,
  value,
  className = '',
  onClick
}: CardProps) {
  const baseClasses = `
    border-2 border-black
    bg-white
    overflow-hidden
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  if (type === 'project') {
    return (
      <motion.div
        className={baseClasses}
        onClick={onClick}
        whileHover={{ scale: onClick ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {image && (
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover duotone-filter"
            />
          </div>
        )}
        <div className="p-4 sm:p-6 md:p-8">
          <Typography variant="h4" uppercase className="mb-2 text-sm sm:text-base md:text-lg leading-tight">
            {title}
          </Typography>
          {metadata && (
            <Typography variant="meta" uppercase className="text-grey-600 text-xs sm:text-sm leading-tight break-words">
              {metadata}
            </Typography>
          )}
        </div>
      </motion.div>
    );
  }

  if (type === 'service') {
    return (
      <motion.div
        className={`${baseClasses} p-4 sm:p-6 md:p-8`}
        onClick={onClick}
        whileHover={{ scale: onClick ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {icon && (
          <div className="mb-3 sm:mb-4 text-black">
            {icon}
          </div>
        )}
        <Typography variant="h3" uppercase className="mb-3 sm:mb-4 text-base sm:text-lg md:text-xl leading-tight">
          {title}
        </Typography>
        {description && (
          <Typography variant="body" className="text-grey-700 text-sm sm:text-base leading-relaxed">
            {description}
          </Typography>
        )}
      </motion.div>
    );
  }

  if (type === 'statistic') {
    return (
      <motion.div
        className={`${baseClasses} p-4 sm:p-6 md:p-8 text-center flex flex-col justify-center min-h-[160px] sm:min-h-[180px]`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Typography variant="hero" className="mb-2 sm:mb-3 leading-none text-3xl sm:text-4xl md:text-5xl">
          {value}
        </Typography>
        <Typography variant="h5" uppercase className="text-xs sm:text-sm md:text-base leading-tight">
          {title}
        </Typography>
      </motion.div>
    );
  }

  return null;
}
