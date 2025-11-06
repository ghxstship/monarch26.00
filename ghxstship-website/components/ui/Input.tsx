import React from 'react';
import { Typography } from './Typography';

interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'textarea';
  name: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number;
}

export function Input({ 
  label,
  type = 'text',
  name,
  placeholder,
  error,
  required = false,
  className = '',
  value,
  onChange,
  rows = 4
}: InputProps) {
  const baseClasses = `
    w-full
    px-4 py-3
    border-2 border-black
    bg-white
    font-share
    text-base
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
    ${error ? 'border-red-500' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="w-full">
      <label htmlFor={name} className="block mb-2">
        <Typography variant="h6" uppercase>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Typography>
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          className={baseClasses}
          value={value}
          onChange={onChange}
          rows={rows}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={baseClasses}
          value={value}
          onChange={onChange}
        />
      )}
      
      {error && (
        <Typography variant="meta" className="text-red-500 mt-1">
          {error}
        </Typography>
      )}
    </div>
  );
}
