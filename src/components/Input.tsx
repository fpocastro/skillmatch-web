import type { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  isValid?: boolean;
  isLoading?: boolean;
}

function Input({
  isValid = true,
  isLoading = false,
  className,
  id,
  ...props
}: InputProps) {
  return (
    <input
      className={`
        block w-full text-sm rounded-md border p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500
        ${isValid ? "border-gray-300" : "border-red-600"}
        ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"}
        ${className ?? ""}
      `}
      disabled={isLoading}
      readOnly={isLoading}
      aria-invalid={!isValid}
      {...props}
    />
  );
}

export default Input;
