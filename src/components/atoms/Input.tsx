import React, { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  rightElement?: React.ReactNode;
}

export const Input = ({ icon: Icon, rightElement, className, ...props }: InputProps) => {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      )}
      <input
        className={`w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3DFF] focus:border-transparent ${
          Icon ? 'pl-10' : 'pl-4'
        } ${rightElement ? 'pr-12' : 'pr-4'} ${className}`}
        autoComplete="on"
        {...props}
      />
      {rightElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
  );
};