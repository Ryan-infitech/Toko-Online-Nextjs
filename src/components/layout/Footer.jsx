import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About column */}
          <div>
            <h2 className="text-xl font-bold mb-6">TechMart</h2>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for premium electronics and tech gadgets. We offer the latest products with excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/categories/featured" className="text-gray-300 hover:text-white transition-colors">Featured Items</Link>
              </li>
              <li>
                <Link to="/categories/new-arrivals" className="text-gray-300 hover:text-white transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link to="/categories/deals" className="text-gray-300 hover:text-white transition-colors">Deals & Discounts</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/account/profile" className="text-gray-300 hover:text-white transition-colors">My Account</Link>
              </li>
              <li>
                <Link to="/account/orders" className="text-gray-300 hover:text-white transition-colors">Track Order</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white transition-colors">Returns Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-gray-300" />
                <span className="text-gray-300">123 Tech Street, Digital City, DC 10011</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-gray-300" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-gray-300" />
                <span className="text-gray-300">support@techmart.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} TechMart. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/sitemap" className="text-sm text-gray-400 hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;