import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  const categories = [
    { name: "Smartphones", href: "/categories/smartphones" },
    { name: "Laptops", href: "/categories/laptops" },
    { name: "Audio", href: "/categories/audio" },
    { name: "Gaming", href: "/categories/gaming" },
    { name: "Accessories", href: "/categories/accessories" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Top row with logo, search, and icons */}
        <div className="flex items-center justify-between">
          {/* Left - Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-brand">TechMart</span>
          </Link>

          {/* Middle - Search on large screens */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="pr-10 w-full"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right - Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="hidden sm:flex items-center">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/account" className="hidden sm:flex items-center">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-brand text-white">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Second row - Categories Navigation */}
        <nav className="hidden md:flex mt-4">
          <ul className="flex space-x-8">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  to={category.href}
                  className="text-sm font-medium hover:text-brand transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
            {/* Mobile search */}
            <div className="pt-4 pb-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pr-10 w-full"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Mobile navigation */}
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="text-sm font-medium hover:text-brand transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                to="/account"
                className="text-sm font-medium hover:text-brand transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
              <Link
                to="/wishlist"
                className="text-sm font-medium hover:text-brand transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;