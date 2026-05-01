'use client';

import { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
};

export default function CustomSelect({ value, onChange, options, className = '' }: Props) {
  const [open, setOpen] = useState(false);

  const selected = options.find(opt => opt.value === value);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full px-4 py-2 rounded-xl 
        border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900
        text-gray-800 dark:text-gray-200
        flex items-center justify-between text-sm"
      >
        {selected?.label || 'Select'}
        <span className="text-xs ml-2">▼</span>
      </button>

      {open && (
        <div
          className="absolute mt-2 w-full z-20 
        bg-white dark:bg-gray-900 
        border border-gray-200 dark:border-gray-700 
        rounded-xl shadow-lg overflow-hidden"
        >
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer 
              hover:bg-gray-100 dark:hover:bg-gray-800
              ${value === option.value ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
