import React from "react";
import Link from "next/link";
import { cn } from "@/utils/classnames";

const BreadcrumbItem = ({
  children,
  className,
  href,
  isCurrent,
  separator = "/",
  ...props
}) => {
  const itemClasses = cn(
    "inline-flex items-center",
    isCurrent
      ? "font-medium text-primary-900 dark:text-primary-100"
      : "text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-200",
    className
  );

  return (
    <li className="inline-flex items-center" {...props}>
      {!isCurrent && separator && (
        <span
          className="mx-2 text-primary-400 dark:text-primary-600"
          aria-hidden="true"
        >
          {separator}
        </span>
      )}
      {href && !isCurrent ? (
        <Link href={href} className={itemClasses}>
          {children}
        </Link>
      ) : (
        <span
          className={itemClasses}
          aria-current={isCurrent ? "page" : undefined}
        >
          {children}
        </span>
      )}
    </li>
  );
};

const Breadcrumb = ({
  children,
  className,
  separator = "/",
  homeIcon = true,
  homeText = "Home",
  homeHref = "/",
  items = [],
  ...props
}) => {
  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb" {...props}>
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {/* Home item */}
        <li className="inline-flex items-center">
          <Link
            href={homeHref}
            className="inline-flex items-center text-sm text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-200"
          >
            {homeIcon && (
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            )}
            {homeText}
          </Link>
        </li>

        {/* If items array is provided, render them */}
        {items.length > 0
          ? items.map((item, index) => (
              <BreadcrumbItem
                key={index}
                href={item.href}
                isCurrent={index === items.length - 1}
                separator={separator}
              >
                {item.label}
              </BreadcrumbItem>
            ))
          : children}
      </ol>
    </nav>
  );
};

export { Breadcrumb, BreadcrumbItem };
