import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/classnames";
import { formatCurrency } from "@/utils/format";
import { Button } from "../ui/Button";
import { Rating } from "../ui/Rating";

const ProductCard = ({
  product,
  className,
  isCompact = false,
  onAddToCart,
  onAddToWishlist,
  showRating = true,
}) => {
  if (!product) return null;

  const {
    id,
    name,
    slug,
    price,
    sale_price,
    images,
    is_featured,
    rating,
    review_count,
  } = product;

  const imageUrl =
    images && images.length > 0
      ? images[0].image_url
      : "/images/placeholder-product.jpg";

  const isOnSale = sale_price && sale_price < price;
  const discountPercentage = isOnSale
    ? Math.round(((price - sale_price) / price) * 100)
    : 0;

  return (
    <div
      className={cn(
        "group bg-white dark:bg-primary-900 rounded-lg shadow-elegant hover:shadow-product transition duration-300",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        {/* Sale badge */}
        {isOnSale && (
          <div className="absolute top-2 left-2 z-10 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercentage}%
          </div>
        )}

        {/* Featured badge */}
        {is_featured && (
          <div className="absolute top-2 right-2 z-10 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
        )}

        {/* Product image */}
        <Link href={`/products/${slug}`} className="block">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition duration-300 group-hover:scale-105"
              priority={is_featured}
            />
          </div>

          {/* Quick actions overlay */}
          {!isCompact && (
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
              <div className="flex flex-col gap-2 w-full">
                <Button
                  variant="primary"
                  rounded
                  onClick={(e) => {
                    e.preventDefault();
                    onAddToCart && onAddToCart(product);
                  }}
                >
                  Quick Add
                </Button>

                <Button
                  variant="outline"
                  rounded
                  className="bg-white hover:bg-white/90"
                  onClick={(e) => {
                    e.preventDefault();
                    onAddToWishlist && onAddToWishlist(product);
                  }}
                >
                  Wishlist
                </Button>
              </div>
            </div>
          )}
        </Link>
      </div>

      {/* Product details */}
      <div className="p-4">
        <Link href={`/products/${slug}`} className="block">
          <h3 className="text-sm sm:text-base font-medium mb-1 text-primary-900 dark:text-primary-100 hover:text-accent dark:hover:text-accent-light transition duration-200">
            {name}
          </h3>
        </Link>

        {/* Price section */}
        <div className="flex items-center mt-1 mb-2">
          {isOnSale ? (
            <>
              <span className="text-accent font-medium mr-2">
                {formatCurrency(sale_price)}
              </span>
              <span className="text-primary-500 line-through text-sm">
                {formatCurrency(price)}
              </span>
            </>
          ) : (
            <span className="text-primary-900 dark:text-primary-100 font-medium">
              {formatCurrency(price)}
            </span>
          )}
        </div>

        {/* Rating */}
        {showRating && rating && (
          <div className="flex items-center mt-1">
            <Rating value={rating} readOnly size="sm" />
            {review_count && (
              <span className="text-xs text-primary-500 ml-1">
                ({review_count})
              </span>
            )}
          </div>
        )}

        {/* Add to cart button (for compact view) */}
        {isCompact && (
          <Button
            variant="primary"
            size="sm"
            fullWidth
            className="mt-3"
            onClick={() => onAddToCart && onAddToCart(product)}
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
