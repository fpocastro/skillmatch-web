/** biome-ignore-all lint/suspicious/noExplicitAny: <polymorphic element> */
import type { ComponentPropsWithRef, ReactElement } from "react";
import { cloneElement, isValidElement } from "react";
import { Spinner } from "./Spinner";

type ButtonBaseProps = Omit<ComponentPropsWithRef<"button">, "children">;

interface IconButtonProps extends ButtonBaseProps {
  icon: ReactElement;
  loading?: boolean;
  asChild?: boolean;
  asChildElement?: ReactElement<any>;
}

export function IconButton({
  icon,
  loading = false,
  asChild = false,
  asChildElement,
  className = "",
  ...props
}: IconButtonProps) {
  const commonClasses = `
    relative inline-flex h-10 w-10 items-center justify-center border border-transparent
    text-sm font-medium rounded-sm text-white cursor-pointer
    transition-all duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <Spinner />
    </div>
  );

  const iconProps = icon.props as any;

  const mergedIcon = isValidElement(icon)
    ? cloneElement(icon as ReactElement<any>, {
        className: `h-5 w-5 ${iconProps.className ?? ""}`.trim(),
        "aria-hidden": true,
      })
    : icon;

  if (asChild && isValidElement(asChildElement)) {
    const childProps = asChildElement.props as any;

    return cloneElement(asChildElement as ReactElement<any>, {
      ...props,
      className: `${commonClasses} ${childProps.className ?? ""}`,
      "aria-busy": loading || props["aria-busy"],
      children: loading ? (
        <>
          <LoadingSpinner />
          <span className="invisible" aria-hidden="true">
            {mergedIcon}
          </span>
        </>
      ) : (
        mergedIcon
      ),
    });
  }

  return (
    <button
      className={commonClasses}
      disabled={loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      <span className={loading ? "invisible" : ""} aria-hidden="true">
        {mergedIcon}
      </span>
    </button>
  );
}
