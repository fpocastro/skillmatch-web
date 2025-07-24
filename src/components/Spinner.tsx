import type { ComponentPropsWithoutRef } from "react";

interface SpinnerProps extends ComponentPropsWithoutRef<"span"> {}

export function Spinner({ className = "", ...props }: SpinnerProps) {
  return (
    <span
      className={`
        w-4 h-4 border-s-transparent border-solid border-2 rounded-full animate-[spin_500ms_linear_infinite]
        ${className ?? ""}
      `}
      {...props}
    />
  );
}
