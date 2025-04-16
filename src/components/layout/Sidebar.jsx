import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

interface CategoryWithSubcategories {
  id: string;
  name: string;
  href: string;
  subcategories?: Array<{
    id: string;
    name: string;
    href: string;
  }>;
}

const Sidebar = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const categories: CategoryWithSubcategories[] = [
    {
      id: "smartphones",
      name: "Smartphones",
      href: "/categories/smartphones",
      subcategories: [
        { id: "apple", name: "Apple", href: "/categories/smartphones/apple" },
        { id: "samsung", name: "Samsung", href: "/categories/smartphones/samsung" },
        { id: "google", name: "Google", href: "/categories/smartphones/google" },
        { id: "xiaomi", name: "Xiaomi", href: "/categories/smartphones/xiaomi" },
      ],
    },
    {
      id: "laptops",
      name: "Laptops",
      href: "/categories/laptops",
      subcategories: [
        { id: "gaming", name: "Gaming", href: "/categories/laptops/gaming" },
        { id: "business", name: "Business", href: "/categories/laptops/business" },
        { id: "macbooks", name: "MacBooks", href: "/categories/laptops/macbooks" },
        { id: "chromebooks", name: "Chromebooks", href: "/categories/laptops/chromebooks" },
      ],
    },
    {
      id: "audio",
      name: "Audio",
      href: "/categories/audio",
      subcategories: [
        { id: "headphones", name: "Headphones", href: "/categories/audio/headphones" },
        { id: "speakers", name: "Speakers", href: "/categories/audio/speakers" },
        { id: "earbuds", name: "Earbuds", href: "/categories/audio/earbuds" },
        { id: "soundbars", name: "Soundbars", href: "/categories/audio/soundbars" },
      ],
    },
    {
      id: "gaming",
      name: "Gaming",
      href: "/categories/gaming",
      subcategories: [
        { id: "consoles", name: "Consoles", href: "/categories/gaming/consoles" },
        { id: "games", name: "Games", href: "/categories/gaming/games" },
        { id: "accessories", name: "Accessories", href: "/categories/gaming/accessories" },
        { id: "vr", name: "Virtual Reality", href: "/categories/gaming/vr" },
      ],
    },
    {
      id: "accessories",
      name: "Accessories",
      href: "/categories/accessories",
      subcategories: [
        { id: "cases", name: "Cases & Covers", href: "/categories/accessories/cases" },
        { id: "chargers", name: "Chargers & Cables", href: "/categories/accessories/chargers" },
        { id: "screen-protectors", name: "Screen Protectors", href: "/categories/accessories/screen-protectors" },
        { id: "stands", name: "Stands & Holders", href: "/categories/accessories/stands" },
      ],
    },
    {
      id: "tvs",
      name: "TVs & Displays",
      href: "/categories/tvs",
      subcategories: [
        { id: "smart-tvs", name: "Smart TVs", href: "/categories/tvs/smart-tvs" },
        { id: "monitors", name: "Monitors", href: "/categories/tvs/monitors" },
        { id: "projectors", name: "Projectors", href: "/categories/tvs/projectors" },
      ],
    },
    {
      id: "wearables",
      name: "Wearables",
      href: "/categories/wearables",
      subcategories: [
        { id: "smartwatches", name: "Smartwatches", href: "/categories/wearables/smartwatches" },
        { id: "fitness-trackers", name: "Fitness Trackers", href: "/categories/wearables/fitness-trackers" },
        { id: "smart-glasses", name: "Smart Glasses", href: "/categories/wearables/smart-glasses" },
      ],
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul className="space-y-1">
        {categories.map((category) => (
          <li key={category.id} className="border-b border-gray-100 py-1">
            <div className="flex items-center justify-between py-2">
              <Link
                to={category.href}
                className="text-gray-700 hover:text-brand transition-colors"
              >
                {category.name}
              </Link>
              {category.subcategories && category.subcategories.length > 0 && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  {expandedCategories.includes(category.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
            {category.subcategories && expandedCategories.includes(category.id) && (
              <ul className="ml-4 space-y-1 mb-2">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.id}>
                    <Link
                      to={subcategory.href}
                      className="block py-1 text-sm text-gray-600 hover:text-brand transition-colors"
                    >
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Featured Deals</h3>
        <p className="text-xs text-gray-600">Get up to 50% off on selected items this week!</p>
        <Link
          to="/categories/deals"
          className="mt-2 text-xs font-medium text-brand hover:underline"
        >
          View all deals
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
