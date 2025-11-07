import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
}

export function Avatar({ 
  src,
  alt,
  size = 'md',
  fallback,
  className = ''
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-lg',
  };

  const initials = fallback || alt.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div
      className={`
        relative
        ${sizeClasses[size]}
        rounded-full
        overflow-hidden
        bg-grey-300
        border-2 border-black
        flex items-center justify-center
        font-bebas
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      ) : (
        <span aria-label={alt}>{initials}</span>
      )}
    </div>
  );
}
