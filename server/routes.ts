import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { aiService } from "./services/ai-service";
import { qlooService } from "./services/qloo";
import { insertChatMessageSchema, insertItinerarySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Destinations API
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getAllDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const destination = await storage.getDestination(id);
      if (!destination) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destination" });
    }
  });

  app.get("/api/destinations/region/:region", async (req, res) => {
    try {
      const region = req.params.region;
      const destinations = await storage.getDestinationsByRegion(region);
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destinations by region" });
    }
  });

  // Cultural Sites API
  app.get("/api/cultural-sites/destination/:destinationId", async (req, res) => {
    try {
      const destinationId = parseInt(req.params.destinationId);
      const sites = await storage.getCulturalSitesByDestination(destinationId);
      res.json(sites);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cultural sites" });
    }
  });

  app.get("/api/cultural-sites/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const sites = await storage.getCulturalSitesByCategory(category);
      res.json(sites);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cultural sites by category" });
    }
  });

  // Restaurants API
  app.get("/api/restaurants/destination/:destinationId", async (req, res) => {
    try {
      const destinationId = parseInt(req.params.destinationId);
      const restaurants = await storage.getRestaurantsByDestination(destinationId);
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch restaurants" });
    }
  });

  app.get("/api/restaurants/cuisine/:cuisine", async (req, res) => {
    try {
      const cuisine = req.params.cuisine;
      const restaurants = await storage.getRestaurantsByCuisine(cuisine);
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch restaurants by cuisine" });
    }
  });

  // Recommendations API (using Qloo service)
  app.post("/api/recommendations", async (req, res) => {
    try {
      const { preferences, limit = 10 } = req.body;
      
      if (!preferences || !Array.isArray(preferences)) {
        return res.status(400).json({ error: "Preferences array is required" });
      }

      const [destinations, culturalSites, restaurants] = await Promise.all([
        qlooService.getRecommendations(preferences, limit),
        qlooService.getCulturalSiteRecommendations(preferences),
        qlooService.getRestaurantRecommendations(preferences)
      ]);

      res.json({
        destinations,
        culturalSites,
        restaurants
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  // Itinerary API
  app.post("/api/itinerary", async (req, res) => {
    try {
      const validatedData = insertItinerarySchema.parse(req.body);
      const itinerary = await storage.createItinerary(validatedData);
      res.json(itinerary);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid itinerary data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create itinerary" });
    }
  });

  app.get("/api/itinerary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const itinerary = await storage.getItinerary(id);
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }
      res.json(itinerary);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch itinerary" });
    }
  });

  app.put("/api/itinerary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { items } = req.body;
      
      if (!items || !Array.isArray(items)) {
        return res.status(400).json({ error: "Items array is required" });
      }

      await storage.updateItinerary(id, items);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update itinerary" });
    }
  });

  app.get("/api/itinerary/:id/description", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const itinerary = await storage.getItinerary(id);
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }
      
      const description = await aiService.getItineraryDescription(itinerary.items || []);
      res.json({ description });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate itinerary description" });
    }
  });

  // Chat Assistant API
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, userPreferences, currentDestination, itinerary } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const advice = await aiService.getTravelAdvice({
        message,
        userPreferences,
        currentDestination,
        itinerary
      });

      // Store chat message (mock user ID for now)
      const chatMessage = await storage.createChatMessage({
        userId: 1,
        message,
        response: advice.response
      });

      res.json({
        ...advice,
        messageId: chatMessage.id
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // API Status endpoint
  app.get("/api/ai-status", async (req, res) => {
    try {
      const status = aiService.getAPIStatus();
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Failed to get AI service status" });
    }
  });

  // Reset AI service availability
  app.post("/api/ai-reset", async (req, res) => {
    try {
      aiService.resetAPIAvailability();
      res.json({ message: "AI service availability reset" });
    } catch (error) {
      res.status(500).json({ error: "Failed to reset AI service" });
    }
  });

  // Cultural Insights API
  app.post("/api/cultural-insights", async (req, res) => {
    try {
      const { destination, preferences } = req.body;
      
      if (!destination || !preferences || !Array.isArray(preferences)) {
        return res.status(400).json({ error: "Destination and preferences array are required" });
      }

      const insights = await aiService.getCulturalInsights(destination, preferences);
      res.json({ insights });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate cultural insights" });
    }
  });

  // User Preferences API
  app.post("/api/user/:id/preferences", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { preferences } = req.body;
      
      if (!preferences || !Array.isArray(preferences)) {
        return res.status(400).json({ error: "Preferences array is required" });
      }

      await storage.updateUserPreferences(userId, preferences);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user preferences" });
    }
  });

  // World Map Regions API
  app.get("/api/regions", async (req, res) => {
    try {
      const regions = [
        {
          name: "Europe",
          coordinates: { lat: 54.5260, lng: 15.2551 },
          description: "Rich cultural heritage, world-class museums, and diverse culinary traditions",
          topDestinations: ["Paris", "Rome", "Barcelona"],
          culturalHighlights: ["Renaissance Art", "Classical Music", "Historic Architecture"],
          bestSeason: "April - October"
        },
        {
          name: "Asia",
          coordinates: { lat: 34.0479, lng: 100.6197 },
          description: "Ancient traditions, spiritual sites, and incredible diversity of cultures",
          topDestinations: ["Tokyo", "Kyoto", "Bangkok"],
          culturalHighlights: ["Temples", "Traditional Arts", "Culinary Diversity"],
          bestSeason: "October - April"
        },
        {
          name: "Africa",
          coordinates: { lat: -8.7832, lng: 34.5085 },
          description: "Birthplace of humanity with rich tribal cultures and natural wonders",
          topDestinations: ["Cairo", "Marrakech", "Cape Town"],
          culturalHighlights: ["Ancient History", "Tribal Arts", "Wildlife"],
          bestSeason: "May - September"
        },
        {
          name: "Americas",
          coordinates: { lat: 19.4326, lng: -99.1332 },
          description: "From ancient civilizations to modern metropolises",
          topDestinations: ["New York", "Mexico City", "Rio de Janeiro"],
          culturalHighlights: ["Indigenous Culture", "Colonial Architecture", "Modern Arts"],
          bestSeason: "Year-round (varies by region)"
        },
        {
          name: "Oceania",
          coordinates: { lat: -25.2744, lng: 133.7751 },
          description: "Unique indigenous cultures and stunning natural landscapes",
          topDestinations: ["Sydney", "Melbourne", "Auckland"],
          culturalHighlights: ["Aboriginal Art", "Maori Culture", "Natural Wonders"],
          bestSeason: "September - April"
        }
      ];

      res.json(regions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch regions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
