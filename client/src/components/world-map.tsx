import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { WorldRegion } from "@/types";

export default function WorldMap() {
  const [selectedRegion, setSelectedRegion] = useState<WorldRegion | null>(null);

  const { data: regions, isLoading } = useQuery<WorldRegion[]>({
    queryKey: ["/api/regions"],
  });

  const handleRegionClick = (region: WorldRegion) => {
    setSelectedRegion(region);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Explore Destinations Worldwide
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Click on any region to discover personalized cultural experiences based on your preferences
            </p>
          </div>
          <Skeleton className="w-full h-96 rounded-xl" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Explore Destinations Worldwide
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Click on any region to discover personalized cultural experiences based on your preferences
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="relative">
            <img 
              src="https://github.com/AishwaryaChandel27/TasteTravel---Personalized-Cultural-Travel-Planner/blob/main/attached_assets/download%20(1).jpg" 
              alt="Interactive world map" 
              className="w-full h-96 object-cover"
            />
            
            {/* Interactive hotspots */}
            {regions?.map((region, index) => {
              const positions = [
                { top: '25%', left: '25%' }, // Europe
                { top: '33%', left: '50%' }, // Asia
                { top: '50%', left: '16%' }, // Africa
                { top: '33%', left: '12%' }, // Americas
                { bottom: '25%', right: '25%' } // Oceania
              ];

              const colors = [
                'bg-travel-blue',
                'bg-adventure-green',
                'bg-cultural-gold',
                'bg-accent-red',
                'bg-cultural-purple'
              ];

              return (
                <div
                  key={region.name}
                  className={`absolute w-4 h-4 ${colors[index]} rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform`}
                  style={positions[index]}
                  onClick={() => handleRegionClick(region)}
                  title={region.name}
                />
              );
            })}
          </div>

          {/* Region details panel */}
          {selectedRegion && (
            <CardContent className="p-6 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Selected Region: {selectedRegion.name}
              </h3>
              <p className="text-slate-600 mb-4">{selectedRegion.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">Top Destinations</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {selectedRegion.topDestinations.map((dest) => (
                      <li key={dest}>• {dest}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">Cultural Highlights</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {selectedRegion.culturalHighlights.map((highlight) => (
                      <li key={highlight}>• {highlight}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">Best Travel Season</h4>
                  <p className="text-sm text-slate-600">{selectedRegion.bestSeason}</p>
                </div>
              </div>
            </CardContent>
          )}

          {!selectedRegion && (
            <CardContent className="p-6 border-t border-slate-200">
              <div className="text-center text-slate-500">
                <p>Click on any region marker to explore destinations and cultural highlights</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  );
}
