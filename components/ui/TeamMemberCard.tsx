import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Typography } from './Typography';
import { MapPin, Briefcase, Calendar } from 'lucide-react';

/**
 * TeamMemberCard - Atomic Design Component
 * LinkedIn-style professional card for team members
 * Follows GHXSTSHIP design system tokens
 */

export interface TeamMemberCardProps {
  name: string;
  alias?: string;
  role: string;
  bio: string;
  location?: string;
  yearsExperience?: string;
  founded?: string;
  image?: string;
  className?: string;
}

export function TeamMemberCard({
  name,
  alias,
  role,
  bio,
  location,
  yearsExperience,
  founded,
  image,
  className = '',
}: TeamMemberCardProps) {
  return (
    <motion.div
      className={`border-2 border-black bg-white h-full flex flex-col ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header Section - Photo/Avatar */}
      <div className="relative w-full aspect-square bg-grey-200 flex items-center justify-center border-b-2 border-black">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : (
          <Typography variant="h1" className="text-grey-400" uppercase>
            {name.split(' ').map(n => n[0]).join('')}
          </Typography>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Name & Alias */}
        <div className="mb-4">
          <Typography variant="h3" uppercase className="mb-1">
            {name}
          </Typography>
          {alias && (
            <Typography variant="body" className="text-grey-600 italic text-sm">
              aka {alias}
            </Typography>
          )}
        </div>

        {/* Role */}
        <Typography variant="h5" uppercase className="text-grey-700 mb-4 pb-4 border-b border-grey-300">
          {role}
        </Typography>

        {/* Meta Information */}
        {(location || yearsExperience || founded) && (
          <div className="space-y-2 mb-4">
            {location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-grey-600 flex-shrink-0" />
                <Typography variant="meta" className="text-grey-600 text-sm">
                  {location}
                </Typography>
              </div>
            )}
            {yearsExperience && (
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-grey-600 flex-shrink-0" />
                <Typography variant="meta" className="text-grey-600 text-sm">
                  {yearsExperience} Experience
                </Typography>
              </div>
            )}
            {founded && (
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-grey-600 flex-shrink-0" />
                <Typography variant="meta" className="text-grey-600 text-sm">
                  Founded {founded}
                </Typography>
              </div>
            )}
          </div>
        )}

        {/* Bio */}
        <Typography variant="body" className="text-grey-700 leading-relaxed text-sm">
          {bio}
        </Typography>
      </div>
    </motion.div>
  );
}
