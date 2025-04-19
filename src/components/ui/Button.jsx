import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/classnames";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary-900 text-white hover:bg-primary-800",
        primary: "bg-accent text-white hover:bg-accent-dark",
        secondary: "bg-primary-100 text-primary-900 hover:bg-primary-200",
        outline: "border border-primary-300 hover:bg-primary-50",
        ghost: "hover:bg-primary-100 hover:text-primary-900",
        link: "text-accent underline-offset-4 hover:underline",
        danger: "bg-error text-white hover:bg-red-600",
        success: "bg-success text-white hover:bg-green-600",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
        icon: "h-9 w-9",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        true: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const Button = ({
  children,
  className,
  variant,
  size,
  fullWidth,
  rounded,
  isLoading,
  loadingText = "Loading...",
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size, fullWidth, rounded }),
        isLoading && "relative cursor-wait",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}
      <span className={isLoading ? "invisible" : ""}>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </span>
    </button>
  );
};

export { Button, buttonVariants };
