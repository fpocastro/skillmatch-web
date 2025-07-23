import type { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  valid?: boolean;
}

export function Input({
  valid = true,
  disabled = false,
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`
        block w-full text-sm rounded-md border p-2.5 bg-gray-50
        focus:outline-none focus:ring-2 focus:ring-green-500 
        disabled:bg-gray-100 disabled:cursor-not-allowed
        ${valid ? "border-gray-300" : "border-red-600"}
        ${className}
      `}
      disabled={disabled}
      readOnly={disabled}
      aria-invalid={!valid}
      {...props}
    />
  );
}
