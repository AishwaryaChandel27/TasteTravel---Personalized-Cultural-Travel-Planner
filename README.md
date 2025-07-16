# TasteTravel - Personalized Cultural Travel Planner

TasteTravel is a comprehensive worldwide cultural travel planning application that leverages AI to create personalized travel experiences across all continents. The application integrates Qloo's Taste AI™ API with OpenAI's GPT models to analyze user preferences and recommend destinations, cultural sites, restaurants, and activities tailored to individual tastes from around the globe.

## 🌍 Features

### Worldwide Coverage
- **17 Global Destinations** across all continents:
  - **Asia**: Kyoto (Japan), Angkor Wat (Cambodia), Mumbai (India), Bangkok (Thailand)
  - **Europe**: Florence (Italy), Istanbul (Turkey), Prague (Czech Republic), Santorini (Greece)
  - **Africa**: Marrakech (Morocco), Cairo (Egypt), Cape Town (South Africa)
  - **Americas**: Cusco (Peru), Mexico City (Mexico), New York (USA), Buenos Aires (Argentina)
  - **Oceania**: Sydney (Australia), Auckland (New Zealand)

### Core Functionality
- **🎯 Personalized Recommendations**: AI-powered destination suggestions based on cultural preferences
- **🏛️ Cultural Sites**: Curated selection of museums, temples, monuments, and archaeological sites
- **🍽️ Restaurant Recommendations**: Global cuisine options from fine dining to local favorites
- **🗺️ Interactive World Map**: Visual exploration of destinations with regional insights
- **📅 Itinerary Builder**: Drag-and-drop interface for creating custom travel plans
- **💬 AI Chat Assistant**: OpenAI-powered travel advisor for personalized guidance
- **🎨 Cultural Insights**: Deep cultural information and travel tips

### User Experience
- **Preference Input**: Select from diverse cultural domains and interests
- **Visual Interface**: Beautiful, responsive design with high-quality imagery
- **Real-time Updates**: Dynamic content loading and smooth interactions
- **Multi-device Support**: Works seamlessly across desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- OpenAI API key (required for AI features)
- Optional: Qloo API key for enhanced recommendations

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd tastetravel
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
QLOO_API_KEY=your_qloo_api_key_here (optional)
```

4. **Start the development server**:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Production Build

```bash
npm run build
npm start
```

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Project Structure
```
tastetravel/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── types/          # TypeScript type definitions
│   └── index.html          # HTML template
├── server/                 # Backend Express application
│   ├── services/           # External service integrations
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Data storage layer
│   └── index.ts            # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema definitions
└── package.json            # Dependencies and scripts
```

### Database Schema
The application uses a relational database with these main entities:
- **Users**: User profiles and preferences
- **Destinations**: Travel destinations with cultural metadata
- **Cultural Sites**: Museums, temples, monuments, and attractions
- **Restaurants**: Dining establishments with cuisine information
- **Itineraries**: User-created travel plans
- **Chat Messages**: Conversation history with AI assistant

## 🌐 API Endpoints

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get specific destination
- `GET /api/destinations/region/:region` - Get destinations by region
- `POST /api/destinations/preferences` - Get destinations by preferences

### Cultural Sites
- `GET /api/cultural-sites` - Get all cultural sites
- `GET /api/cultural-sites/destination/:id` - Get sites by destination
- `GET /api/cultural-sites/category/:category` - Get sites by category

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/destination/:id` - Get restaurants by destination
- `GET /api/restaurants/cuisine/:cuisine` - Get restaurants by cuisine

### AI Services
- `POST /api/chat` - Chat with AI travel assistant
- `POST /api/cultural-insights` - Get cultural insights for destinations
- `POST /api/itinerary-description` - Generate itinerary descriptions

### Other
- `GET /api/regions` - Get world regions for map interface
- `POST /api/itineraries` - Create and manage itineraries

## 🤖 AI Integration

