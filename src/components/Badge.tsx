import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

const colorVariants = {
  gray: "bg-gray-100 text-gray-800",
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  blue: "bg-blue-100 text-blue-800",
};

interface BadgeProps extends ComponentPropsWithRef<"div"> {
  color?: "gray" | "green" | "red" | "blue";
}

export function Badge({
  color = "gray",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex px-2 py-1 rounded-full text-xs font-medium",
        colorVariants[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
