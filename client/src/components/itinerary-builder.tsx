import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { GripVertical, Clock, MapPin, X, Plus } from "lucide-react";
import type { ItineraryItem } from "@/types";

interface AvailableExperience {
  id: string;
  name: string;
  description: string;
  duration: string;
  location: string;
  imageUrl?: string;
  type: 'destination' | 'cultural_site' | 'restaurant' | 'activity';
}

const availableExperiences: AvailableExperience[] = [
  {
    id: "eiffel-tower",
    name: "Eiffel Tower & Seine River Cruise",
    description: "Experience Paris's iconic landmark followed by a romantic river cruise",
    duration: "3 hours",
    location: "Paris, France",
    imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f",
    type: "destination"
  },
  {
    id: "vatican-museums",
    name: "Vatican Museums & Sistine Chapel",
    description: "Private tour of the world's most important art collection including Michelangelo's masterpieces",
    duration: "4 hours",
    location: "Vatican City",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    type: "cultural_site"
  },
  {
    id: "tea-ceremony",
    name: "Traditional Tea Ceremony Experience",
    description: "Learn the ancient art of Japanese tea ceremony in a traditional setting",
    duration: "2 hours",
    location: "Kyoto, Japan",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
    type: "activity"
  }
];

export default function ItineraryBuilder() {
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<AvailableExperience | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const saveItinerary = useMutation({
    mutationFn: async (items: ItineraryItem[]) => {
      const response = await apiRequest("POST", "/api/itinerary", {
        userId: 1, // Mock user ID
        name: "My Cultural Journey",
        items: items.map(item => ({
          id: item.id,
          type: item.type,
          itemId: item.itemId,
          day: item.day,
          timeOfDay: item.timeOfDay,
          duration: item.duration
        }))
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Itinerary Saved!",
        description: "Your cultural journey has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["itinerary"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save itinerary. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleDragStart = (e: React.DragEvent, experience: AvailableExperience) => {
    setDraggedItem(experience);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      const newItem: ItineraryItem = {
        id: `${draggedItem.id}-${Date.now()}`,
        type: draggedItem.type,
        itemId: parseInt(draggedItem.id.split('-')[0]) || 1,
        day: Math.floor(itineraryItems.length / 3) + 1,
        timeOfDay: ['morning', 'afternoon', 'evening'][itineraryItems.length % 3] as 'morning' | 'afternoon' | 'evening',
        duration: draggedItem.duration,
        name: draggedItem.name,
        description: draggedItem.description,
        imageUrl: draggedItem.imageUrl
      };
      
      setItineraryItems(prev => [...prev, newItem]);
      setDraggedItem(null);
    }
  };

  const removeFromItinerary = (id: string) => {
    setItineraryItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveItinerary = () => {
    if (itineraryItems.length === 0) {
      toast({
        title: "Empty Itinerary",
        description: "Please add some experiences to your itinerary first.",
        variant: "destructive",
      });
      return;
    }
    
    saveItinerary.mutate(itineraryItems);
  };

  const getTimeOfDayColor = (timeOfDay: string) => {
    const colors = {
      morning: 'border-travel-blue',
      afternoon: 'border-adventure-green',
      evening: 'border-cultural-purple'
    };
    return colors[timeOfDay as keyof typeof colors] || 'border-slate-300';
  };

  const getTimeOfDayLabel = (timeOfDay: string) => {
    const labels = {
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening'
    };
    return labels[timeOfDay as keyof typeof labels] || timeOfDay;
  };

  return (
    <section id="itinerary" className="py-16 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Build Your Perfect Itinerary
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Drag and drop experiences to create your personalized cultural journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Experiences */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Available Experiences</h3>
            <div className="space-y-4">
              {availableExperiences.map((experience) => (
                <Card 
                  key={experience.id}
                  className="cursor-move hover:shadow-md transition-shadow"
                  draggable
                  onDragStart={(e) => handleDragStart(e, experience)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {experience.imageUrl && (
                        <img 
                          src={experience.imageUrl} 
                          alt={experience.name}
                          className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">{experience.name}</h4>
                        <p className="text-sm text-slate-600 mb-2">{experience.description}</p>
                        <div className="flex items-center text-xs text-slate-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{experience.duration}</span>
                          <span className="mx-2">•</span>
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                      <GripVertical className="text-slate-400 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Itinerary Timeline */}
          <div>
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Your Itinerary</h3>
                
                <div 
                  className="space-y-4 min-h-96"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {itineraryItems.length === 0 ? (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center text-slate-500">
                      <Plus className="w-8 h-8 mx-auto mb-2" />
                      <p>Drag experiences here to build your itinerary</p>
                    </div>
                  ) : (
                    itineraryItems.map((item) => (
                      <div 
                        key={item.id}
                        className={`border-l-4 ${getTimeOfDayColor(item.timeOfDay)} pl-4 pb-4`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            Day {item.day} - {getTimeOfDayLabel(item.timeOfDay)}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromItinerary(item.id)}
                            className="h-6 w-6 p-0 text-slate-400 hover:text-accent-red"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-1">{item.name}</h4>
                        <div className="flex items-center text-xs text-slate-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <Button 
                    onClick={handleSaveItinerary}
                    disabled={saveItinerary.isPending}
                    className="w-full bg-travel-blue hover:bg-travel-dark"
                  >
                    {saveItinerary.isPending ? "Saving..." : "Save Itinerary"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
