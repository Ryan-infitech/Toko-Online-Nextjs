import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/classnames";
import { Loader } from "../ui/Loader";

const CategoryCard = ({ category, isCompact = false }) => {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn(
        "group block rounded-lg overflow-hidden bg-white dark:bg-primary-900",
        "transition-all duration-300 shadow-elegant hover:shadow-product",
        isCompact ? "h-full" : ""
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          isCompact ? "aspect-[4/3]" : "aspect-square"
        )}
      >
        {category.image_url ? (
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-primary-400 dark:text-primary-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-medium text-lg">{category.name}</h3>
          {category.product_count && !isCompact && (
            <p className="text-sm text-white/90 mt-1">
              {category.product_count} product
              {category.product_count !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {/* Compact card footer with count */}
      {isCompact && category.product_count && (
        <div className="p-3 text-primary-700 dark:text-primary-300 text-sm">
          {category.product_count} product
          {category.product_count !== 1 ? "s" : ""}
        </div>
      )}
    </Link>
  );
};

const CategoryList = ({
  categories = [],
  isLoading = false,
  error = null,
  layout = "grid", // 'grid' or 'carousel' or 'list'
  showSubcategories = true,
  className,
  title,
  isCompact = false,
  columns = {
    sm: 2,
    md: 3,
    lg: 4,
  },
}) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (id) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

  // Filter categories to get only parent ones
  const parentCategories = categories.filter((cat) => !cat.parent_id);

  // Create a map of subcategories by parent ID
  const subcategoriesByParent = {};
  categories
    .filter((cat) => cat.parent_id)
    .forEach((cat) => {
      if (!subcategoriesByParent[cat.parent_id]) {
        subcategoriesByParent[cat.parent_id] = [];
      }
      subcategoriesByParent[cat.parent_id].push(cat);
    });

  // Handle loading state
  if (isLoading) {
    return (
      <div className={cn("py-10 text-center", className)}>
        <Loader size="lg" label="Loading categories..." />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className={cn("py-4", className)}>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded text-red-700 dark:text-red-300">
          Failed to load categories. {error.message}
        </div>
      </div>
    );
  }

  // Handle empty state
  if (!categories || categories.length === 0) {
    return null;
  }

  // For grid layout - typically for category pages
  if (layout === "grid") {
    return (
      <div className={className}>
        {title && (
          <h2 className="text-xl font-medium text-primary-900 dark:text-primary-100 mb-4">
            {title}
          </h2>
        )}
        <div className={cn("grid gap-6", getColumnsClass())}>
          {parentCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isCompact={isCompact}
            />
          ))}
        </div>
      </div>
    );
  }

  // For carousel layout - typically for homepage
  if (layout === "carousel") {
    return (
      <div className={className}>
        {title && (
          <h2 className="text-xl font-medium text-primary-900 dark:text-primary-100 mb-4">
            {title}
          </h2>
        )}
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {parentCategories.map((category) => (
            <div key={category.id} className="flex-none w-[180px] md:w-[220px]">
              <CategoryCard category={category} isCompact={true} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // For list layout with hierarchical display (default)
  return (
    <div className={className}>
      {title && (
        <h2 className="text-xl font-medium text-primary-900 dark:text-primary-100 mb-4">
          {title}
        </h2>
      )}
      <ul className="space-y-1">
        {parentCategories.map((category) => (
          <li key={category.id}>
            <div className="flex flex-col">
              <div className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-primary-100 dark:hover:bg-primary-800/50 transition-colors">
                <Link
                  href={`/category/${category.slug}`}
                  className="flex-grow text-primary-900 dark:text-primary-100 hover:text-accent dark:hover:text-accent-light"
                >
                  {category.name}
                  {category.product_count && (
                    <span className="ml-2 text-sm text-primary-500 dark:text-primary-400">
                      ({category.product_count})
                    </span>
                  )}
                </Link>

                {subcategoriesByParent[category.id] &&
                  subcategoriesByParent[category.id].length > 0 && (
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="p-1 text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200"
                      aria-expanded={expandedCategories[category.id]}
                      aria-label={`${
                        expandedCategories[category.id] ? "Collapse" : "Expand"
                      } ${category.name} subcategories`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={cn(
                          "w-5 h-5 transition-transform",
                          expandedCategories[category.id]
                            ? "transform rotate-180"
                            : ""
                        )}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
              </div>

              {subcategoriesByParent[category.id] &&
                expandedCategories[category.id] && (
                  <ul className="ml-6 mt-1 space-y-1 border-l-2 border-primary-100 dark:border-primary-800 pl-2">
                    {subcategoriesByParent[category.id].map((subcat) => (
                      <li key={subcat.id}>
                        <Link
                          href={`/category/${subcat.slug}`}
                          className="block py-1.5 px-2 text-primary-700 dark:text-primary-300 hover:text-accent dark:hover:text-accent-light rounded-md hover:bg-primary-50 dark:hover:bg-primary-800/30 transition-colors"
                        >
                          {subcat.name}
                          {subcat.product_count && (
                            <span className="ml-2 text-sm text-primary-500 dark:text-primary-400">
                              ({subcat.product_count})
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
