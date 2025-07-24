import {
  type ComponentPropsWithoutRef,
  createContext,
  type ReactNode,
  useContext,
  useId,
} from "react";
import { Input } from "./Input";

interface FieldContextProps {
  id: string;
  error?: string;
  invalid: boolean;
  disabled: boolean;
}

const FieldContext = createContext<FieldContextProps | null>(null);

interface FieldRootProps extends ComponentPropsWithoutRef<"div"> {
  error?: string;
  invalid?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

function FieldRoot({
  error,
  invalid = false,
  disabled = false,
  children,
  className,
  ...rest
}: FieldRootProps) {
  const id = useId();

  return (
    <FieldContext.Provider value={{ id, error, invalid, disabled }}>
      <div className={`mb-4 ${className ?? ""}`} {...rest}>
        {children}
      </div>
    </FieldContext.Provider>
  );
}

function useField() {
  const ctx = useContext(FieldContext);
  if (!ctx) throw new Error("Field sub-components must be used inside <Field>");
  return ctx;
}

function FieldLabel({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"label">) {
  const { id } = useField();
  return (
    <label
      htmlFor={id}
      className={`block text-sm font-medium text-gray-700 ${className ?? ""}`}
      {...props}
    >
      {children}
    </label>
  );
}

function FieldInput({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) {
  const { id, invalid, disabled } = useField();
  return (
    <Input id={id} name={id} invalid={invalid} disabled={disabled} {...props} />
  );
}

function FieldErrorMessage({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  const { error, id } = useField();

  if (!error) return null;

  return (
    <p
      id={`${id}-error`}
      className={`text-red-600 text-sm mt-1 ${className ?? ""}`}
      {...props}
    >
      {error}
    </p>
  );
}

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Input: FieldInput,
  ErrorMessage: FieldErrorMessage,
};
