import { Camera, Handshake, MapPin, Church, Wine, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { CulturalInsight } from "@/types";

const culturalInsights: CulturalInsight[] = [
  {
    title: "Japanese Etiquette",
    description: "Bowing is a traditional greeting in Japan. A slight bow (15°) is appropriate for casual interactions, while deeper bows show greater respect.",
    location: "Japan",
    icon: "handshake"
  },
  {
    title: "Italian Dining",
    description: "In Italy, cappuccino is traditionally only consumed at breakfast. Ordering it after a meal is considered unusual by locals.",
    location: "Italy",
    icon: "wine"
  },
  {
    title: "French Greetings",
    description: "Always greet shopkeepers with \"Bonjour\" when entering stores in France. It's considered polite and is deeply ingrained in French culture.",
    location: "France",
    icon: "handshake"
  },
  {
    title: "Temple Visits",
    description: "When visiting temples and mosques, dress modestly covering shoulders and knees. Remove shoes before entering sacred spaces.",
    location: "Global",
    icon: "mosque"
  },
  {
    title: "Tipping Culture",
    description: "Tipping varies globally: 15-20% in the US, round up in Germany, service charge included in Japan, and 10% in the UK.",
    location: "Various",
    icon: "utensils"
  },
  {
    title: "Photography Etiquette",
    description: "Always ask permission before photographing people, especially in traditional or religious settings. Some museums prohibit flash photography.",
    location: "Global",
    icon: "camera"
  }
];

const getIcon = (iconName: string) => {
  const icons = {
    handshake: Handshake,
    wine: Wine,
    mosque: Church,
    utensils: Utensils,
    camera: Camera
  };
  return icons[iconName as keyof typeof icons] || Handshake;
};

export default function CulturalInsights() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Cultural Insights & Travel Tips
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Learn about local customs, etiquette, and cultural context for your destinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {culturalInsights.map((insight) => {
            const IconComponent = getIcon(insight.icon);

            return (
              <Card 
                key={insight.title}
                className="bg-white shadow-md hover:shadow-lg transition-all border border-gray-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <IconComponent className="text-black text-2xl mr-3" />
                    <h3 className="text-lg font-semibold text-black">{insight.title}</h3>
                  </div>
                  <p className="text-gray-800 mb-4">{insight.description}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{insight.location}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
