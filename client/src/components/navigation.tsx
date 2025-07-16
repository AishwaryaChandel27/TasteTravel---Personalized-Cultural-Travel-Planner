import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Globe className="text-travel-blue text-2xl" />
            <span className="text-xl font-bold text-slate-900">TasteTravel</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#discover" className="text-slate-600 hover:text-travel-blue transition-colors">
              Discover
            </a>
            <a href="#preferences" className="text-slate-600 hover:text-travel-blue transition-colors">
              Preferences
            </a>
            <a href="#itinerary" className="text-slate-600 hover:text-travel-blue transition-colors">
              My Itinerary
            </a>
            <Button className="bg-travel-blue hover:bg-travel-dark">
              Get Started
            </Button>
          </div>
          
          <button
            className="md:hidden text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#discover"
              className="block px-3 py-2 text-slate-600 hover:text-travel-blue transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Discover
            </a>
            <a
              href="#preferences"
              className="block px-3 py-2 text-slate-600 hover:text-travel-blue transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Preferences
            </a>
            <a
              href="#itinerary"
              className="block px-3 py-2 text-slate-600 hover:text-travel-blue transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Itinerary
            </a>
            <Button className="w-full mt-2 bg-travel-blue hover:bg-travel-dark">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
