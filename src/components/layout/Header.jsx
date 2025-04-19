import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { cn } from "@/utils/classnames";
import SearchBar from "@/components/form/SearchBar";
import { Button } from "@/components/ui/Button";

const mainNavigationItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Deals", href: "/deals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = ({ variant = "default", className }) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Check scroll position to apply shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check authentication status (this would use your auth provider in a real app)
  useEffect(() => {
    const checkAuth = () => {
      // This is a placeholder - replace with actual auth check
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    // Listen for authentication changes
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Check cart items (this would use your cart state provider in a real app)
  useEffect(() => {
    const getCartItems = () => {
      // This is a placeholder - replace with actual cart check
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        try {
          const cart = JSON.parse(cartData);
          setCartItemsCount(cart.items?.length || 0);
        } catch (e) {
          console.error("Failed to parse cart data", e);
          setCartItemsCount(0);
        }
      }
    };

    getCartItems();

    // Listen for cart changes
    window.addEventListener("storage", getCartItems);
    return () => window.removeEventListener("storage", getCartItems);
  }, []);

  // Toggle mobile menu and prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Admin header variant
  if (variant === "admin") {
    return (
      <header
        className={cn(
          "bg-white dark:bg-primary-900 border-b border-primary-200 dark:border-primary-800 shadow-sm",
          className
        )}
      >
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="p-2 rounded-md hover:bg-primary-100 dark:hover:bg-primary-800 mr-2 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6 text-primary-500 dark:text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Link href="/admin/dashboard" className="flex items-center">
              <span className="text-xl font-semibold text-primary-900 dark:text-primary-100">
                Admin Dashboard
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <svg
                  className="h-6 w-6 text-primary-500 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-primary-900 rounded-md shadow-lg py-1 z-20 border border-primary-200 dark:border-primary-700">
                  <Link
                    href="/admin/profile"
                    className="block px-4 py-2 text-sm text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="block px-4 py-2 text-sm text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800"
                  >
                    Settings
                  </Link>
                  <div className="border-t border-primary-200 dark:border-primary-700"></div>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800"
                    onClick={() => {
                      // Handle logout
                      localStorage.removeItem("authToken");
                      sessionStorage.removeItem("authToken");
                      router.push("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Simple header variant (for checkout, etc.)
  if (variant === "simple") {
    return (
      <header
        className={cn(
          "bg-white dark:bg-primary-900 py-4",
          isScrolled && "shadow-navbar",
          className
        )}
      >
        <div className="container mx-auto px-4 flex justify-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </header>
    );
  }

  // Default header variant
  return (
    <header
      className={cn(
        "bg-white dark:bg-primary-900 sticky top-0 z-20 transition-shadow duration-300",
        isScrolled && "shadow-navbar",
        className
      )}
      style={{ "--header-height": "5rem" }}
    >
      {/* Top bar - announcements, language selector, etc. */}
      <div className="bg-primary-900 dark:bg-primary-800 text-white py-2 text-sm text-center">
        <div className="container mx-auto px-4">
          Free shipping on all orders over $50
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {mainNavigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-primary-700 dark:text-primary-300 hover:text-accent dark:hover:text-accent-light transition-colors duration-200",
                  router.pathname === item.href &&
                    "text-accent dark:text-accent-light font-medium"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search, User Menu & Cart */}
          <div className="flex items-center space-x-4">
            {/* Search - hidden on mobile */}
            <div className="hidden md:block">
              <SearchBar variant="compact" />
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <svg
                  className="h-6 w-6 text-primary-500 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-primary-900 rounded-md shadow-lg py-1 z-20 border border-primary-200 dark:border-primary-700">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800"
                      >
                        My Account
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800"
                      >
                        Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        className="block px-4 py-2 text-sm text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800"
                      >
                        Wishlist
                      </Link>
                      <div className="border-t border-primary-200 dark:border-primary-700"></div>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800"
                        onClick={() => {
                          // Handle logout
                          localStorage.removeItem("authToken");
                          sessionStorage.removeItem("authToken");
                          setIsUserMenuOpen(false);
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-sm text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 text-sm text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <Link
                href="/cart"
                className="p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 inline-block"
              >
                <div className="relative">
                  <svg
                    className="h-6 w-6 text-primary-500 dark:text-primary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6 text-primary-500 dark:text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white dark:bg-primary-900 z-20 lg:hidden transition-transform duration-300 transform",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-4 flex items-center justify-between border-b border-primary-200 dark:border-primary-700">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src="/logo.svg"
                alt="Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <button
              className="p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="h-6 w-6 text-primary-500 dark:text-primary-400"
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
          </div>

          <div className="p-4">
            <SearchBar variant="fullWidth" />
          </div>

          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <ul className="space-y-4">
              {mainNavigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-2 text-lg",
                      router.pathname === item.href
                        ? "text-accent dark:text-accent-light font-medium"
                        : "text-primary-700 dark:text-primary-300"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-primary-200 dark:border-primary-700">
              <div className="space-y-4">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/account"
                      className="block py-2 text-primary-700 dark:text-primary-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      href="/orders"
                      className="block py-2 text-primary-700 dark:text-primary-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block py-2 text-primary-700 dark:text-primary-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Wishlist
                    </Link>
                    <button
                      className="block w-full text-left py-2 text-primary-700 dark:text-primary-300"
                      onClick={() => {
                        // Handle logout
                        localStorage.removeItem("authToken");
                        sessionStorage.removeItem("authToken");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        router.push("/login");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        router.push("/register");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
