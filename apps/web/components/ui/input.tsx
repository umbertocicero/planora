import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/* Minecraft input — inset bevel, dark stone background */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full mc-inset bg-[#3B3B3B] text-white px-3 py-2 text-sm font-pixel',
          'placeholder:text-[#888] file:border-0 file:bg-transparent file:text-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D8A3A]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
