import { generateTravelAdvice, generateCulturalInsights, generateItineraryDescription, TravelAdviceRequest, TravelAdviceResponse } from './openai';
import { summarizeArticle, analyzeSentiment, Sentiment } from './gemini';
import { GoogleGenAI } from "@google/genai";

// Unified AI service that can switch between OpenAI and Gemini
export class AIService {
  private geminiClient: GoogleGenAI | null = null;
  private isOpenAIAvailable = true;
  private isGeminiAvailable = false;

  constructor() {
    // Initialize Gemini client if API key is available
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      this.geminiClient = new GoogleGenAI({ apiKey: geminiApiKey });
      this.isGeminiAvailable = true;
    }
  }

  // Main travel advice function with fallback
  async getTravelAdvice(request: TravelAdviceRequest): Promise<TravelAdviceResponse> {
    // Try OpenAI first
    if (this.isOpenAIAvailable) {
      try {
        return await generateTravelAdvice(request);
      } catch (error: any) {
        console.log('OpenAI API failed:', error.message);
        
        // Check if it's a rate limit or quota error
        if (error.status === 429 || error.code === 'insufficient_quota') {
          console.log('OpenAI rate limit reached, switching to Gemini');
          this.isOpenAIAvailable = false;
        } else {
          // For other errors, still try Gemini as fallback
          console.log('OpenAI error, trying Gemini fallback');
        }
      }
    }

    // Fallback to Gemini
    if (this.isGeminiAvailable && this.geminiClient) {
      try {
        return await this.generateTravelAdviceWithGemini(request);
      } catch (error: any) {
        console.log('Gemini API failed:', error.message);
        this.isGeminiAvailable = false;
      }
    }

    // If both APIs fail, return error response
    return {
      response: "I'm sorry, I'm having trouble processing your request right now. Please try again later or contact support if the problem persists.",
      suggestions: ["Try asking a different question", "Check back in a few minutes", "Contact support for assistance"],
      culturalTips: []
    };
  }

  // Generate travel advice using Gemini
  private async generateTravelAdviceWithGemini(request: TravelAdviceRequest): Promise<TravelAdviceResponse> {
    if (!this.geminiClient) {
      throw new Error('Gemini client not initialized');
    }

    const prompt = this.buildTravelAdvicePrompt(request);
    
    try {
      const response = await this.geminiClient.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              response: { type: "string" },
              suggestions: { 
                type: "array",
                items: { type: "string" }
              },
              culturalTips: { 
                type: "array",
                items: { type: "string" }
              }
            },
            required: ["response"]
          }
        },
        contents: prompt
      });

      const result = JSON.parse(response.text || '{}');
      
      return {
        response: result.response || "I'd be happy to help you plan your cultural travel experience!",
        suggestions: result.suggestions || [],
        culturalTips: result.culturalTips || []
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  // Generate cultural insights with fallback
  async getCulturalInsights(destination: string, preferences: string[]): Promise<string[]> {
    // Try OpenAI first
    if (this.isOpenAIAvailable) {
      try {
        return await generateCulturalInsights(destination, preferences);
      } catch (error: any) {
        console.log('OpenAI cultural insights failed:', error.message);
        if (error.status === 429 || error.code === 'insufficient_quota') {
          this.isOpenAIAvailable = false;
        }
      }
    }

    // Fallback to Gemini
    if (this.isGeminiAvailable && this.geminiClient) {
      try {
        return await this.generateCulturalInsightsWithGemini(destination, preferences);
      } catch (error: any) {
        console.log('Gemini cultural insights failed:', error.message);
        this.isGeminiAvailable = false;
      }
    }

    // Return fallback insights
    return [
      `${destination} offers rich cultural experiences for travelers`,
      "Local customs and traditions provide unique insights into the culture",
      "Try local cuisine and interact with locals for authentic experiences",
      "Visit museums and cultural sites to learn about the history",
      "Respect local customs and dress codes when visiting religious sites"
    ];
  }

  // Generate cultural insights using Gemini
  private async generateCulturalInsightsWithGemini(destination: string, preferences: string[]): Promise<string[]> {
    if (!this.geminiClient) {
      throw new Error('Gemini client not initialized');
    }

    const prompt = `Generate 5 cultural insights for ${destination} based on these preferences: ${preferences.join(', ')}. 
    Focus on authentic cultural experiences, local customs, traditions, and practical travel tips.
    Return as a JSON array of strings.`;

    try {
      const response = await this.geminiClient.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "array",
            items: { type: "string" }
          }
        },
        contents: prompt
      });

      const result = JSON.parse(response.text || '[]');
      return Array.isArray(result) ? result : [];
    } catch (error) {
      console.error('Gemini cultural insights error:', error);
      throw error;
    }
  }

  // Generate itinerary description with fallback
  async getItineraryDescription(itinerary: any[]): Promise<string> {
    // Try OpenAI first
    if (this.isOpenAIAvailable) {
      try {
        return await generateItineraryDescription(itinerary);
      } catch (error: any) {
        console.log('OpenAI itinerary description failed:', error.message);
        if (error.status === 429 || error.code === 'insufficient_quota') {
          this.isOpenAIAvailable = false;
        }
      }
    }

    // Fallback to Gemini
    if (this.isGeminiAvailable && this.geminiClient) {
      try {
        return await this.generateItineraryDescriptionWithGemini(itinerary);
      } catch (error: any) {
        console.log('Gemini itinerary description failed:', error.message);
        this.isGeminiAvailable = false;
      }
    }

    // Return fallback description
    return "Your personalized cultural travel itinerary includes carefully selected destinations, cultural sites, and dining experiences tailored to your preferences.";
  }

  // Generate itinerary description using Gemini
  private async generateItineraryDescriptionWithGemini(itinerary: any[]): Promise<string> {
    if (!this.geminiClient) {
      throw new Error('Gemini client not initialized');
    }

    const prompt = `Create a compelling description for this travel itinerary: ${JSON.stringify(itinerary)}. 
    Focus on the cultural experiences, highlights, and what makes this itinerary special.
    Return as a single descriptive paragraph.`;

    try {
      const response = await this.geminiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      return response.text || "Your personalized cultural travel itinerary includes carefully selected destinations, cultural sites, and dining experiences tailored to your preferences.";
    } catch (error) {
      console.error('Gemini itinerary description error:', error);
      throw error;
    }
  }

  // Build travel advice prompt for Gemini
  private buildTravelAdvicePrompt(request: TravelAdviceRequest): string {
    let prompt = `You are a knowledgeable travel advisor specializing in cultural experiences worldwide. 
    
    User message: "${request.message}"
    `;

    if (request.userPreferences && request.userPreferences.length > 0) {
      prompt += `\nUser preferences: ${request.userPreferences.join(', ')}`;
    }

    if (request.currentDestination) {
      prompt += `\nCurrent destination context: ${request.currentDestination}`;
    }

    if (request.itinerary && request.itinerary.length > 0) {
      prompt += `\nCurrent itinerary: ${JSON.stringify(request.itinerary)}`;
    }

    prompt += `\n\nProvide helpful travel advice, cultural insights, and practical tips. 
    Include 3-5 actionable suggestions and 3-5 cultural tips when relevant.
    Focus on authentic cultural experiences and respectful travel practices.
    
    Respond in JSON format with:
    - response: Your main advice (string)
    - suggestions: Array of actionable suggestions (array of strings)
    - culturalTips: Array of cultural insights and tips (array of strings)`;

    return prompt;
  }

  // Check API availability status
  getAPIStatus(): { openai: boolean; gemini: boolean } {
    return {
      openai: this.isOpenAIAvailable,
      gemini: this.isGeminiAvailable
    };
  }

  // Reset API availability (useful for retry logic)
  resetAPIAvailability(): void {
    this.isOpenAIAvailable = true;
    if (this.geminiClient) {
      this.isGeminiAvailable = true;
    }
  }
}

// Export singleton instance
export const aiService = new AIService();