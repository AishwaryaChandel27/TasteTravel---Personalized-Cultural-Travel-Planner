import { 
  users, destinations, culturalSites, restaurants, itineraries, chatMessages,
  type User, type InsertUser, type Destination, type InsertDestination,
  type CulturalSite, type InsertCulturalSite, type Restaurant, type InsertRestaurant,
  type Itinerary, type InsertItinerary, type ChatMessage, type InsertChatMessage
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPreferences(id: number, preferences: string[]): Promise<void>;

  // Destination methods
  getAllDestinations(): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  getDestinationsByRegion(region: string): Promise<Destination[]>;
  getDestinationsByPreferences(preferences: string[]): Promise<Destination[]>;
  createDestination(destination: InsertDestination): Promise<Destination>;

  // Cultural site methods
  getCulturalSitesByDestination(destinationId: number): Promise<CulturalSite[]>;
  getCulturalSitesByCategory(category: string): Promise<CulturalSite[]>;
  createCulturalSite(site: InsertCulturalSite): Promise<CulturalSite>;

  // Restaurant methods
  getRestaurantsByDestination(destinationId: number): Promise<Restaurant[]>;
  getRestaurantsByCuisine(cuisine: string): Promise<Restaurant[]>;
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;

  // Itinerary methods
  getItinerariesByUser(userId: number): Promise<Itinerary[]>;
  getItinerary(id: number): Promise<Itinerary | undefined>;
  createItinerary(itinerary: InsertItinerary): Promise<Itinerary>;
  updateItinerary(id: number, items: any[]): Promise<void>;

  // Chat methods
  getChatMessagesByUser(userId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private destinations: Map<number, Destination> = new Map();
  private culturalSites: Map<number, CulturalSite> = new Map();
  private restaurants: Map<number, Restaurant> = new Map();
  private itineraries: Map<number, Itinerary> = new Map();
  private chatMessages: Map<number, ChatMessage> = new Map();
  private currentUserId = 1;
  private currentDestinationId = 1;
  private currentCulturalSiteId = 1;
  private currentRestaurantId = 1;
  private currentItineraryId = 1;
  private currentChatMessageId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with comprehensive worldwide destinations
    const sampleDestinations: Destination[] = [
      // Asia
      {
        id: this.currentDestinationId++,
        name: "Kyoto",
        country: "Japan",
        region: "Asia",
        description: "Ancient capital known for traditional temples, gardens, and geisha culture",
        imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
        culturalTags: ["temples", "gardens", "traditional arts", "zen", "history"],
        bestSeasons: ["spring", "autumn"],
        coordinates: { lat: 35.0116, lng: 135.7681 }
      },
      {
        id: this.currentDestinationId++,
        name: "Angkor Wat",
        country: "Cambodia",
        region: "Asia",
        description: "World's largest religious monument complex with stunning Khmer architecture",
        imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d90516",
        culturalTags: ["temples", "ancient history", "khmer culture", "archaeology", "unesco"],
        bestSeasons: ["dry season"],
        coordinates: { lat: 13.4125, lng: 103.8667 }
      },
      {
        id: this.currentDestinationId++,
        name: "Mumbai",
        country: "India",
        region: "Asia",
        description: "Bollywood capital with vibrant street culture, colonial architecture, and diverse cuisine",
        imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
        culturalTags: ["bollywood", "street food", "colonial architecture", "festivals", "diversity"],
        bestSeasons: ["winter"],
        coordinates: { lat: 19.0760, lng: 72.8777 }
      },
      {
        id: this.currentDestinationId++,
        name: "Bangkok",
        country: "Thailand",
        region: "Asia",
        description: "Vibrant city blending traditional temples with modern urban culture",
        imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365",
        culturalTags: ["temples", "street food", "markets", "thai culture", "buddhism"],
        bestSeasons: ["cool season"],
        coordinates: { lat: 13.7563, lng: 100.5018 }
      },
      // Europe
      {
        id: this.currentDestinationId++,
        name: "Florence",
        country: "Italy",
        region: "Europe",
        description: "Renaissance art capital with world-class museums and architecture",
        imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
        culturalTags: ["renaissance", "art", "museums", "architecture", "cuisine"],
        bestSeasons: ["spring", "autumn"],
        coordinates: { lat: 43.7696, lng: 11.2558 }
      },
      {
        id: this.currentDestinationId++,
        name: "Istanbul",
        country: "Turkey",
        region: "Europe",
        description: "Historic city bridging Europe and Asia with rich Byzantine and Ottoman heritage",
        imageUrl: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b",
        culturalTags: ["ottoman", "byzantine", "mosques", "bazaars", "crossroads"],
        bestSeasons: ["spring", "autumn"],
        coordinates: { lat: 41.0082, lng: 28.9784 }
      },
      {
        id: this.currentDestinationId++,
        name: "Prague",
        country: "Czech Republic",
        region: "Europe",
        description: "Fairy-tale medieval city with stunning Gothic and Baroque architecture",
        imageUrl: "https://images.unsplash.com/photo-1541849546-216549ae216d",
        culturalTags: ["medieval", "gothic", "baroque", "castles", "classical music"],
        bestSeasons: ["spring", "autumn"],
        coordinates: { lat: 49.7437, lng: 15.3386 }
      },
      {
        id: this.currentDestinationId++,
        name: "Santorini",
        country: "Greece",
        region: "Europe",
        description: "Iconic Greek island with stunning sunsets, white-washed buildings, and ancient history",
        imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
        culturalTags: ["greek culture", "ancient history", "architecture", "mediterranean", "islands"],
        bestSeasons: ["spring", "early autumn"],
        coordinates: { lat: 36.3932, lng: 25.4615 }
      },
      // Africa
      {
        id: this.currentDestinationId++,
        name: "Marrakech",
        country: "Morocco",
        region: "Africa",
        description: "Imperial city with vibrant souks, stunning palaces, and rich Berber culture",
        imageUrl: "https://images.unsplash.com/photo-1489749798305-4fea3ae436d0",
        culturalTags: ["berber culture", "souks", "islamic architecture", "crafts", "desert"],
        bestSeasons: ["spring", "autumn"],
        coordinates: { lat: 31.6295, lng: -7.9811 }
      },
      {
        id: this.currentDestinationId++,
        name: "Cairo",
        country: "Egypt",
        region: "Africa",
        description: "Ancient city home to the pyramids, Sphinx, and incredible pharaonic heritage",
        imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d90516",
        culturalTags: ["ancient egypt", "pyramids", "pharaohs", "archaeology", "islamic cairo"],
        bestSeasons: ["winter"],
        coordinates: { lat: 30.0444, lng: 31.2357 }
      },
      {
        id: this.currentDestinationId++,
        name: "Cape Town",
        country: "South Africa",
        region: "Africa",
        description: "Stunning coastal city with diverse cultures, wine regions, and natural beauty",
        imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99",
        culturalTags: ["diverse cultures", "wine", "coastal", "rainbow nation", "nature"],
        bestSeasons: ["summer"],
        coordinates: { lat: -33.9249, lng: 18.4241 }
      },
      // Americas
      {
        id: this.currentDestinationId++,
        name: "Cusco",
        country: "Peru",
        region: "Americas",
        description: "Ancient Incan capital with rich indigenous culture and archaeological wonders",
        imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1",
        culturalTags: ["ancient history", "indigenous culture", "adventure", "archaeology"],
        bestSeasons: ["dry season"],
        coordinates: { lat: -13.5319, lng: -71.9675 }
      },
      {
        id: this.currentDestinationId++,
        name: "Mexico City",
        country: "Mexico",
        region: "Americas",
        description: "Vibrant capital with ancient Aztec heritage, colonial architecture, and modern art scene",
        imageUrl: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a",
        culturalTags: ["aztec", "colonial", "murals", "cuisine", "dia de los muertos"],
        bestSeasons: ["dry season"],
        coordinates: { lat: 19.4326, lng: -99.1332 }
      },
      {
        id: this.currentDestinationId++,
        name: "New York",
        country: "United States",
        region: "Americas",
        description: "Cultural melting pot with world-class museums, Broadway, and diverse neighborhoods",
        imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
        culturalTags: ["museums", "broadway", "diversity", "modern art", "urban culture"],
        bestSeasons: ["spring", "autumn"],
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      {
        id: this.currentDestinationId++,
        name: "Buenos Aires",
        country: "Argentina",
        region: "Americas",
        description: "Passionate city known for tango, European architecture, and vibrant cultural scene",
        imageUrl: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849",
        culturalTags: ["tango", "european influence", "steakhouse", "literature", "soccer"],
        bestSeasons: ["spring", "autumn"],
        coordinates: { lat: -34.6037, lng: -58.3816 }
      },
      // Oceania
      {
        id: this.currentDestinationId++,
        name: "Sydney",
        country: "Australia",
        region: "Oceania",
        description: "Iconic harbor city with indigenous culture, modern architecture, and beach lifestyle",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        culturalTags: ["indigenous culture", "harbor", "beaches", "modern architecture", "multiculturalism"],
        bestSeasons: ["spring", "autumn"],
        coordinates: { lat: -33.8688, lng: 151.2093 }
      },
      {
        id: this.currentDestinationId++,
        name: "Auckland",
        country: "New Zealand",
        region: "Oceania",
        description: "Polynesian cultural hub with stunning natural landscapes and Maori heritage",
        imageUrl: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad",
        culturalTags: ["maori culture", "polynesian", "nature", "adventure", "volcanoes"],
        bestSeasons: ["summer"],
        coordinates: { lat: -36.8485, lng: 174.7633 }
      }
    ];

    sampleDestinations.forEach(dest => this.destinations.set(dest.id, dest));

    // Initialize worldwide cultural sites
    const sampleSites: CulturalSite[] = [
      // Asia
      {
        id: this.currentCulturalSiteId++,
        name: "Fushimi Inari Shrine",
        destinationId: 1, // Kyoto
        description: "Famous for thousands of vermillion torii gates that create tunnels up the mountainside",
        imageUrl: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36",
        category: "Temple",
        duration: "2-4 hours",
        tags: ["shrine", "torii gates", "hiking", "spiritual"]
      },
      {
        id: this.currentCulturalSiteId++,
        name: "Angkor Thom",
        destinationId: 2, // Angkor Wat
        description: "Ancient walled city with the magnificent Bayon Temple at its center",
        imageUrl: "https://images.unsplash.com/photo-1545558014-8692077e9b5c",
        category: "Archaeological Site",
        duration: "Full day",
        tags: ["khmer", "temples", "ancient", "faces"]
      },
      {
        id: this.currentCulturalSiteId++,
        name: "Gateway of India",
        destinationId: 3, // Mumbai
        description: "Iconic colonial monument overlooking the Arabian Sea",
        imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
        category: "Monument",
        duration: "1-2 hours",
        tags: ["colonial", "monument", "history", "harbour"]
      },
      {
        id: this.currentCulturalSiteId++,
        name: "Wat Phra Kaew",
        destinationId: 4, // Bangkok
        description: "Temple of the Emerald Buddha, Thailand's most sacred Buddhist temple",
        imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
        category: "Temple",
        duration: "2-3 hours",
        tags: ["emerald buddha", "sacred", "royal", "thai architecture"]
      },
      // Europe
      {
        id: this.currentCulturalSiteId++,
        name: "Uffizi Gallery",
        destinationId: 5, // Florence
        description: "World-renowned art museum housing masterpieces from the Renaissance",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
        category: "Museum",
        duration: "3-4 hours",
        tags: ["renaissance", "art", "botticelli", "da vinci"]
      },
      {
        id: this.currentCulturalSiteId++,
        name: "Hagia Sophia",
        destinationId: 6, // Istanbul
        description: "Magnificent Byzantine cathedral turned mosque, architectural masterpiece",
        imageUrl: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b",
        category: "Historic Building",
        duration: "1-2 hours",
        tags: ["byzantine", "ottoman", "architecture", "mosaics"]
      },
      {
        id: this.currentCulturalSiteId++,
        name: "Prague Castle",
        destinationId: 7, // Prague
        description: "World's largest ancient castle complex with stunning Gothic cathedral",
        imageUrl: "https://images.unsplash.com/photo-1541849546-216549ae216d",
        category: "Castle",
        duration: "Half day",
        tags: ["castle", "gothic", "royal", "medieval"]
      },
      {
        id: this.currentCulturalSiteId++,
        name: "Ancient Akrotiri",
        destinationId: 8, // Santorini
        description: "Prehistoric Minoan settlement preserved by volcanic ash",
        imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
        category: "Archaeological Site",
        duration: "2-3 hours",
        tags: ["minoan", "prehistoric", "archaeology", "volcanic"]
      },
      // Africa
      {
        id: this.currentCulturalSiteId++,
        name: "Jemaa el-Fnaa",
        destinationId: 9, // Marrakech
        description: "Bustling main square with storytellers, musicians, and traditional performances",
        imageUrl: "https://images.unsplash.com/photo-1489749798305-4fea3ae436d0",
        category: "Cultural Square",
        duration: "Evening",
        tags: ["souks", "storytelling", "berber", "traditional"]
      },
      {
        id: this.currentCulturalSiteId++,
        name: "Great Pyramid of Giza",
        destinationId: 10, // Cairo
        description: "Last remaining Wonder of the Ancient World",
        imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d90516",
        category: "Archaeological Site",
        duration: "Half day",
        tags: ["pyramid", "pharaoh", "ancient wonder", "giza"]
      },
      {
        id: this.currentCulturalSiteId++,
        name: "Robben Island",
        destinationId: 11, // Cape Town
        description: "Historic prison island where Nelson Mandela was imprisoned",
        imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99",
        category: "Historic Site",
        duration: "Half day",
        tags: ["apartheid", "mandela", "history", "struggle"]
      },
      // Americas
      {
        id: this.currentCulturalSiteId++,
        name: "Machu Picchu",
        destinationId: 12, // Cusco
        description: "Ancient Incan citadel set high in the Andes Mountains",
        imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1",
        category: "Archaeological Site",
        duration: "Full day",
        tags: ["inca", "ruins", "mountains", "unesco"]
      },
      {
        id: this.currentCulturalSiteId++,
        name: "Templo Mayor",
        destinationId: 13, // Mexico City
        description: "Sacred Aztec temple complex in the heart of Mexico City",
        imageUrl: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a",
        category: "Archaeological Site",
        duration: "2-3 hours",
        tags: ["aztec", "temple", "archaeology", "mexico"]
      },
      {
        id: this.currentCulturalSiteId++,
        name: "Metropolitan Museum of Art",
        destinationId: 14, // New York
        description: "One of the world's largest and most comprehensive art museums",
        imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
        category: "Museum",
        duration: "Full day",
        tags: ["art", "museum", "culture", "collections"]
      },
      {
        id: this.currentCulturalSiteId++,
        name: "Recoleta Cemetery",
        destinationId: 15, // Buenos Aires
        description: "Elaborate cemetery with ornate mausoleums and Eva Perón's tomb",
        imageUrl: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849",
        category: "Cemetery",
        duration: "1-2 hours",
        tags: ["cemetery", "eva peron", "architecture", "history"]
      },
      // Oceania
      {
        id: this.currentCulturalSiteId++,
        name: "Sydney Opera House",
        destinationId: 16, // Sydney
        description: "Iconic performing arts venue with distinctive shell-like design",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        category: "Performance Venue",
        duration: "2-3 hours",
        tags: ["opera", "architecture", "performing arts", "iconic"]
      },
      {
        id: this.currentCulturalSiteId++,
        name: "Auckland Museum",
        destinationId: 17, // Auckland
        description: "Premier museum showcasing Maori and Pacific Island cultures",
        imageUrl: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad",
        category: "Museum",
        duration: "3-4 hours",
        tags: ["maori", "pacific", "cultural heritage", "history"]
      }
    ];

    sampleSites.forEach(site => this.culturalSites.set(site.id, site));

    // Initialize worldwide restaurants
    const sampleRestaurants: Restaurant[] = [
      // Asia
      {
        id: this.currentRestaurantId++,
        name: "Kikunoi",
        destinationId: 1, // Kyoto
        description: "Three-Michelin-starred kaiseki restaurant preserving traditional Japanese cuisine",
        imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
        cuisine: "Japanese",
        priceRange: "$$$$",
        rating: 5
      },
      {
        id: this.currentRestaurantId++,
        name: "Cuisine Wat Damnak",
        destinationId: 2, // Angkor Wat
        description: "Modern Cambodian cuisine using traditional ingredients and techniques",
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b",
        cuisine: "Cambodian",
        priceRange: "$$$",
        rating: 4
      },
      {
        id: this.currentRestaurantId++,
        name: "Trishna",
        destinationId: 3, // Mumbai
        description: "Contemporary Indian seafood restaurant with innovative coastal cuisine",
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b",
        cuisine: "Indian",
        priceRange: "$$$",
        rating: 4
      },
      {
        id: this.currentRestaurantId++,
        name: "Gaggan",
        destinationId: 4, // Bangkok
        description: "Progressive Indian cuisine with molecular gastronomy techniques",
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b",
        cuisine: "Progressive Indian",
        priceRange: "$$$$",
        rating: 5
      },
      // Europe
      {
        id: this.currentRestaurantId++,
        name: "Trattoria Mario",
        destinationId: 5, // Florence
        description: "Authentic Tuscan cuisine in a historic family-run restaurant",
        imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
        cuisine: "Italian",
        priceRange: "$$$",
        rating: 4
      },
      {
        id: this.currentRestaurantId++,
        name: "Pandeli",
        destinationId: 6, // Istanbul
        description: "Historic Ottoman restaurant serving traditional Turkish cuisine since 1901",
        imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
        cuisine: "Turkish",
        priceRange: "$$$",
        rating: 4
      },
      {
        id: this.currentRestaurantId++,
        name: "Lokál",
        destinationId: 7, // Prague
        description: "Traditional Czech pub serving fresh Pilsner and hearty local dishes",
        imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
        cuisine: "Czech",
        priceRange: "$$",
        rating: 4
      },
      {
        id: this.currentRestaurantId++,
        name: "Selene",
        destinationId: 8, // Santorini
        description: "Fine dining restaurant with stunning caldera views and modern Greek cuisine",
        imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
        cuisine: "Greek",
        priceRange: "$$$$",
        rating: 5
      },
      // Africa
      {
        id: this.currentRestaurantId++,
        name: "La Mamounia",
        destinationId: 9, // Marrakech
        description: "Elegant Moroccan restaurant in luxury hotel setting with traditional tagines",
        imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
        cuisine: "Moroccan",
        priceRange: "$$$",
        rating: 4
      },
      {
        id: this.currentRestaurantId++,
        name: "Abou El Sid",
        destinationId: 10, // Cairo
        description: "Traditional Egyptian restaurant with authentic Middle Eastern flavors",
        imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
        cuisine: "Egyptian",
        priceRange: "$$",
        rating: 4
      },
      {
        id: this.currentRestaurantId++,
        name: "La Colombe",
        destinationId: 11, // Cape Town
        description: "Award-winning restaurant showcasing South African cuisine and wine",
        imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
        cuisine: "South African",
        priceRange: "$$$$",
        rating: 5
      },
      // Americas
      {
        id: this.currentRestaurantId++,
        name: "Central",
        destinationId: 12, // Cusco
        description: "World-renowned restaurant showcasing Peru's biodiversity through innovative cuisine",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        cuisine: "Peruvian",
        priceRange: "$$$$",
        rating: 5
      },
      {
        id: this.currentRestaurantId++,
        name: "Pujol",
        destinationId: 13, // Mexico City
        description: "Contemporary Mexican cuisine celebrating indigenous ingredients and techniques",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        cuisine: "Mexican",
        priceRange: "$$$$",
        rating: 5
      },
      {
        id: this.currentRestaurantId++,
        name: "Le Bernardin",
        destinationId: 14, // New York
        description: "Three-Michelin-starred French seafood restaurant with exquisite preparations",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        cuisine: "French",
        priceRange: "$$$$",
        rating: 5
      },
      {
        id: this.currentRestaurantId++,
        name: "Don Julio",
        destinationId: 15, // Buenos Aires
        description: "Legendary parrilla serving the finest Argentine beef and wine",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        cuisine: "Argentine",
        priceRange: "$$$",
        rating: 4
      },
      // Oceania
      {
        id: this.currentRestaurantId++,
        name: "Quay",
        destinationId: 16, // Sydney
        description: "Modern Australian fine dining with harbor views and innovative cuisine",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        cuisine: "Modern Australian",
        priceRange: "$$$$",
        rating: 5
      },
      {
        id: this.currentRestaurantId++,
        name: "Clooney",
        destinationId: 17, // Auckland
        description: "Contemporary New Zealand cuisine highlighting local ingredients and Māori influences",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        cuisine: "New Zealand",
        priceRange: "$$$",
        rating: 4
      }
    ];

    sampleRestaurants.forEach(restaurant => this.restaurants.set(restaurant.id, restaurant));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      preferences: insertUser.preferences || null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserPreferences(id: number, preferences: string[]): Promise<void> {
    const user = this.users.get(id);
    if (user) {
      user.preferences = preferences;
      this.users.set(id, user);
    }
  }

  async getAllDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async getDestinationsByRegion(region: string): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(dest => dest.region === region);
  }

  async getDestinationsByPreferences(preferences: string[]): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(dest => 
      dest.culturalTags?.some(tag => preferences.includes(tag))
    );
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.currentDestinationId++;
    const destination: Destination = { 
      ...insertDestination, 
      id,
      imageUrl: insertDestination.imageUrl || null,
      culturalTags: insertDestination.culturalTags || null,
      bestSeasons: insertDestination.bestSeasons || null,
      coordinates: insertDestination.coordinates || null
    };
    this.destinations.set(id, destination);
    return destination;
  }

  async getCulturalSitesByDestination(destinationId: number): Promise<CulturalSite[]> {
    return Array.from(this.culturalSites.values()).filter(site => site.destinationId === destinationId);
  }

  async getCulturalSitesByCategory(category: string): Promise<CulturalSite[]> {
    return Array.from(this.culturalSites.values()).filter(site => site.category === category);
  }

  async createCulturalSite(insertSite: InsertCulturalSite): Promise<CulturalSite> {
    const id = this.currentCulturalSiteId++;
    const site: CulturalSite = { 
      ...insertSite, 
      id,
      duration: insertSite.duration || null,
      destinationId: insertSite.destinationId || null,
      imageUrl: insertSite.imageUrl || null,
      tags: insertSite.tags || null
    };
    this.culturalSites.set(id, site);
    return site;
  }

  async getRestaurantsByDestination(destinationId: number): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values()).filter(restaurant => restaurant.destinationId === destinationId);
  }

  async getRestaurantsByCuisine(cuisine: string): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values()).filter(restaurant => restaurant.cuisine === cuisine);
  }

  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const id = this.currentRestaurantId++;
    const restaurant: Restaurant = { 
      ...insertRestaurant, 
      id,
      destinationId: insertRestaurant.destinationId || null,
      imageUrl: insertRestaurant.imageUrl || null
    };
    this.restaurants.set(id, restaurant);
    return restaurant;
  }

  async getItinerariesByUser(userId: number): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values()).filter(itinerary => itinerary.userId === userId);
  }

  async getItinerary(id: number): Promise<Itinerary | undefined> {
    return this.itineraries.get(id);
  }

  async createItinerary(insertItinerary: InsertItinerary): Promise<Itinerary> {
    const id = this.currentItineraryId++;
    const itinerary: Itinerary = { 
      ...insertItinerary, 
      id, 
      createdAt: new Date(),
      userId: insertItinerary.userId || null,
      items: insertItinerary.items || null
    };
    this.itineraries.set(id, itinerary);
    return itinerary;
  }

  async updateItinerary(id: number, items: any[]): Promise<void> {
    const itinerary = this.itineraries.get(id);
    if (itinerary) {
      itinerary.items = items;
      this.itineraries.set(id, itinerary);
    }
  }

  async getChatMessagesByUser(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).filter(message => message.userId === userId);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const message: ChatMessage = { 
      ...insertMessage, 
      id, 
      timestamp: new Date(),
      userId: insertMessage.userId || null
    };
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
