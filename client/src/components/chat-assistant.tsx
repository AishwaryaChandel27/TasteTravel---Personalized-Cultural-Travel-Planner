import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Bot, User, Send } from "lucide-react";
import type { ChatMessage } from "@/types";

export default function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm your cultural travel assistant. Based on your preferences for Renaissance art and Italian cuisine, I can help you plan the perfect trip to Florence. What would you like to know?",
      timestamp: new Date(),
      suggestions: ["Best local restaurants?", "Transportation tips?", "Cultural etiquette?"]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const sendMessage = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        message,
        userPreferences: ["renaissance", "art", "italian cuisine"],
        currentDestination: "Florence, Italy"
      });
      return response.json();
    },
    onSuccess: (data) => {
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "assistant",
        content: data.response,
        timestamp: new Date(),
        suggestions: data.suggestions || [],
        culturalTips: data.culturalTips || []
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    sendMessage.mutate(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Chat with Your Travel Assistant
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get personalized advice, cultural insights, and travel tips from our AI-powered assistant
          </p>
        </div>

        <Card className="overflow-hidden">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === "user" ? "justify-end" : ""
                }`}
              >
                {message.type === "assistant" && (
                  <div className="w-8 h-8 bg-travel-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`rounded-lg p-4 shadow-sm max-w-md ${
                    message.type === "user"
                      ? "bg-travel-blue text-white"
                      : "bg-white border border-slate-200"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  
                  {message.culturalTips && message.culturalTips.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <p className="text-xs text-slate-500 mb-2">Quick tips for your trip:</p>
                      <ul className="text-xs space-y-1">
                        {message.culturalTips.map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {message.type === "user" && (
                  <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
            
            {sendMessage.isPending && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-travel-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <CardContent className="bg-white border-t border-slate-200 p-4">
            <div className="flex items-center space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your cultural travel plans..."
                className="flex-1"
                disabled={sendMessage.isPending}
              />
              <Button
                onClick={handleSendMessage}
                disabled={sendMessage.isPending || !inputValue.trim()}
                className="bg-travel-blue hover:bg-travel-dark"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {messages[messages.length - 1]?.suggestions?.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-slate-200 transition-colors"
                  onClick={() => handleQuickQuestion(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
