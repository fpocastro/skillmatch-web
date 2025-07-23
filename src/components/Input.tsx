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
        block w-full text-sm rounded-md border p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500
        ${valid ? "border-gray-300" : "border-red-600"}
        ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"}
        ${className}
      `}
      disabled={disabled}
      readOnly={disabled}
      aria-invalid={!valid}
      {...props}
    />
  );
}
