import React, { useState } from "react";
import { cn } from "@/utils/classnames";

const StarIcon = ({ filled, half, size = "md", className, ...props }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <span className="relative">
      {half && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "absolute text-amber-400",
            sizeClasses[size],
            className
          )}
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="none"
          {...props}
        >
          <defs>
            <clipPath id="halfStarClip">
              <rect x="0" y="0" width="12" height="24" />
            </clipPath>
          </defs>
          <path
            clipPath="url(#halfStarClip)"
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          sizeClasses[size],
          filled || half
            ? "text-amber-400"
            : "text-primary-300 dark:text-primary-600",
          className
        )}
        fill="currentColor"
        viewBox="0 0 24 24"
        stroke="none"
        {...props}
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    </span>
  );
};

const Rating = ({
  value = 0,
  max = 5,
  precision = 0.5,
  onChange,
  size = "md",
  readOnly = false,
  className,
  ...props
}) => {
  const [hoverValue, setHoverValue] = useState(-1);

  const handleMouseMove = (event, idx) => {
    if (readOnly) return;

    const rect = event.target.getBoundingClientRect();
    const starWidth = rect.width;
    const offsetX = event.clientX - rect.left;
    const starValue = idx + (offsetX < starWidth / 2 ? 0.5 : 1);

    const roundedValue =
      Math.round(Math.max(Math.min(starValue, max), 0) / precision) * precision;

    setHoverValue(roundedValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(-1);
  };

  const handleClick = (newValue) => {
    if (readOnly) return;

    if (typeof onChange === "function") {
      onChange(newValue);
    }
  };

  const displayValue = hoverValue >= 0 ? hoverValue : value;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < max; i++) {
      const starValue = i + 1;
      const filled = displayValue >= starValue;
      const half = displayValue >= i + 0.5 && displayValue < starValue;

      stars.push(
        <span
          key={i}
          className={cn("inline-block", !readOnly && "cursor-pointer")}
          onMouseMove={(e) => handleMouseMove(e, i)}
          onClick={() => handleClick(Math.max(i + 0.5, precision))}
        >
          <StarIcon filled={filled} half={half} size={size} />
        </span>
      );
    }

    return stars;
  };

  return (
    <div
      className={cn("flex items-center", className)}
      onMouseLeave={handleMouseLeave}
      role={!readOnly ? "slider" : undefined}
      aria-label={!readOnly ? "Rating" : undefined}
      aria-valuemin={!readOnly ? 0 : undefined}
      aria-valuemax={!readOnly ? max : undefined}
      aria-valuenow={!readOnly ? value : undefined}
      {...props}
    >
      {renderStars()}

      {props.showValue && (
        <span className="ml-2 text-sm text-primary-700 dark:text-primary-300">
          {displayValue.toFixed(precision === 1 ? 0 : 1)}
        </span>
      )}
    </div>
  );
};

export { Rating };
