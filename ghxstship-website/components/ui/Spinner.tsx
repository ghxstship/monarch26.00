import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-label'?: string;
}

export function Spinner({ 
  size = 'md',
  className = '',
  'aria-label': ariaLabel = 'Loading'
}: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`
        inline-block
        ${sizeClasses[size]}
        border-black border-t-transparent
        rounded-full
        animate-spin
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}
