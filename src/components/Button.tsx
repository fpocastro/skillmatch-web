import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  loading?: boolean;
}

export function Button({
  loading = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const spinnerDisplay = loading ? "inline-flex" : "hidden";
  const childrenDisplay = loading ? "invisible contents" : "";

  return (
    <button
      className={`
        relative inline-flex h-10 px-4 min-w-10 items-center align-middle justify-center border border-transparent text-sm font-medium rounded-sm text-white bg-green-600 cursor-pointer
        transition-all duration-200
        hover:bg-green-700 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className ?? ""}
      `}
      disabled={loading}
      {...props}
    >
      <div
        className={`${spinnerDisplay} absolute justify-center items-center start-[50%] top-2/4 translate-[-50%]`}
      >
        <Spinner />
      </div>

      <span className={childrenDisplay}>{children}</span>
    </button>
  );
}
