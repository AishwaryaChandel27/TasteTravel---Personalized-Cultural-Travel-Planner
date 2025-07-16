import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Clock, Calendar, Star } from "lucide-react";
import type { Destination, CulturalSite, Restaurant } from "@/types";

interface RecommendationsData {
  destinations: Destination[];
  culturalSites: CulturalSite[];
  restaurants: Restaurant[];
}

export default function Recommendations() {
  const { data: recommendations, isLoading } = useQuery<RecommendationsData>({
    queryKey: ["recommendations"],
    enabled: false, // Only fetch when triggered by preferences
  });

  if (isLoading) {
    return (
      <section id="discover" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Personalized Cultural Journey
            </h2>
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!recommendations) {
    return (
      <section id="discover" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Personalized Cultural Journey
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Select your preferences above to discover personalized cultural experiences
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="discover" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Your Personalized Cultural Journey
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Based on your preferences, we've curated the perfect cultural experiences for you
          </p>
        </div>

        {/* Destination Recommendations */}
        {recommendations.destinations.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <MapPin className="text-travel-blue mr-3" />
              Recommended Destinations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.destinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                  {destination.imageUrl && (
                    <img 
                      src={destination.imageUrl} 
                      alt={destination.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-slate-900">
                        {destination.name}, {destination.country}
                      </h4>
                      {destination.match && (
                        <span className="text-sm text-slate-500">{destination.match}% match</span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm mb-4">{destination.description}</p>
                    
                    {destination.culturalTags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {destination.culturalTags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {destination.bestSeasons && (
                      <div className="flex items-center text-sm text-slate-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Best: {destination.bestSeasons.join(', ')}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Cultural Sites */}
        {recommendations.culturalSites.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <MapPin className="text-cultural-purple mr-3" />
              Must-Visit Cultural Sites
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.culturalSites.map((site) => (
                <Card key={site.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {site.imageUrl && (
                        <img 
                          src={site.imageUrl} 
                          alt={site.name}
                          className="w-24 h-18 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-2">{site.name}</h4>
                        <p className="text-sm text-slate-600 mb-3">{site.description}</p>
                        <div className="flex items-center text-xs text-slate-500">
                          <Badge variant="outline" className="mr-2">{site.category}</Badge>
                          {site.duration && (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{site.duration}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Dining Recommendations */}
        {recommendations.restaurants.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <MapPin className="text-cultural-gold mr-3" />
              Culinary Experiences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.restaurants.map((restaurant) => (
                <Card key={restaurant.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  {restaurant.imageUrl && (
                    <img 
                      src={restaurant.imageUrl} 
                      alt={restaurant.name}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-slate-900 mb-1">{restaurant.name}</h4>
                    <p className="text-sm text-slate-600 mb-2">{restaurant.description}</p>
                    <Badge variant="outline" className="mb-2">{restaurant.cuisine}</Badge>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-cultural-gold">
                        {restaurant.priceRange}
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-cultural-gold mr-1" />
                        <span className="text-sm">{restaurant.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
