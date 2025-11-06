import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  href?: string;
}

export function Button({ 
  variant = 'outlined',
  size = 'md',
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  href
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[2.5rem]',
    md: 'px-6 py-3 text-base min-h-[3rem]',
    lg: 'px-8 py-4 text-lg min-h-[3.5rem]',
  };

  const variantClasses = {
    outlined: 'bg-transparent border-2 border-black text-black hover:bg-black hover:text-white',
    filled: 'bg-black text-white border-2 border-black hover:bg-white hover:text-black',
  };

  const baseClasses = `
    font-bebas uppercase tracking-wide
    transition-all duration-200
    cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </motion.button>
  );
}
