import React from "react";
import { cn } from "@/utils/classnames";
import ProductCard from "./ProductCard";
import { Loader } from "../ui/Loader";

const ProductGrid = ({
  products = [],
  isLoading = false,
  error = null,
  columns = {
    sm: 2,
    md: 3,
    lg: 4,
  },
  className,
  emptyMessage = "No products found",
  onAddToCart,
  onAddToWishlist,
  isCompact = false,
}) => {
  // Generate column classes
  const getColumnsClass = () => {
    const colClasses = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    };

    return [
      "grid-cols-1",
      columns.sm ? `sm:${colClasses[columns.sm]}` : "",
      columns.md ? `md:${colClasses[columns.md]}` : "",
      columns.lg ? `lg:${colClasses[columns.lg]}` : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  // Show loader when loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader size="lg" label="Loading products..." />
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-md my-4">
        <p className="font-medium">Error loading products</p>
        <p className="text-sm mt-1">
          {error.message || "Please try again later."}
        </p>
      </div>
    );
  }

  // Show empty message
  if (!products || products.length === 0) {
    return (
      <div className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 p-8 rounded-md text-center my-4">
        <p className="font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn("grid", getColumnsClass(), "gap-4 md:gap-6", className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isCompact={isCompact}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
