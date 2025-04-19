import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/classnames";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

// Footer links configuration
const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "New Arrivals", href: "/products/new-arrivals" },
    { label: "Featured", href: "/products/featured" },
    { label: "Bestsellers", href: "/products/bestsellers" },
    { label: "Discounted", href: "/products/discounted" },
  ],
  categories: [
    { label: "Electronics", href: "/category/electronics" },
    { label: "Clothing", href: "/category/clothing" },
    { label: "Home & Kitchen", href: "/category/home-kitchen" },
    { label: "Beauty", href: "/category/beauty" },
    { label: "Sports", href: "/category/sports" },
  ],
  customer: [
    { label: "My Account", href: "/account" },
    { label: "Orders", href: "/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Track Order", href: "/track-order" },
    { label: "Returns", href: "/returns" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
};

// Social media links
const socialLinks = [
  { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { name: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { name: "Pinterest", href: "https://pinterest.com", icon: "pinterest" },
];

// Social icons
const SocialIcon = ({ icon }) => {
  switch (icon) {
    case "facebook":
      return (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "twitter":
      return (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "pinterest":
      return (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
        </svg>
      );
    default:
      return null;
  }
};

const Footer = ({ variant = "default", className }) => {
  const [email, setEmail] = useState("");
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubscribeError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubscribeError(null);

    try {
      // This would be an API call in a real application
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email }),
      // });

      // if (!response.ok) throw new Error('Subscription failed');

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubscribeSuccess(true);
      setEmail("");

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubscribeSuccess(false);
      }, 5000);
    } catch (error) {
      setSubscribeError(
        error.message || "Failed to subscribe. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simple footer for checkout, etc.
  if (variant === "simple") {
    return (
      <footer
        className={cn(
          "bg-white dark:bg-primary-900 border-t border-primary-200 dark:border-primary-800",
          className
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={120}
                height={40}
                className="h-8 w-auto mb-4"
              />
            </Link>
            <div className="flex space-x-4 mb-4">
              {["Terms", "Privacy", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-200"
                >
                  {item}
                </Link>
              ))}
            </div>
            <p className="text-sm text-primary-500 dark:text-primary-400">
              &copy; {new Date().getFullYear()} E-Commerce Store. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  // Compact footer
  if (variant === "compact") {
    return (
      <footer
        className={cn(
          "bg-white dark:bg-primary-900 border-t border-primary-200 dark:border-primary-800",
          className
        )}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-primary-900 dark:text-primary-100 mb-3">
                Shop
              </h3>
              <ul className="space-y-2">
                {footerLinks.shop.slice(0, 4).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-primary-900 dark:text-primary-100 mb-3">
                Customer
              </h3>
              <ul className="space-y-2">
                {footerLinks.customer.slice(0, 4).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-primary-900 dark:text-primary-100 mb-3">
                Company
              </h3>
              <ul className="space-y-2">
                {footerLinks.company.slice(0, 4).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-primary-900 dark:text-primary-100 mb-3">
                Connect
              </h3>
              <div className="flex space-x-4">
                {socialLinks.slice(0, 4).map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-primary-200 dark:border-primary-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-primary-500 dark:text-primary-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} E-Commerce Store. All rights
              reserved.
            </p>
            <div className="flex space-x-4">
              {["Terms", "Privacy", "Cookies"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Default full footer
  return (
    <footer className={cn("bg-primary-900 text-white", className)}>
      {/* Newsletter section */}
      <div className="bg-accent">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-2">Join Our Newsletter</h2>
            <p className="text-white/90 mb-6">
              Get the latest updates, news, and special offers directly to your
              inbox.
            </p>

            {subscribeSuccess ? (
              <Alert
                variant="success"
                className="bg-white/10 border-white/20 text-white"
              >
                Thanks for subscribing! You'll receive our next newsletter.
              </Alert>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubscribeError(null);
                  }}
                  error={subscribeError}
                  className="bg-white/10 border-white/20 text-white placeholder-white/60 flex-1"
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="secondary"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  className="whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link href="/">
              <Image
                src="/logo-white.svg"
                alt="Logo"
                width={150}
                height={40}
                className="h-10 w-auto mb-4"
              />
            </Link>
            <p className="text-primary-300 mb-6 lg:max-w-sm">
              We provide top-quality products for your everyday needs. Shop with
              us for the best selection, prices, and customer service.
            </p>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-primary-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <SocialIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Customer Service</h3>
            <ul className="space-y-3">
              {footerLinks.customer.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact information */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Contact Us</h3>
              <ul className="space-y-3 text-primary-300">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 mt-0.5 text-primary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                  <span>123 Commerce St, City, Country</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 mt-0.5 text-primary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>support@example.com</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 mt-0.5 text-primary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with copyright and payment methods */}
      <div className="border-t border-primary-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} E-Commerce Store. All rights
              reserved.
            </p>

            <div className="flex space-x-6">
              <Link
                href="/terms"
                className="text-primary-400 hover:text-white text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-primary-400 hover:text-white text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                className="text-primary-400 hover:text-white text-sm"
              >
                Cookie Policy
              </Link>
            </div>

            {/* Payment methods */}
            <div className="flex space-x-3 mt-4 md:mt-0">
              {["visa", "mastercard", "amex", "paypal"].map((method) => (
                <div
                  key={method}
                  className="w-10 h-6 bg-primary-800 rounded opacity-80"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
