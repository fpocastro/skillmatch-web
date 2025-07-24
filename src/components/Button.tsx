/** biome-ignore-all lint/suspicious/noExplicitAny: <can be any type of element> */
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  loading?: boolean;
  asChild?: boolean;
}

export function Button({
  loading = false,
  asChild = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const spinnerDisplay = loading ? "inline-flex" : "hidden";
  const childrenVisibility = loading ? "invisible contents" : "";

  const commonClasses = `
    relative inline-flex h-10 px-4 min-w-10 items-center justify-center border border-transparent text-sm font-medium rounded-sm text-white bg-green-600 cursor-pointer
    transition-all duration-200
    hover:bg-green-700 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  const content = (
    <>
      <div
        className={`${spinnerDisplay} absolute justify-center items-center start-[50%] top-2/4 translate-[-50%]`}
      >
        <Spinner />
      </div>
      <span className={childrenVisibility}>{children}</span>
    </>
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<any>, {
      ...props,
      className: `${commonClasses} ${(children.props as any)?.className ?? ""}`,
      children: content,
    });
  }

  return (
    <button className={commonClasses} disabled={loading} {...props}>
      {content}
    </button>
  );
}
