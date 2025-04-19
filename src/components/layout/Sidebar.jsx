import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { cn } from "@/utils/classnames";
import CategoryList from "@/components/product/CategoryList";
import { Button } from "@/components/ui/Button";

// Account navigation items
const accountNavItems = [
  {
    label: "Account Overview",
    href: "/account",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "Orders",
    href: "/account/orders",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
  },
  {
    label: "Addresses",
    href: "/account/addresses",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    label: "Wishlist",
    href: "/account/wishlist",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    label: "Reviews",
    href: "/account/reviews",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/account/settings",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

// Admin navigation items
const adminNavItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    label: "Reviews",
    href: "/admin/reviews",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
  {
    label: "Marketing",
    href: "/admin/marketing",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

// Support navigation items
const helpNavItems = [
  {
    label: "Help Center",
    href: "/help",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "Contact Us",
    href: "/contact",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: "FAQs",
    href: "/faqs",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
];

const Sidebar = ({
  variant = "default", // 'default', 'admin', 'account'
  className,
  categories = [],
  isLoading = false,
  categoriesError = null,
  collapsible = false,
  defaultCollapsed = false,
  onCategoryClick,
  showHeader = true,
  title,
}) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Toggle mobile menu display
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle category expansion (for nested categories)
  const toggleCategory = (id) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Check if a route is active
  const isActive = (href) => {
    if (!href) return false;
    return router.pathname === href || router.pathname.startsWith(`${href}/`);
  };

  // Admin sidebar variant
  if (variant === "admin") {
    return (
      <div
        className={cn(
          "h-full bg-white dark:bg-primary-900",
          "border-r border-primary-200 dark:border-primary-800",
          "transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          className
        )}
      >
        {/* Admin Sidebar Header */}
        {showHeader && (
          <div className="h-16 flex items-center justify-between px-4 border-b border-primary-200 dark:border-primary-800">
            {!collapsed && (
              <Link
                href="/admin/dashboard"
                className="flex items-center space-x-2"
              >
                <Image
                  src="/logo.svg"
                  alt="Admin Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <span className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                  Admin
                </span>
              </Link>
            )}
            {collapsed && (
              <Link
                href="/admin/dashboard"
                className="flex items-center justify-center w-full"
              >
                <Image
                  src="/logo.svg"
                  alt="Admin Logo"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </Link>
            )}
            {collapsible && !collapsed && (
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-md text-primary-500 hover:bg-primary-100 dark:hover:bg-primary-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            {collapsible && collapsed && (
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-md text-primary-500 hover:bg-primary-100 dark:hover:bg-primary-800 w-full flex justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Admin Navigation */}
        <nav className="mt-5 px-2 space-y-1">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                isActive(item.href)
                  ? "bg-primary-100 dark:bg-primary-800 text-accent dark:text-accent-light"
                  : "text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800/50 hover:text-primary-900 dark:hover:text-primary-100",
                collapsed ? "justify-center" : ""
              )}
            >
              <span
                className={cn(
                  "flex-shrink-0",
                  isActive(item.href)
                    ? "text-accent dark:text-accent-light"
                    : "text-primary-500 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300"
                )}
              >
                {item.icon}
              </span>
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Collapsible toggle button for mobile */}
        {collapsible && (
          <div className="mt-auto p-4 border-t border-primary-200 dark:border-primary-800 lg:hidden">
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center w-full p-2 rounded-md bg-primary-100 dark:bg-primary-800 text-primary-900 dark:text-primary-100 hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    collapsed
                      ? "M13 5l7 7-7 7M5 5l7 7-7 7"
                      : "M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  }
                />
              </svg>
              {!collapsed && <span>Collapse Sidebar</span>}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Account sidebar variant
  if (variant === "account") {
    return (
      <div
        className={cn(
          "bg-white dark:bg-primary-900 rounded-lg shadow-elegant overflow-hidden",
          className
        )}
      >
        {/* Account Sidebar Header */}
        {showHeader && (
          <div className="p-4 border-b border-primary-200 dark:border-primary-800">
            <h2 className="text-lg font-medium text-primary-900 dark:text-primary-100">
              {title || "My Account"}
            </h2>
          </div>
        )}

        {/* Account Navigation - Desktop */}
        <nav className="hidden md:block p-2">
          <ul className="space-y-1">
            {accountNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                    isActive(item.href)
                      ? "bg-primary-100 dark:bg-primary-800 text-accent dark:text-accent-light font-medium"
                      : "text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800/50 hover:text-primary-900 dark:hover:text-primary-100"
                  )}
                >
                  <span
                    className={cn(
                      "flex-shrink-0 mr-3",
                      isActive(item.href)
                        ? "text-accent dark:text-accent-light"
                        : "text-primary-500 dark:text-primary-400"
                    )}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Account Navigation - Mobile Toggle */}
        <div className="md:hidden p-4">
          <Button
            variant="outline"
            fullWidth
            onClick={toggleMobileMenu}
            className="flex items-center justify-between"
          >
            <span>Account Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "h-5 w-5 transition-transform",
                isMobileMenuOpen ? "transform rotate-180" : ""
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="mt-2 border-t border-primary-200 dark:border-primary-800 pt-2">
              <ul className="space-y-1">
                {accountNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                        isActive(item.href)
                          ? "bg-primary-100 dark:bg-primary-800 text-accent dark:text-accent-light font-medium"
                          : "text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800/50 hover:text-primary-900 dark:hover:text-primary-100"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span
                        className={cn(
                          "flex-shrink-0 mr-3",
                          isActive(item.href)
                            ? "text-accent dark:text-accent-light"
                            : "text-primary-500 dark:text-primary-400"
                        )}
                      >
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Help & Support Section */}
        <div className="p-4 mt-4 border-t border-primary-200 dark:border-primary-800">
          <h3 className="text-sm font-medium text-primary-500 dark:text-primary-400 mb-2">
            Help & Support
          </h3>
          <nav>
            <ul className="space-y-1">
              {helpNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center px-3 py-2 text-sm rounded-md text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800/50 hover:text-primary-900 dark:hover:text-primary-100 transition-colors"
                  >
                    <span className="flex-shrink-0 mr-3 text-primary-500 dark:text-primary-400">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }

  // Default sidebar (categories navigation)
  return (
    <div
      className={cn(
        "bg-white dark:bg-primary-900 rounded-lg shadow-elegant overflow-hidden",
        className
      )}
    >
      {/* Category Sidebar Header */}
      {showHeader && (
        <div className="p-4 border-b border-primary-200 dark:border-primary-800">
          <h2 className="text-lg font-medium text-primary-900 dark:text-primary-100">
            {title || "Categories"}
          </h2>
        </div>
      )}

      {/* Category list */}
      <div className="p-4">
        <CategoryList
          categories={categories}
          isLoading={isLoading}
          error={categoriesError}
          layout="list"
          showSubcategories={true}
        />
      </div>

      {/* Featured Sections or Banners */}
      <div className="p-4 mt-2 border-t border-primary-200 dark:border-primary-800">
        <div className="bg-primary-50 dark:bg-primary-800/30 rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-primary-900 dark:text-primary-100 mb-2">
            Spring Sale
          </h3>
          <p className="text-xs text-primary-600 dark:text-primary-400 mb-2">
            Up to 40% off on selected items
          </p>
          <Button
            size="sm"
            variant="primary"
            onClick={() => router.push("/sale")}
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
