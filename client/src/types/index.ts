export interface CulturalDomain {
  id: string;
  name: string;
  icon: string;
  description: string;
  tags: string[];
  color: string;
}

export interface Preference {
  domain: string;
  tags: string[];
}

export interface Destination {
  id: number;
  name: string;
  country: string;
  region: string;
  description: string;
  imageUrl?: string;
  culturalTags?: string[];
  bestSeasons?: string[];
  coordinates?: { lat: number; lng: number };
  match?: number;
}

export interface CulturalSite {
  id: number;
  name: string;
  destinationId?: number;
  description: string;
  imageUrl?: string;
  category: string;
  duration?: string;
  tags?: string[];
}

export interface Restaurant {
  id: number;
  name: string;
  destinationId?: number;
  description: string;
  imageUrl?: string;
  cuisine: string;
  priceRange: string;
  rating: number;
}

export interface ItineraryItem {
  id: string;
  type: 'destination' | 'cultural_site' | 'restaurant' | 'activity';
  itemId: number;
  day: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  duration: string;
  name: string;
  description: string;
  imageUrl?: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  culturalTips?: string[];
}

export interface WorldRegion {
  name: string;
  coordinates: { lat: number; lng: number };
  description: string;
  topDestinations: string[];
  culturalHighlights: string[];
  bestSeason: string;
}

export interface CulturalInsight {
  title: string;
  description: string;
  location: string;
  icon: string;
  color: string;
}
