import React, { useState, useRef } from "react";
import { cn } from "@/utils/classnames";
import ProductCard from "./ProductCard";
import { Button } from "../ui/Button";
import { Loader } from "../ui/Loader";

const RelatedProducts = ({
  products = [],
  title = "Related Products",
  isLoading = false,
  error = null,
  onAddToCart,
  onAddToWishlist,
  className,
}) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer for rounding errors
    }
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Pixels to scroll
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });

      // Update button states after scrolling
      setTimeout(updateScrollButtons, 400);
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className={cn("mt-12", className)}>
        <h2 className="text-xl font-medium text-primary-900 dark:text-primary-100 mb-4">
          {title}
        </h2>
        <div className="flex justify-center py-12">
          <Loader variant="spinner" size="lg" />
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className={cn("mt-12", className)}>
        <h2 className="text-xl font-medium text-primary-900 dark:text-primary-100 mb-4">
          {title}
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded text-red-700 dark:text-red-300">
          Failed to load related products.
        </div>
      </div>
    );
  }

  // Handle empty state
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={cn("mt-12", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-primary-900 dark:text-primary-100">
          {title}
        </h2>

        {/* Scroll navigation */}
        <div className="hidden sm:flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "p-2",
              !canScrollLeft && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "p-2",
              !canScrollRight && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Scrollable product container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
        onScroll={updateScrollButtons}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-none w-[220px] sm:w-[260px]">
            <ProductCard
              product={product}
              isCompact={true}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
