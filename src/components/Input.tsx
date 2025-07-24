import type { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  invalid?: boolean;
}

export function Input({
  invalid = false,
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`
        relative block w-full h-10 text-sm rounded-sm border px-3 bg-gray-50
        focus:outline-none focus:ring-2 focus:ring-green-500 
        disabled:cursor-not-allowed disabled:opacity-50
        ${invalid ? "border-red-600" : "border-gray-300"}
        ${className}
      `}
      aria-invalid={invalid}
      {...props}
    />
  );
}
