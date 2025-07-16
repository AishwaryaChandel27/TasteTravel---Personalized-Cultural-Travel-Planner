import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Utensils, 
  Palette, 
  Music, 
  Landmark, 
  Mountain, 
  Drama 
} from "lucide-react";
import type { CulturalDomain, Preference } from "@/types";

const culturalDomains: CulturalDomain[] = [
  {
    id: "culinary",
    name: "Culinary Arts",
    icon: "utensils",
    description: "Discover authentic flavors, local cuisines, and unique dining experiences worldwide",
    tags: ["Sushi", "Street Food", "Fine Dining"],
    color: "text-cultural-gold"
  },
  {
    id: "visual-arts",
    name: "Visual Arts",
    icon: "palette",
    description: "Explore museums, galleries, and artistic landmarks across cultures",
    tags: ["Renaissance", "Modern Art", "Street Art"],
    color: "text-cultural-purple"
  },
  {
    id: "music",
    name: "Music & Performance",
    icon: "music",
    description: "Experience concerts, traditional performances, and musical heritage",
    tags: ["Classical", "Jazz", "Folk"],
    color: "text-adventure-green"
  },
  {
    id: "history",
    name: "History & Architecture",
    icon: "landmark",
    description: "Discover historical sites, architectural marvels, and cultural heritage",
    tags: ["Ancient", "Medieval", "Contemporary"],
    color: "text-accent-red"
  },
  {
    id: "nature",
    name: "Nature & Adventure",
    icon: "mountain",
    description: "Connect with natural landscapes and outdoor cultural experiences",
    tags: ["Hiking", "Sacred Sites", "Wildlife"],
    color: "text-adventure-green"
  },
  {
    id: "traditions",
    name: "Culture & Traditions",
    icon: "drama",
    description: "Immerse yourself in local festivals, traditions, and cultural practices",
    tags: ["Festivals", "Ceremonies", "Crafts"],
    color: "text-cultural-purple"
  }
];

const getIcon = (iconName: string) => {
  const icons = {
    utensils: Utensils,
    palette: Palette,
    music: Music,
    landmark: Landmark,
    mountain: Mountain,
    drama: Drama
  };
  return icons[iconName as keyof typeof icons] || Utensils;
};

export default function PreferencesInput() {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const generateRecommendations = useMutation({
    mutationFn: async (preferences: string[]) => {
      const response = await apiRequest("POST", "/api/recommendations", {
        preferences,
        limit: 10
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["recommendations"], data);
      toast({
        title: "Recommendations Generated!",
        description: "Your personalized cultural journey awaits below.",
      });
      
      // Scroll to recommendations section
      document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleDomainSelect = (domainId: string) => {
    setSelectedDomains(prev => 
      prev.includes(domainId) 
        ? prev.filter(id => id !== domainId)
        : [...prev, domainId]
    );
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleGenerateRecommendations = () => {
    const allPreferences = [...selectedDomains, ...selectedTags];
    if (allPreferences.length === 0) {
      toast({
        title: "Select Preferences",
        description: "Please select at least one cultural domain or tag.",
        variant: "destructive",
      });
      return;
    }
    
    generateRecommendations.mutate(allPreferences);
  };

  return (
    <section id="preferences" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Tell Us About Your Cultural Interests
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Share your preferences across different cultural domains to receive personalized 
            recommendations powered by Qloo's Taste AI™
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturalDomains.map((domain) => {
            const IconComponent = getIcon(domain.icon);
            const isSelected = selectedDomains.includes(domain.id);
            
            return (
              <Card 
                key={domain.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected 
                    ? 'border-2 border-travel-blue bg-blue-50' 
                    : 'border-2 border-transparent hover:border-travel-blue'
                }`}
                onClick={() => handleDomainSelect(domain.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <IconComponent className={`text-2xl mr-3 ${domain.color}`} />
                    <h3 className="text-lg font-semibold text-slate-900">{domain.name}</h3>
                  </div>
                  <p className="text-slate-600 mb-4">{domain.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {domain.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-travel-blue text-white'
                            : 'bg-white text-slate-700 hover:bg-slate-100'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTagSelect(tag);
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={handleGenerateRecommendations}
            disabled={generateRecommendations.isPending}
            size="lg"
            className="bg-travel-blue hover:bg-travel-dark font-semibold"
          >
            {generateRecommendations.isPending 
              ? "Generating Recommendations..." 
              : "Get My Personalized Recommendations"
            }
          </Button>
        </div>
      </div>
    </section>
  );
}
