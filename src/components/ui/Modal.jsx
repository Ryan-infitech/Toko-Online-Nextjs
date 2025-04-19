import React, { Fragment, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/classnames";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  size = "md",
  closeOnClickOutside = true,
  closeOnEsc = true,
  showCloseButton = true,
  ...props
}) => {
  const modalRef = useRef(null);
  const sizeClasses = {
    sm: "sm:max-w-md",
    md: "sm:max-w-lg",
    lg: "sm:max-w-xl",
    xl: "sm:max-w-2xl",
    "2xl": "sm:max-w-4xl",
    full: "sm:max-w-full sm:m-4",
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (closeOnEsc && e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEsc, onClose]);

  const handleBackdropClick = (e) => {
    if (
      closeOnClickOutside &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto",
        "bg-black bg-opacity-50 dark:bg-opacity-70 backdrop-blur-sm",
        "transition-opacity animate-fade-in"
      )}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      {...props}
    >
      <div
        ref={modalRef}
        className={cn(
          "relative w-full mx-4 sm:mx-auto",
          "bg-white dark:bg-primary-900 rounded-lg shadow-elegant",
          "animate-slide-up p-6",
          sizeClasses[size],
          className
        )}
      >
        {showCloseButton && (
          <button
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200 transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {title && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100">
              {title}
            </h3>
          </div>
        )}
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );

  // Use createPortal only if document is available (client-side)
  if (typeof document !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  return null;
};

// Modal subcomponents
const ModalHeader = ({ className, children, ...props }) => (
  <div className={cn("mb-4", className)} {...props}>
    {children}
  </div>
);

const ModalBody = ({ className, children, ...props }) => (
  <div className={cn("py-2 overflow-y-auto", className)} {...props}>
    {children}
  </div>
);

const ModalFooter = ({ className, children, ...props }) => (
  <div className={cn("mt-5 flex justify-end gap-3", className)} {...props}>
    {children}
  </div>
);

export { Modal, ModalHeader, ModalBody, ModalFooter };
