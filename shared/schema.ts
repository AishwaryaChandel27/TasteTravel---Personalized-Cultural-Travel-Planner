import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  preferences: json("preferences").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  region: text("region").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  culturalTags: json("cultural_tags").$type<string[]>(),
  bestSeasons: json("best_seasons").$type<string[]>(),
  coordinates: json("coordinates").$type<{ lat: number; lng: number }>(),
});

export const culturalSites = pgTable("cultural_sites", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  destinationId: integer("destination_id").references(() => destinations.id),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  duration: text("duration"),
  tags: json("tags").$type<string[]>(),
});

export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  destinationId: integer("destination_id").references(() => destinations.id),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  cuisine: text("cuisine").notNull(),
  priceRange: text("price_range").notNull(),
  rating: integer("rating").notNull(),
});

export const itineraries = pgTable("itineraries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  items: json("items").$type<Array<{
    id: string;
    type: 'destination' | 'cultural_site' | 'restaurant' | 'activity';
    itemId: number;
    day: number;
    timeOfDay: 'morning' | 'afternoon' | 'evening';
    duration: string;
  }>>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  message: text("message").notNull(),
  response: text("response").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
});

export const insertCulturalSiteSchema = createInsertSchema(culturalSites).omit({
  id: true,
});

export const insertRestaurantSchema = createInsertSchema(restaurants).omit({
  id: true,
});

export const insertItinerarySchema = createInsertSchema(itineraries).omit({
  id: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Destination = typeof destinations.$inferSelect;
export type InsertCulturalSite = z.infer<typeof insertCulturalSiteSchema>;
export type CulturalSite = typeof culturalSites.$inferSelect;
export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;
export type Restaurant = typeof restaurants.$inferSelect;
export type InsertItinerary = z.infer<typeof insertItinerarySchema>;
export type Itinerary = typeof itineraries.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
