import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  decorative?: boolean;
}

export function Divider({ 
  orientation = 'horizontal',
  className = '',
  decorative = true
}: DividerProps) {
  const orientationClasses = {
    horizontal: 'w-full h-0.5 border-t-2',
    vertical: 'h-full w-0.5 border-l-2',
  };

  return (
    <hr
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={orientation}
      className={`
        border-black
        ${orientationClasses[orientation]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    />
  );
}
