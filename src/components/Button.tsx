/** biome-ignore-all lint/suspicious/noExplicitAny: <polymorphic element> */
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
  const commonClasses = `
    relative inline-flex h-10 px-4 min-w-10 items-center justify-center border border-transparent text-sm font-medium rounded-sm text-white bg-green-600 cursor-pointer
    transition-all duration-200
    hover:bg-green-700 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  const LoadingSpinner = () => (
    <div className="absolute flex justify-center items-center inset-0">
      <Spinner />
    </div>
  );

  if (asChild && isValidElement(children)) {
    const childrenProps = children.props as any;

    return cloneElement(children as ReactElement<any>, {
      ...props,
      className: `${commonClasses} ${childrenProps.className ?? ""}`,
      children: loading ? (
        <>
          <LoadingSpinner />
          <span className="invisible">{childrenProps.children}</span>
        </>
      ) : (
        childrenProps.children
      ),
    });
  }

  return (
    <button className={commonClasses} disabled={loading} {...props}>
      {loading && <LoadingSpinner />}
      <span className={loading ? "invisible" : ""}>{children}</span>
    </button>
  );
}
