import React from "react";
import { cn } from "@/utils/classnames";

const AlertVariants = {
  info: {
    container:
      "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
    icon: "text-blue-400 dark:text-blue-300",
    title: "text-blue-800 dark:text-blue-200",
    description: "text-blue-700 dark:text-blue-300",
  },
  success: {
    container:
      "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800",
    icon: "text-green-400 dark:text-green-300",
    title: "text-green-800 dark:text-green-200",
    description: "text-green-700 dark:text-green-300",
  },
  warning: {
    container:
      "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800",
    icon: "text-yellow-400 dark:text-yellow-300",
    title: "text-yellow-800 dark:text-yellow-200",
    description: "text-yellow-700 dark:text-yellow-300",
  },
  error: {
    container:
      "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800",
    icon: "text-red-400 dark:text-red-300",
    title: "text-red-800 dark:text-red-200",
    description: "text-red-700 dark:text-red-300",
  },
};

const AlertIcons = {
  info: (
    <svg
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  success: (
    <svg
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

const Alert = ({
  className,
  variant = "info",
  title,
  children,
  icon,
  onClose,
  ...props
}) => {
  const styles = AlertVariants[variant];
  const defaultIcon = AlertIcons[variant];

  return (
    <div
      className={cn("p-4 border-l-4 rounded-md", styles.container, className)}
      role="alert"
      {...props}
    >
      <div className="flex items-start">
        {icon !== false && (
          <div className={cn("flex-shrink-0 mr-3", styles.icon)}>
            {icon || defaultIcon}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h3 className={cn("text-sm font-medium mb-1", styles.title)}>
              {title}
            </h3>
          )}
          {children && (
            <div className={cn("text-sm", styles.description)}>{children}</div>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            className={cn(
              "ml-3 flex-shrink-0 inline-flex text-sm p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent",
              styles.icon
            )}
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export { Alert };
