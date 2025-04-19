import React, { forwardRef } from "react";
import { cn } from "@/utils/classnames";

const Select = forwardRef(
  (
    {
      className,
      label,
      id,
      error,
      helperText,
      options = [],
      placeholder,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const selectId = id || Math.random().toString(36).substring(2, 9);

    return (
      <div className={cn("relative", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-primary-900 dark:text-primary-100 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-primary-800 border border-primary-300 dark:border-primary-700 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent",
              "appearance-none",
              "disabled:bg-primary-100 disabled:text-primary-500 disabled:cursor-not-allowed",
              error && "border-error focus:border-error focus:ring-error",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error || helperText ? `${selectId}-description` : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-primary-400 dark:text-primary-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {(error || helperText) && (
          <p
            id={`${selectId}-description`}
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

Select.displayName = "Select";

export { Select };
