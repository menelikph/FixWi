import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`w-full py-3 px-4 bg-gradient-to-r from-[#5C3DFF] to-[#7D5CFF] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#5C3DFF]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};