import React from "react";
import { cn } from "@/utils/classnames";

const Pagination = ({
  className,
  currentPage,
  totalPages,
  onPageChange,
  showControls = true,
  siblingCount = 1,
  ...props
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPageNumbers = siblingCount * 2 + 3; // siblings on both sides + current + first + last

    // Case 1: Total pages less than total page numbers to display
    if (totalPageNumbers >= totalPages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return { pageNumbers, showLeftEllipsis: false, showRightEllipsis: false };
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    // Always include first and last page
    pageNumbers.push(1);

    if (showLeftEllipsis) {
      pageNumbers.push("left-ellipsis");
    }

    // Add sibling pages and current page
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }

    if (showRightEllipsis) {
      pageNumbers.push("right-ellipsis");
    }

    pageNumbers.push(totalPages);

    return { pageNumbers, showLeftEllipsis, showRightEllipsis };
  };

  const { pageNumbers } = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className={cn("flex items-center justify-center", className)}
      aria-label="Pagination"
      {...props}
    >
      <ul className="flex items-center -space-x-px">
        {showControls && (
          <li>
            <button
              onClick={handlePrevious}
              disabled={currentPage <= 1}
              className={cn(
                "relative inline-flex items-center px-3 py-2 border border-primary-300 dark:border-primary-700 rounded-l-md text-sm font-medium",
                currentPage <= 1
                  ? "text-primary-400 dark:text-primary-600 cursor-not-allowed"
                  : "text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              )}
              aria-label="Previous Page"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        )}

        {pageNumbers.map((page, idx) => {
          if (page === "left-ellipsis" || page === "right-ellipsis") {
            return (
              <li key={`ellipsis-${idx}`}>
                <span className="relative inline-flex items-center px-4 py-2 border border-primary-300 dark:border-primary-700 text-sm text-primary-700 dark:text-primary-300">
                  &hellip;
                </span>
              </li>
            );
          }

          const isActive = page === currentPage;

          return (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={cn(
                  "relative inline-flex items-center px-4 py-2 border text-sm font-medium",
                  isActive
                    ? "z-10 bg-accent border-accent text-white"
                    : "border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          );
        })}

        {showControls && (
          <li>
            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages}
              className={cn(
                "relative inline-flex items-center px-3 py-2 border border-primary-300 dark:border-primary-700 rounded-r-md text-sm font-medium",
                currentPage >= totalPages
                  ? "text-primary-400 dark:text-primary-600 cursor-not-allowed"
                  : "text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              )}
              aria-label="Next Page"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export { Pagination };
