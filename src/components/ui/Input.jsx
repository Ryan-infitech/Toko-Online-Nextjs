import React, { forwardRef } from "react";
import { cn } from "@/utils/classnames";

const Input = forwardRef(
  (
    {
      className,
      label,
      id,
      error,
      helperText,
      leftIcon,
      rightIcon,
      type = "text",
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const inputId = id || Math.random().toString(36).substring(2, 9);

    return (
      <div className={cn("relative", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-primary-900 dark:text-primary-100 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            id={inputId}
            className={cn(
              "block px-3 py-2 w-full bg-white dark:bg-primary-800 border border-primary-300 dark:border-primary-700 rounded-md shadow-sm placeholder-primary-400 dark:placeholder-primary-500",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
              "disabled:bg-primary-100 disabled:text-primary-500 disabled:cursor-not-allowed",
              error && "border-error focus:border-error focus:ring-error",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error || helperText ? `${inputId}-description` : undefined
            }
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-primary-500">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            id={`${inputId}-description`}
            className={cn(
              "mt-1 text-sm",
              error ? "text-error" : "text-primary-500 dark:text-primary-400"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
