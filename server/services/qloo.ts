// Mock implementation of Qloo's Taste AI™ API
// In a real implementation, this would connect to Qloo's actual API

export interface QlooRecommendation {
  id: string;
  name: string;
  type: 'destination' | 'cultural_site' | 'restaurant' | 'activity';
  score: number;
  categories: string[];
  location?: {
    city: string;
    country: string;
    coordinates: { lat: number; lng: number };
  };
  description: string;
  imageUrl?: string;
  metadata?: Record<string, any>;
}

export interface QlooPreferenceProfile {
  userId: string;
  culturalDomains: string[];
  preferences: {
    culinary: string[];
    visual_arts: string[];
    music: string[];
    history: string[];
    nature: string[];
    traditions: string[];
  };
}

export class QlooService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.QLOO_API_KEY || process.env.QLOO_API_KEY_ENV_VAR || "default_key";
  }

  async getRecommendations(preferences: string[], limit: number = 10): Promise<QlooRecommendation[]> {
    // Mock implementation - in real app, this would call Qloo's API
    // Comprehensive worldwide recommendations based on preferences
    
    const mockRecommendations: QlooRecommendation[] = [
      // Asia
      {
        id: "kyoto-japan",
        name: "Kyoto, Japan",
        type: "destination",
        score: 0.96,
        categories: ["temples", "gardens", "traditional arts", "zen", "history"],
        location: {
          city: "Kyoto",
          country: "Japan",
          coordinates: { lat: 35.0116, lng: 135.7681 }
        },
        description: "Ancient capital known for traditional temples, gardens, and geisha culture",
        imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
        metadata: { bestSeasons: ["spring", "autumn"], duration: "4-7 days" }
      },
      {
        id: "angkor-cambodia",
        name: "Angkor Wat, Cambodia",
        type: "destination",
        score: 0.95,
        categories: ["temples", "ancient history", "khmer culture", "archaeology", "unesco"],
        location: {
          city: "Siem Reap",
          country: "Cambodia",
          coordinates: { lat: 13.4125, lng: 103.8667 }
        },
        description: "World's largest religious monument complex with stunning Khmer architecture",
        imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d90516",
        metadata: { bestSeasons: ["dry season"], duration: "3-5 days" }
      },
      {
        id: "mumbai-india",
        name: "Mumbai, India",
        type: "destination",
        score: 0.88,
        categories: ["bollywood", "street food", "colonial architecture", "festivals", "diversity"],
        location: {
          city: "Mumbai",
          country: "India",
          coordinates: { lat: 19.0760, lng: 72.8777 }
        },
        description: "Bollywood capital with vibrant street culture and diverse cuisine",
        imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
        metadata: { bestSeasons: ["winter"], duration: "3-4 days" }
      },
      {
        id: "bangkok-thailand",
        name: "Bangkok, Thailand",
        type: "destination",
        score: 0.89,
        categories: ["temples", "street food", "markets", "thai culture", "buddhism"],
        location: {
          city: "Bangkok",
          country: "Thailand",
          coordinates: { lat: 13.7563, lng: 100.5018 }
        },
        description: "Vibrant city blending traditional temples with modern urban culture",
        imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365",
        metadata: { bestSeasons: ["cool season"], duration: "3-5 days" }
      },
      // Europe
      {
        id: "florence-italy",
        name: "Florence, Italy",
        type: "destination",
        score: 0.94,
        categories: ["renaissance", "art", "museums", "architecture", "cuisine"],
        location: {
          city: "Florence",
          country: "Italy",
          coordinates: { lat: 43.7696, lng: 11.2558 }
        },
        description: "Renaissance art capital with world-class museums and architecture",
        imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
        metadata: { bestSeasons: ["spring", "autumn"], duration: "3-5 days" }
      },
      {
        id: "istanbul-turkey",
        name: "Istanbul, Turkey",
        type: "destination",
        score: 0.92,
        categories: ["ottoman", "byzantine", "mosques", "bazaars", "crossroads"],
        location: {
          city: "Istanbul",
          country: "Turkey",
          coordinates: { lat: 41.0082, lng: 28.9784 }
        },
        description: "Historic city bridging Europe and Asia with rich Byzantine and Ottoman heritage",
        imageUrl: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b",
        metadata: { bestSeasons: ["spring", "autumn"], duration: "4-6 days" }
      },
      {
        id: "prague-czech",
        name: "Prague, Czech Republic",
        type: "destination",
        score: 0.90,
        categories: ["medieval", "gothic", "baroque", "castles", "classical music"],
        location: {
          city: "Prague",
          country: "Czech Republic",
          coordinates: { lat: 49.7437, lng: 15.3386 }
        },
        description: "Fairy-tale medieval city with stunning Gothic and Baroque architecture",
        imageUrl: "https://images.unsplash.com/photo-1541849546-216549ae216d",
        metadata: { bestSeasons: ["spring", "autumn"], duration: "3-4 days" }
      },
      {
        id: "santorini-greece",
        name: "Santorini, Greece",
        type: "destination",
        score: 0.87,
        categories: ["greek culture", "ancient history", "architecture", "mediterranean", "islands"],
        location: {
          city: "Santorini",
          country: "Greece",
          coordinates: { lat: 36.3932, lng: 25.4615 }
        },
        description: "Iconic Greek island with stunning sunsets and ancient history",
        imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
        metadata: { bestSeasons: ["spring", "early autumn"], duration: "3-5 days" }
      },
      // Africa
      {
        id: "marrakech-morocco",
        name: "Marrakech, Morocco",
        type: "destination",
        score: 0.91,
        categories: ["berber culture", "souks", "islamic architecture", "crafts", "desert"],
        location: {
          city: "Marrakech",
          country: "Morocco",
          coordinates: { lat: 31.6295, lng: -7.9811 }
        },
        description: "Imperial city with vibrant souks and rich Berber culture",
        imageUrl: "https://images.unsplash.com/photo-1489749798305-4fea3ae436d0",
        metadata: { bestSeasons: ["spring", "autumn"], duration: "3-4 days" }
      },
      {
        id: "cairo-egypt",
        name: "Cairo, Egypt",
        type: "destination",
        score: 0.93,
        categories: ["ancient egypt", "pyramids", "pharaohs", "archaeology", "islamic cairo"],
        location: {
          city: "Cairo",
          country: "Egypt",
          coordinates: { lat: 30.0444, lng: 31.2357 }
        },
        description: "Ancient city home to the pyramids and incredible pharaonic heritage",
        imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d90516",
        metadata: { bestSeasons: ["winter"], duration: "4-5 days" }
      },
      {
        id: "capetown-south-africa",
        name: "Cape Town, South Africa",
        type: "destination",
        score: 0.86,
        categories: ["diverse cultures", "wine", "coastal", "rainbow nation", "nature"],
        location: {
          city: "Cape Town",
          country: "South Africa",
          coordinates: { lat: -33.9249, lng: 18.4241 }
        },
        description: "Stunning coastal city with diverse cultures and wine regions",
        imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99",
        metadata: { bestSeasons: ["summer"], duration: "4-6 days" }
      },
      // Americas
      {
        id: "cusco-peru",
        name: "Cusco, Peru",
        type: "destination",
        score: 0.91,
        categories: ["ancient history", "indigenous culture", "adventure", "archaeology"],
        location: {
          city: "Cusco",
          country: "Peru",
          coordinates: { lat: -13.5319, lng: -71.9675 }
        },
        description: "Ancient Incan capital with rich indigenous culture and archaeological wonders",
        imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1",
        metadata: { bestSeasons: ["dry season"], duration: "5-8 days" }
      },
      {
        id: "mexico-city-mexico",
        name: "Mexico City, Mexico",
        type: "destination",
        score: 0.89,
        categories: ["aztec", "colonial", "murals", "cuisine", "dia de los muertos"],
        location: {
          city: "Mexico City",
          country: "Mexico",
          coordinates: { lat: 19.4326, lng: -99.1332 }
        },
        description: "Vibrant capital with ancient Aztec heritage and modern art scene",
        imageUrl: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a",
        metadata: { bestSeasons: ["dry season"], duration: "4-5 days" }
      },
      {
        id: "new-york-usa",
        name: "New York, USA",
        type: "destination",
        score: 0.88,
        categories: ["museums", "broadway", "diversity", "modern art", "urban culture"],
        location: {
          city: "New York",
          country: "United States",
          coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        description: "Cultural melting pot with world-class museums and Broadway",
        imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
        metadata: { bestSeasons: ["spring", "autumn"], duration: "4-7 days" }
      },
      {
        id: "buenos-aires-argentina",
        name: "Buenos Aires, Argentina",
        type: "destination",
        score: 0.85,
        categories: ["tango", "european influence", "steakhouse", "literature", "soccer"],
        location: {
          city: "Buenos Aires",
          country: "Argentina",
          coordinates: { lat: -34.6037, lng: -58.3816 }
        },
        description: "Passionate city known for tango and vibrant cultural scene",
        imageUrl: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849",
        metadata: { bestSeasons: ["spring", "autumn"], duration: "3-5 days" }
      },
      // Oceania
      {
        id: "sydney-australia",
        name: "Sydney, Australia",
        type: "destination",
        score: 0.84,
        categories: ["indigenous culture", "harbor", "beaches", "modern architecture", "multiculturalism"],
        location: {
          city: "Sydney",
          country: "Australia",
          coordinates: { lat: -33.8688, lng: 151.2093 }
        },
        description: "Iconic harbor city with indigenous culture and modern architecture",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        metadata: { bestSeasons: ["spring", "autumn"], duration: "3-5 days" }
      },
      {
        id: "auckland-new-zealand",
        name: "Auckland, New Zealand",
        type: "destination",
        score: 0.83,
        categories: ["maori culture", "polynesian", "nature", "adventure", "volcanoes"],
        location: {
          city: "Auckland",
          country: "New Zealand",
          coordinates: { lat: -36.8485, lng: 174.7633 }
        },
        description: "Polynesian cultural hub with stunning natural landscapes",
        imageUrl: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad",
        metadata: { bestSeasons: ["summer"], duration: "3-4 days" }
      }
    ];

    // Filter recommendations based on preferences
    const filteredRecommendations = mockRecommendations.filter(rec => 
      rec.categories.some(cat => preferences.some(pref => 
        cat.toLowerCase().includes(pref.toLowerCase()) || 
        pref.toLowerCase().includes(cat.toLowerCase())
      ))
    );

    return filteredRecommendations.slice(0, limit);
  }

  async getCulturalSiteRecommendations(preferences: string[], destinationId?: string): Promise<QlooRecommendation[]> {
    const mockSites: QlooRecommendation[] = [
      {
        id: "fushimi-inari",
        name: "Fushimi Inari Shrine",
        type: "cultural_site",
        score: 0.95,
        categories: ["shrine", "torii gates", "hiking", "spiritual"],
        location: {
          city: "Kyoto",
          country: "Japan",
          coordinates: { lat: 34.9671, lng: 135.7727 }
        },
        description: "Famous for thousands of vermillion torii gates creating tunnels up the mountainside",
        imageUrl: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36",
        metadata: { duration: "2-4 hours", category: "Temple" }
      },
      {
        id: "uffizi-gallery",
        name: "Uffizi Gallery",
        type: "cultural_site",
        score: 0.93,
        categories: ["renaissance", "art", "botticelli", "da vinci"],
        location: {
          city: "Florence",
          country: "Italy",
          coordinates: { lat: 43.7678, lng: 11.2559 }
        },
        description: "World-renowned art museum housing masterpieces from the Renaissance",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
        metadata: { duration: "3-4 hours", category: "Museum" }
      }
    ];

    return mockSites.filter(site => 
      site.categories.some(cat => preferences.some(pref => 
        cat.toLowerCase().includes(pref.toLowerCase())
      ))
    );
  }

  async getRestaurantRecommendations(preferences: string[], destinationId?: string): Promise<QlooRecommendation[]> {
    const mockRestaurants: QlooRecommendation[] = [
      {
        id: "kikunoi-kyoto",
        name: "Kikunoi",
        type: "restaurant",
        score: 0.97,
        categories: ["kaiseki", "traditional", "michelin", "japanese"],
        location: {
          city: "Kyoto",
          country: "Japan",
          coordinates: { lat: 35.0116, lng: 135.7681 }
        },
        description: "Three-Michelin-starred kaiseki restaurant preserving traditional Japanese cuisine",
        imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
        metadata: { priceRange: "$$$$", rating: 5, cuisine: "Japanese" }
      },
      {
        id: "trattoria-mario",
        name: "Trattoria Mario",
        type: "restaurant",
        score: 0.89,
        categories: ["tuscan", "traditional", "family-run", "authentic"],
        location: {
          city: "Florence",
          country: "Italy",
          coordinates: { lat: 43.7696, lng: 11.2558 }
        },
        description: "Authentic Tuscan cuisine in a historic family-run restaurant",
        imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
        metadata: { priceRange: "$$$", rating: 4, cuisine: "Italian" }
      }
    ];

    return mockRestaurants.filter(restaurant => 
      restaurant.categories.some(cat => preferences.some(pref => 
        cat.toLowerCase().includes(pref.toLowerCase())
      ))
    );
  }

  async analyzeUserPreferences(preferences: string[]): Promise<QlooPreferenceProfile> {
    // Mock preference analysis
    return {
      userId: "user_123",
      culturalDomains: preferences,
      preferences: {
        culinary: preferences.filter(p => ['culinary', 'food', 'cuisine', 'dining'].some(c => p.toLowerCase().includes(c))),
        visual_arts: preferences.filter(p => ['art', 'museum', 'gallery', 'visual'].some(c => p.toLowerCase().includes(c))),
        music: preferences.filter(p => ['music', 'concert', 'performance'].some(c => p.toLowerCase().includes(c))),
        history: preferences.filter(p => ['history', 'historical', 'ancient', 'heritage'].some(c => p.toLowerCase().includes(c))),
        nature: preferences.filter(p => ['nature', 'outdoor', 'adventure', 'hiking'].some(c => p.toLowerCase().includes(c))),
        traditions: preferences.filter(p => ['tradition', 'culture', 'festival', 'ceremony'].some(c => p.toLowerCase().includes(c)))
      }
    };
  }
}

export const qlooService = new QlooService();
