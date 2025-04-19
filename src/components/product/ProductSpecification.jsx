import React, { useState } from "react";
import { cn } from "@/utils/classnames";

const ProductSpecification = ({
  specifications = [],
  className,
  initialVisibleItems = 5,
}) => {
  const [showAll, setShowAll] = useState(false);

  if (!specifications || specifications.length === 0) {
    return (
      <div className="bg-primary-50 dark:bg-primary-800/20 p-4 rounded text-primary-500 dark:text-primary-400 text-center">
        No specifications available for this product.
      </div>
    );
  }

  // Sort specifications by display order
  const sortedSpecs = [...specifications].sort(
    (a, b) => a.display_order - b.display_order
  );

  // Decide which specs to show based on the showAll state
  const visibleSpecs = showAll
    ? sortedSpecs
    : sortedSpecs.slice(0, initialVisibleItems);

  return (
    <div className={cn("mt-6", className)}>
      <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100 mb-4">
        Specifications
      </h3>

      <div className="bg-white dark:bg-primary-900 rounded-lg shadow-elegant overflow-hidden">
        <table className="min-w-full divide-y divide-primary-200 dark:divide-primary-700">
          <tbody className="divide-y divide-primary-100 dark:divide-primary-800">
            {visibleSpecs.map((spec, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "bg-primary-50 dark:bg-primary-800/30" : ""
                }
              >
                <td className="px-4 py-3 text-sm font-medium text-primary-900 dark:text-primary-200 w-1/3">
                  {spec.spec_name}
                </td>
                <td className="px-4 py-3 text-sm text-primary-700 dark:text-primary-300">
                  {spec.spec_value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Show more button if specifications are more than initialVisibleItems */}
        {specifications.length > initialVisibleItems && (
          <div className="px-4 py-3 bg-primary-50 dark:bg-primary-800/20 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-accent hover:text-accent-dark dark:hover:text-accent-light font-medium text-sm focus:outline-none focus:underline"
            >
              {showAll
                ? "Show Less"
                : `Show All Specifications (${specifications.length})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSpecification;