### OpenAI Features
- **Travel Advice**: Personalized recommendations and travel tips
- **Cultural Insights**: Deep cultural information about destinations
- **Itinerary Descriptions**: AI-generated summaries of travel plans
- **Chat Assistant**: Interactive travel planning support

### Qloo Integration
- **Taste AI™**: Personalized cultural recommendations
- **Preference Analysis**: Understanding user cultural preferences
- **Recommendation Scoring**: AI-powered relevance scoring

## 🎨 UI Components

### Core Components
- **HeroSection**: Landing page with compelling visuals
- **PreferencesInput**: Cultural preference selection interface
- **WorldMap**: Interactive global destination map
- **Recommendations**: AI-powered destination suggestions
- **ItineraryBuilder**: Drag-and-drop itinerary creation
- **ChatAssistant**: AI-powered travel advisor
- **CulturalInsights**: Deep cultural information display

### Design System
- **Color Palette**: Travel-themed colors with cultural inspiration
- **Typography**: Modern, readable fonts optimized for travel content
- **Icons**: Lucide React icons for consistent visual language
- **Responsive Design**: Mobile-first approach with desktop optimization

## 🔧 Configuration

### Environment Variables
- `OPENAI_API_KEY`: Required for AI features
- `QLOO_API_KEY`: Optional for enhanced recommendations
- `DATABASE_URL`: PostgreSQL connection string (if using persistent storage)
- `NODE_ENV`: Environment (development/production)

### Customization
- **Cultural Domains**: Modify preference categories in `client/src/types/index.ts`
- **Destinations**: Add new destinations in `server/storage.ts`
- **UI Theme**: Customize colors and styling in `client/src/index.css`

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adapted layout with touch-friendly interactions
- **Mobile**: Streamlined interface with bottom navigation

## 🚀 Deployment

### Replit Deployment
The application is optimized for Replit deployment:
1. Import the project to Replit
2. Set environment variables in Replit Secrets
3. Click "Deploy" to publish your application

### Other Platforms
The application can be deployed to:
- **Vercel**: Frontend deployment with serverless functions
- **Heroku**: Full-stack deployment with PostgreSQL
- **Railway**: Modern deployment platform with database support
- **DigitalOcean**: VPS deployment with custom configuration

## 🔐 Security

### API Security
- Environment variables for sensitive keys
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration for cross-origin requests

### Data Privacy
- User preferences stored locally or in secure database
- No sensitive personal information required
- Optional user accounts with secure authentication

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Test Coverage
- Unit tests for utility functions
- Integration tests for API endpoints
- Component tests for React components
- End-to-end tests for critical user flows

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add your feature'`
5. Push to the branch: `git push origin feature/your-feature`
6. Submit a pull request

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Conventional commits for clear history

### Adding New Destinations
1. Add destination data to `server/storage.ts`
2. Include cultural sites and restaurants
3. Add to Qloo service recommendations
4. Update world map coordinates
5. Test all functionality

## 📊 Performance

### Optimization Features
- **Code Splitting**: Lazy loading for better initial load times
- **Image Optimization**: Responsive images with proper sizing
- **Caching**: Intelligent caching for API responses
- **Bundle Analysis**: Optimized build output

### Performance Metrics
- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 3s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1

## 🐛 Troubleshooting

### Common Issues

**OpenAI API Rate Limits**
- Check your OpenAI billing and usage limits
- Implement exponential backoff for retries
- Consider upgrading your OpenAI plan

**Database Connection Issues**
- Verify database credentials
- Check network connectivity
- Ensure database server is running

**Build Errors**
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check TypeScript errors: `npm run type-check`
- Verify all dependencies are compatible

## 📞 Support

For questions, issues, or contributions:
- Create an issue on GitHub
- Check the documentation
- Review existing issues and discussions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT-4 integration
- **Qloo** for Taste AI™ technology
- **Unsplash** for beautiful destination imagery
- **shadcn/ui** for excellent UI components
- **React** and **TypeScript** communities

---

**TasteTravel** - Discover the world through personalized cultural experiences. 🌍✈️