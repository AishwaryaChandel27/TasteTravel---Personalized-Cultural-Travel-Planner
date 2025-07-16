import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface TravelAdviceRequest {
  message: string;
  userPreferences?: string[];
  currentDestination?: string;
  itinerary?: any[];
}

export interface TravelAdviceResponse {
  response: string;
  suggestions?: string[];
  culturalTips?: string[];
}

export async function generateTravelAdvice(request: TravelAdviceRequest): Promise<TravelAdviceResponse> {
  const systemPrompt = `You are a knowledgeable cultural travel assistant powered by AI. You specialize in providing personalized travel advice, cultural insights, and practical tips for travelers interested in cultural experiences worldwide.

Your expertise includes:
- Cultural sites, museums, and historical landmarks
- Local customs and etiquette
- Authentic dining recommendations
- Transportation and logistics
- Seasonal travel considerations
- Cultural festivals and events
- Art, music, and performance recommendations

Always provide helpful, accurate, and culturally sensitive advice. When possible, include practical tips like best times to visit, how to book tickets, local customs to respect, and insider knowledge that enhances the cultural experience.

User preferences: ${request.userPreferences?.join(', ') || 'None specified'}
Current destination context: ${request.currentDestination || 'None specified'}
Current itinerary: ${request.itinerary ? JSON.stringify(request.itinerary) : 'None'}

Respond in JSON format with: { "response": "main response", "suggestions": ["quick suggestion 1", "quick suggestion 2"], "culturalTips": ["cultural tip 1", "cultural tip 2"] }`;

  // Let errors propagate to the AI service for proper fallback handling
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: request.message }
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 1000
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');
  
  return {
    response: result.response || "I'm sorry, I couldn't process your request. Please try asking about travel destinations, cultural sites, or travel tips.",
    suggestions: result.suggestions || [],
    culturalTips: result.culturalTips || []
  };
}

export async function generateCulturalInsights(destination: string, preferences: string[]): Promise<string[]> {
  try {
    const prompt = `Generate 3-5 cultural insights and practical tips for travelers visiting ${destination}. Focus on:
- Local customs and etiquette
- Cultural experiences that align with: ${preferences.join(', ')}
- Practical travel tips specific to this destination
- Respectful behavior at cultural sites

Respond in JSON format with: { "insights": ["insight 1", "insight 2", "insight 3"] }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 800
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result.insights || [];
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return [];
  }
}

export async function generateItineraryDescription(itinerary: any[]): Promise<string> {
  try {
    const prompt = `Create a narrative description of this travel itinerary, highlighting the cultural experiences and flow of the journey:

${JSON.stringify(itinerary)}

Focus on the cultural significance and connections between experiences. Make it engaging and informative.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content || "A personalized cultural journey awaits.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "A personalized cultural journey awaits.";
  }
}
