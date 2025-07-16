# TasteTravel - Personalized Cultural Travel Planner

## Overview

TasteTravel is a comprehensive worldwide cultural travel planning application that leverages AI to create personalized travel experiences across all continents. The application integrates Qloo's Taste AI™ API with OpenAI's GPT models to analyze user preferences and recommend destinations, cultural sites, restaurants, and activities tailored to individual tastes from around the globe.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns:

- **Frontend**: React with TypeScript, using Vite for build tooling
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Component Structure**: Modular React components using shadcn/ui design system
- **Styling**: Tailwind CSS with custom travel-themed color variables
- **State Management**: TanStack Query for API state, local React state for UI
- **Build System**: Vite with TypeScript support and development hot reloading

### Backend Architecture
- **API Layer**: Express.js REST API with middleware for logging and error handling
- **Database Layer**: Drizzle ORM with PostgreSQL, including schema definitions for users, destinations, cultural sites, restaurants, itineraries, and chat messages
- **External Services**: Integration with OpenAI GPT-4o for travel advice and Qloo's Taste AI™ for personalized recommendations
- **Storage**: Abstracted storage interface with in-memory implementation for development

### Database Schema
The application uses a relational database with the following main entities:
- **Users**: Authentication and preference storage
- **Destinations**: Travel destinations with cultural tags and metadata
- **Cultural Sites**: Museums, landmarks, and cultural attractions
- **Restaurants**: Dining establishments with cuisine and rating information
- **Itineraries**: User-created travel plans with items and descriptions
- **Chat Messages**: Conversation history with the AI assistant

## Data Flow

1. **User Input**: Users interact with preference selection components to indicate cultural interests
2. **API Processing**: Frontend sends preferences to backend API endpoints
3. **AI Integration**: Backend processes requests through OpenAI for travel advice and Qloo for personalized recommendations
4. **Data Storage**: User preferences, itineraries, and chat history are persisted in PostgreSQL
5. **Response Delivery**: Processed recommendations and advice are returned to the frontend for display

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database ORM
- **openai**: Integration with OpenAI's GPT models
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: Accessible UI component primitives

### AI Services
- **OpenAI API**: Primary AI service for generating travel advice, cultural insights, and itinerary descriptions
- **Gemini API**: Fallback AI service that automatically activates when OpenAI is unavailable or rate-limited
- **Qloo Taste AI™**: Mock implementation for personalized cultural recommendations (to be replaced with actual API)
- **Intelligent Fallback**: Unified AI service that switches between OpenAI and Gemini for enhanced reliability

### UI/UX Dependencies
- **tailwindcss**: Utility-first CSS framework
- **@radix-ui**: Accessible component primitives
- **lucide-react**: Icon library
- **wouter**: Lightweight routing library

## Deployment Strategy

The application is configured for deployment with:
- **Development**: Local development server with Vite HMR and Express backend
- **Build Process**: Vite builds the frontend, esbuild bundles the backend
- **Production**: Single Node.js process serving both API and static files
- **Database**: PostgreSQL with Drizzle migrations for schema management

### Build Configuration
- Frontend builds to `dist/public` directory
- Backend bundles to `dist/index.js`
- Environment variables for API keys and database connection
- Scripts for development (`npm run dev`), build (`npm run build`), and production (`npm start`)

The application is designed to be easily deployable to platforms like Replit, Vercel, or any Node.js hosting environment with PostgreSQL support.

## Recent Changes (July 16, 2025)

- ✓ Expanded worldwide destination coverage to 17 global destinations across all continents
- ✓ Added comprehensive cultural sites (17 sites) matching each destination
- ✓ Included diverse global restaurants (17 restaurants) representing cuisines from each region
- ✓ Enhanced Qloo service with worldwide recommendations spanning all continents
- ✓ Updated data structures to support truly global travel planning
- ✓ Created comprehensive README.md with detailed documentation
- ✓ Enhanced storage layer with proper null handling for optional fields
- ✓ Improved worldwide coverage: Asia (4), Europe (4), Africa (3), Americas (4), Oceania (2)
- ✓ Implemented Gemini API as intelligent fallback when OpenAI API fails
- ✓ Built unified AI service that automatically switches between OpenAI and Gemini for reliability
- ✓ Added AI service status endpoint for monitoring and debugging
- ✓ Enhanced error handling with graceful fallbacks to prevent service interruption

## Documentation

The project includes comprehensive documentation in README.md covering:
- Feature overview and worldwide coverage
- Setup and installation instructions
- Architecture and technology stack details
- API endpoint documentation
- Deployment guides for multiple platforms
- Contributing guidelines and development setup
- Troubleshooting and support information