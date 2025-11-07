import React from 'react';

interface TypographyProps {
  variant: 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'meta';
  children: React.ReactNode;
  className?: string;
  uppercase?: boolean;
  as?: React.ElementType;
}

export function Typography({ 
  variant, 
  children, 
  className = '',
  uppercase = false,
  as
}: TypographyProps) {
  const baseClasses = {
    hero: 'font-anton text-[clamp(48px,10vw,120px)] leading-none',
    h1: 'font-anton text-[clamp(36px,8vw,80px)] leading-tight',
    h2: 'font-bebas text-[clamp(28px,5vw,56px)] leading-tight tracking-wide',
    h3: 'font-bebas text-[clamp(24px,4vw,40px)] leading-tight tracking-wide',
    h4: 'font-bebas text-[clamp(20px,3vw,32px)] leading-normal tracking-wide',
    h5: 'font-bebas text-[clamp(18px,2.5vw,24px)] leading-normal tracking-wide',
    h6: 'font-bebas text-[clamp(16px,2vw,20px)] leading-normal tracking-wide',
    body: 'font-share text-[clamp(15px,1.5vw,18px)] leading-relaxed',
    meta: 'font-share-mono text-[clamp(11px,1.2vw,14px)] leading-normal tracking-widest',
  };

  const defaultTags = {
    hero: 'h1',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body: 'p',
    meta: 'span',
  };

  const Component = as || defaultTags[variant];

  return React.createElement(
    Component,
    {
      className: `
        ${baseClasses[variant]}
        ${uppercase ? 'uppercase' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')
    },
    children
  );
}
