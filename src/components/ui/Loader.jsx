import React from "react";
import { cn } from "@/utils/classnames";

const loaderVariants = {
  spinner: {
    container: "relative",
    loader: "animate-spin rounded-full border-r-transparent",
  },
  dots: {
    container: "flex space-x-2",
    loader: "",
  },
  pulse: {
    container: "flex justify-center",
    loader: "animate-pulse",
  },
};

const sizeClasses = {
  xs: {
    spinner: "w-4 h-4 border-2",
    dots: "w-1.5 h-1.5",
    pulse: "w-8 h-8",
  },
  sm: {
    spinner: "w-6 h-6 border-2",
    dots: "w-2 h-2",
    pulse: "w-12 h-12",
  },
  md: {
    spinner: "w-8 h-8 border-2",
    dots: "w-2.5 h-2.5",
    pulse: "w-16 h-16",
  },
  lg: {
    spinner: "w-12 h-12 border-3",
    dots: "w-3 h-3",
    pulse: "w-20 h-20",
  },
  xl: {
    spinner: "w-16 h-16 border-4",
    dots: "w-4 h-4",
    pulse: "w-24 h-24",
  },
};

const SpinnerLoader = ({ size, color }) => (
  <div
    className={cn(
      "border-current rounded-full animate-spin",
      "border-r-transparent",
      sizeClasses[size].spinner
    )}
    style={{
      borderTopColor: color,
      borderRightColor: "transparent",
      borderBottomColor: color,
      borderLeftColor: color,
    }}
  />
);

const DotsLoader = ({ size, color }) => (
  <div className="flex space-x-2">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className={cn(
          "rounded-full",
          sizeClasses[size].dots,
          "opacity-60 animate-pulse"
        )}
        style={{
          backgroundColor: color,
          animationDelay: `${i * 0.15}s`,
          animationDuration: "0.9s",
        }}
      />
    ))}
  </div>
);

const PulseLoader = ({ size, color }) => (
  <svg
    className={cn("animate-pulse", sizeClasses[size].pulse)}
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
      style={{ stroke: color, opacity: 0.25 }}
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      style={{ fill: color }}
    />
  </svg>
);

const Loader = ({
  className,
  variant = "spinner",
  size = "md",
  color = "currentColor",
  label,
  fullScreen = false,
  ...props
}) => {
  const variantStyles = loaderVariants[variant];

  let LoaderComponent;
  switch (variant) {
    case "dots":
      LoaderComponent = <DotsLoader size={size} color={color} />;
      break;
    case "pulse":
      LoaderComponent = <PulseLoader size={size} color={color} />;
      break;
    case "spinner":
    default:
      LoaderComponent = <SpinnerLoader size={size} color={color} />;
  }

  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 dark:bg-primary-900 dark:bg-opacity-75 z-50"
        aria-label={label || "Loading..."}
        {...props}
      >
        <div
          className={cn(
            variantStyles.container,
            "flex flex-col items-center",
            className
          )}
        >
          {LoaderComponent}
          {label && (
            <div className="mt-4 text-primary-700 dark:text-primary-300 text-sm font-medium">
              {label}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(variantStyles.container, "inline-flex", className)}
      aria-label={label || "Loading..."}
      role="status"
      {...props}
    >
      {LoaderComponent}
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
};

export { Loader };
