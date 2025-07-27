import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

const formVariants = {
  circle: "rounded-full",
  square: "rounded-sm",
  free: "",
};

type SkeletonForm = "circle" | "square" | "free";

interface SkeletonProps extends ComponentPropsWithRef<"div"> {
  form?: SkeletonForm;
}

export function Skeleton({
  form = "square",
  className = "",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        "bg-gray-300 animate-pulse",
        formVariants[form],
        className
      )}
      {...props}
    />
  );
}
