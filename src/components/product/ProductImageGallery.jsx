import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/utils/classnames";

const ProductImageGallery = ({ images = [], alt = "Product Image" }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Default to placeholder if no images provided
  const imageList =
    images.length > 0
      ? images
      : [{ image_url: "/images/placeholder-product.jpg", alt_text: alt }];

  // Reset selected image when images change
  useEffect(() => {
    setSelectedImage(0);
  }, [images]);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleZoom = (e) => {
    if (!isZoomed) return;

    // Get container dimensions
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();

    // Calculate position as percentage
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const currentImage =
    imageList[selectedImage]?.image_url || "/images/placeholder-product.jpg";
  const currentAlt = imageList[selectedImage]?.alt_text || alt;

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Image */}
      <div
        className={cn(
          "relative rounded-lg overflow-hidden bg-white",
          "border border-primary-100 dark:border-primary-800",
          "aspect-square",
          "cursor-zoom-in",
          isZoomed && "cursor-zoom-out"
        )}
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleZoom}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={currentImage}
          alt={currentAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className={cn(
            "object-contain",
            isZoomed && "scale-150 transition-transform duration-0"
          )}
          style={
            isZoomed
              ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  objectPosition: "center",
                }
              : {}
          }
        />
      </div>

      {/* Thumbnail Navigation */}
      {imageList.length > 1 && (
        <div className="flex overflow-x-auto space-x-2 pb-1">
          {imageList.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative min-w-[4rem] h-16 rounded border-2 overflow-hidden flex-shrink-0",
                "focus:outline-none focus:ring-2 focus:ring-accent",
                selectedImage === index
                  ? "border-accent"
                  : "border-primary-200 dark:border-primary-700"
              )}
              onClick={() => handleImageClick(index)}
              aria-current={selectedImage === index}
              aria-label={`Image ${index + 1} of ${images.length}`}
            >
              <Image
                src={image.image_url}
                alt={image.alt_text || `Product thumbnail ${index + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
