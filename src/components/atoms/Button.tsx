import React, { ButtonHTMLAttributes } from 'react';

/**
 * ButtonProps Interface
 * Extends native HTML button attributes with custom props
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * Button Component
 * 
 * Reusable button with gradient background and hover effects.
 * Inherits all native button HTML attributes.
 * 
 */
export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      // Base styles + gradient + hover effects + disabled states + custom classes
      className={`w-full py-3 px-4 bg-gradient-to-r cursor-pointer from-[#5C3DFF] to-[#7D5CFF] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#5C3DFF]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};