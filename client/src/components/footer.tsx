import { Globe, Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="text-travel-blue text-2xl" />
              <span className="text-xl font-bold">TasteTravel</span>
            </div>
            <p className="text-slate-400 mb-4">
              Discover your perfect cultural journey with AI-powered personalized travel planning.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-travel-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-travel-blue transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-travel-blue transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Discover</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Destinations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cultural Sites</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dining</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Activities</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Plan</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Itinerary Builder</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Travel Assistant</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cultural Insights</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Travel Tips</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 TasteTravel. All rights reserved. Powered by Qloo's Taste AI™</p>
        </div>
      </div>
    </footer>
  );
}
