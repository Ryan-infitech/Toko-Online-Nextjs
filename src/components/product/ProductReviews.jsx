import React, { useState } from "react";
import { Rating } from "../ui/Rating";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { cn } from "@/utils/classnames";

const ReviewItem = ({ review }) => {
  const {
    id,
    rating,
    title,
    content,
    user_name,
    created_at,
    is_verified_purchase,
  } = review;

  // Format date
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-b border-primary-100 dark:border-primary-800 py-4 last:border-0">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-primary-900 dark:text-primary-100">
            {title}
          </h4>
          <div className="flex items-center mt-1">
            <Rating value={rating} readOnly size="sm" />
            <span className="ml-2 text-sm text-primary-500 dark:text-primary-400">
              {formattedDate}
            </span>
          </div>
        </div>
        {is_verified_purchase && (
          <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-md">
            Verified Purchase
          </span>
        )}
      </div>

      <div className="mt-3">
        <p className="text-primary-700 dark:text-primary-300 text-sm whitespace-pre-line">
          {content}
        </p>
      </div>

      <div className="mt-2 text-sm text-primary-500 dark:text-primary-400">
        By {user_name || "Anonymous"}
      </div>
    </div>
  );
};

const ReviewForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 bg-primary-50 dark:bg-primary-800/20 rounded-lg p-4"
    >
      <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100 mb-4">
        Write a Review
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
          Rating
        </label>
        <Rating
          value={formData.rating}
          onChange={handleRatingChange}
          size="md"
          showValue
        />
      </div>

      <div className="mb-4">
        <Input
          label="Review Title"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Summarize your experience"
          required
          fullWidth
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1"
        >
          Review
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          className="mt-1 block w-full rounded-md border-primary-300 dark:border-primary-700 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 bg-white dark:bg-primary-800"
          placeholder="Share your experience with this product"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Submit Review
      </Button>
    </form>
  );
};

const ProductReviews = ({
  reviews = [],
  productId,
  onSubmitReview,
  isSubmitting = false,
  showReviewForm = true,
  isLoggedIn = false,
  className,
}) => {
  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  // Rating distribution
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const starRating = 5 - i;
    const count = reviews.filter(
      (review) => review.rating === starRating
    ).length;
    const percentage = reviews.length ? (count / reviews.length) * 100 : 0;

    return { rating: starRating, count, percentage };
  });

  return (
    <div className={cn("mt-8", className)}>
      <h2 className="text-xl font-medium text-primary-900 dark:text-primary-100 mb-4">
        Customer Reviews
      </h2>

      {reviews.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Rating summary */}
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-primary-900 shadow-elegant rounded-lg p-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary-900 dark:text-primary-100">
                  {averageRating}
                </span>
                <Rating
                  value={parseFloat(averageRating)}
                  readOnly
                  size="md"
                  className="mt-1"
                />
                <span className="text-sm text-primary-500 dark:text-primary-400 mt-1">
                  Based on {reviews.length} review
                  {reviews.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center text-sm">
                    <span className="w-12 text-primary-600 dark:text-primary-400">
                      {rating} star{rating !== 1 ? "s" : ""}
                    </span>
                    <div className="flex-1 mx-2 h-2 rounded-full bg-primary-100 dark:bg-primary-800 overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-primary-600 dark:text-primary-400">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {showReviewForm && !isLoggedIn && (
              <div className="mt-4 bg-primary-50 dark:bg-primary-800/20 rounded-lg p-4 text-center">
                <p className="text-primary-600 dark:text-primary-400 mb-2">
                  You need to be logged in to submit a review
                </p>
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </div>
            )}
          </div>

          {/* Reviews list and form */}
          <div className="md:w-2/3">
            {/* Review Form */}
            {showReviewForm && isLoggedIn && (
              <ReviewForm
                onSubmit={onSubmitReview}
                isSubmitting={isSubmitting}
              />
            )}

            {/* Reviews List */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100 mb-2">
                {reviews.length} Review{reviews.length !== 1 ? "s" : ""}
              </h3>

              <div className="border-t border-primary-100 dark:border-primary-800 mt-2">
                {reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-primary-50 dark:bg-primary-800/20 rounded-lg p-6 text-center">
          <p className="text-primary-600 dark:text-primary-400 mb-4">
            This product has no reviews yet. Be the first to share your
            experience!
          </p>

          {showReviewForm && isLoggedIn ? (
            <ReviewForm onSubmit={onSubmitReview} isSubmitting={isSubmitting} />
          ) : (
            showReviewForm && (
              <div>
                <p className="text-primary-600 dark:text-primary-400 mb-2">
                  You need to be logged in to submit a review
                </p>
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
