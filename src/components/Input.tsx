import type { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  valid?: boolean;
}

export function Input({ valid = true, className = "", ...props }: InputProps) {
  return (
    <input
      className={`
        relative block w-full h-10 text-sm rounded-sm border px-3 bg-gray-50
        focus:outline-none focus:ring-2 focus:ring-green-500 
        disabled:cursor-not-allowed disabled:opacity-50
        ${valid ? "border-gray-300" : "border-red-600"}
        ${className}
      `}
      aria-invalid={!valid}
      {...props}
    />
  );
}
