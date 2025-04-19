import React, { forwardRef } from "react";
import { cn } from "@/utils/classnames";

const Checkbox = forwardRef(
  ({ className, label, id, error, helperText, ...props }, ref) => {
    const checkboxId = id || Math.random().toString(36).substring(2, 9);

    return (
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={cn(
              "h-4 w-4 rounded border-primary-300 dark:border-primary-700 text-accent focus:ring-accent dark:focus:ring-offset-primary-900",
              error && "border-error focus:ring-error",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              className
            )}
            {...props}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error || helperText ? `${checkboxId}-description` : undefined
            }
          />
        </div>
        <div className="ml-2 text-sm">
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                "font-medium text-primary-900 dark:text-primary-100",
                props.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {label}
            </label>
          )}
          {(error || helperText) && (
            <p
              id={`${checkboxId}-description`}
              className={cn(
                "mt-1 text-sm",
                error ? "text-error" : "text-primary-500 dark:text-primary-400"
              )}
            >
              {error || helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
