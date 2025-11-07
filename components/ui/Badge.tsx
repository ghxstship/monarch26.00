import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ 
  variant = 'default',
  size = 'md',
  children,
  className = ''
}: BadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const variantClasses = {
    default: 'bg-grey-200 text-grey-900',
    success: 'bg-green-100 text-green-900 border-green-500',
    error: 'bg-red-100 text-red-900 border-red-500',
    warning: 'bg-yellow-100 text-yellow-900 border-yellow-500',
    info: 'bg-blue-100 text-blue-900 border-blue-500',
  };

  return (
    <span
      className={`
        inline-flex items-center
        font-share-mono uppercase tracking-wider
        border-2
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </span>
  );
}
