import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import PreferencesInput from "@/components/preferences-input";
import WorldMap from "@/components/world-map";
import Recommendations from "@/components/recommendations";
import ItineraryBuilder from "@/components/itinerary-builder";
import ChatAssistant from "@/components/chat-assistant";
import CulturalInsights from "@/components/cultural-insights";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <HeroSection />
      <PreferencesInput />
      <WorldMap />
      <Recommendations />
      <ItineraryBuilder />
      <ChatAssistant />
      <CulturalInsights />
      <Footer />
    </div>
  );
}
